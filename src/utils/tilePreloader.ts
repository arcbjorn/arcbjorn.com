/**
 * Preloads OpenStreetMap tiles in the background for faster map loading
 */

interface TileCoords {
  z: number;
  x: number;
  y: number;
}

// Initial map view config (matches Map.tsx)
const INITIAL_CENTER = [20, -20];
const DESKTOP_ZOOM = 3;
const MOBILE_ZOOM = 2;

// OpenStreetMap tile server subdomains
const SUBDOMAINS = ['a', 'b', 'c'];

/**
 * Converts lat/lng to tile coordinates for a given zoom level
 */
function latLngToTile(lat: number, lng: number, zoom: number): TileCoords {
  const latRad = (lat * Math.PI) / 180;
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const y = Math.floor(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n);
  
  return { z: zoom, x, y };
}

/**
 * Gets tiles around a center point with a given radius
 */
function getTilesInRadius(centerLat: number, centerLng: number, zoom: number, radius: number = 2): TileCoords[] {
  const center = latLngToTile(centerLat, centerLng, zoom);
  const tiles: TileCoords[] = [];
  
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      const x = center.x + dx;
      const y = center.y + dy;
      
      // Check tile bounds for the zoom level
      const maxTile = Math.pow(2, zoom) - 1;
      if (x >= 0 && x <= maxTile && y >= 0 && y <= maxTile) {
        tiles.push({ z: zoom, x, y });
      }
    }
  }
  
  return tiles;
}

/**
 * Preloads a single tile by creating an invisible image
 */
function preloadTile(tile: TileCoords): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const subdomain = SUBDOMAINS[Math.abs(tile.x + tile.y) % SUBDOMAINS.length];
    const url = `https://${subdomain}.tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`;
    
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load tile: ${url}`));
    img.src = url;
  });
}

/**
 * Preloads map tiles in the background with priority queue
 */
export async function preloadMapTiles(): Promise<void> {
  if (typeof window === 'undefined') return; // SSR guard
  
  const [centerLat, centerLng] = INITIAL_CENTER;
  const isDesktop = window.innerWidth >= 1024;
  const zoom = isDesktop ? DESKTOP_ZOOM : MOBILE_ZOOM;
  
  // Get tiles for the initial view
  const priorityTiles = getTilesInRadius(centerLat, centerLng, zoom, 2);
  const backgroundTiles = getTilesInRadius(centerLat, centerLng, zoom, 3);
  
  try {
    // Load priority tiles first (critical for initial view)
    const priorityPromises = priorityTiles.map(tile => 
      preloadTile(tile).catch(() => {}) // Ignore individual failures
    );
    
    await Promise.all(priorityPromises);
    
    // Load remaining tiles in background (non-blocking)
    const remainingTiles = backgroundTiles.filter(bg => 
      !priorityTiles.some(p => p.x === bg.x && p.y === bg.y && p.z === bg.z)
    );
    
    // Load remaining tiles with delay to not block other resources
    setTimeout(() => {
      remainingTiles.forEach(tile => {
        preloadTile(tile).catch(() => {}); // Fire and forget
      });
    }, 1000);
    
  } catch (error) {
    // Silent failure - tile preloading is an optimization, not critical
    if (import.meta.env.DEV) {
      console.warn('Map tile preloading failed:', error);
    }
  }
}

/**
 * Start tile preloading when the page is idle
 */
export function startTilePreloading(): void {
  if (typeof window === 'undefined') return;
  
  // Start preloading when browser is idle or after a short delay
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => preloadMapTiles(), { timeout: 2000 });
  } else {
    setTimeout(() => preloadMapTiles(), 1000);
  }
}