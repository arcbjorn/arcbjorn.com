import { Component, onMount } from 'solid-js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '@styles/map.module.css';

// Sample locations - replace with your actual visited places
const locations = [
  { name: 'Buenos Aires', coords: [-34.6037, -58.3816] },
  { name: 'Tokyo', coords: [35.6762, 139.6503] },
  { name: 'Stockholm', coords: [59.3293, 18.0686] },
  // Add more locations as needed
];

const Map: Component = () => {
  let mapContainer: HTMLDivElement | undefined;

  onMount(() => {
    if (!mapContainer) return;

    const map = L.map(mapContainer).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add markers for each location
    locations.forEach(location => {
      L.marker(location.coords as L.LatLngExpression)
        .bindPopup(location.name)
        .addTo(map);
    });
  });

  return <div ref={mapContainer} class={styles.mapContainer} />;
};

export default Map;
