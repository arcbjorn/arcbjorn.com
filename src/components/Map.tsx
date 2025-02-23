import { Component, onMount } from 'solid-js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import visitedPlaces from '@data/visited_places.json';
import filteredGeoDataRaw from '@data/filtered_visited_provinces.geojson?url';
import countryToCode from '@data/flagsMap';

import styles from '@styles/map.module.css';

interface VisitedPlaces {
  visitedRegions: Record<string, string[]>;
  visitedProvinces: Record<string, string[]>;
}

const visitedPlacesData = visitedPlaces as unknown as VisitedPlaces;

const Map: Component = () => {
  let mapContainer: HTMLDivElement | undefined;

  onMount(async () => {
    if (!mapContainer) return;

    // Calculate initial zoom based on screen width
    const isDesktop = window.innerWidth >= 1024;
    const initialZoom = isDesktop ? 1.5 : 2;

    // Initialize map with adjusted zoom restrictions
    const map = L.map(mapContainer, {
      minZoom: isDesktop ? 1.5 : 2, // Lower minimum zoom for desktop
      maxZoom: 8,
      zoomControl: true,
      maxBounds: [
        [-85, -180], // Adjusted to prevent white spaces
        [85, 180],
      ],
      maxBoundsViscosity: 1.0, // Ensures strict bounds enforcement
    }).setView([20, 0], initialZoom);

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      bounds: [
        [-85, -180],
        [85, 180],
      ],
    }).addTo(map);

    try {
      // Fetch and parse the GeoJSON data
      const response = await fetch(filteredGeoDataRaw);
      const provincesData = await response.json();

      // Fetch and parse the all data to get correct country/province/region names
      // const allData = await fetch(
      //   'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson'
      // );
      // const allDataJson = await allData.json();

      // Modified geoJSON layer with popup
      L.geoJSON(provincesData, {
        style: feature => {
          const country = feature?.properties?.admin;
          const province = feature?.properties?.name;
          const region = feature?.properties?.region;

          const isVisitedProvince = visitedPlacesData.visitedProvinces[country as string]?.includes(
            province as string
          );

          const isVisitedRegion = visitedPlacesData.visitedRegions[country as string]?.includes(
            region as string
          );

          const isVisited = isVisitedProvince || isVisitedRegion;

          return {
            color: isVisited ? '#008080' : '#cccccc',
            weight: isVisited ? 2 : 1,
            fillColor: isVisited ? '#008080' : 'transparent',
            fillOpacity: isVisited ? 0.15 : 0,
            opacity: isVisited ? 0.8 : 0.2,
          };
        },
        onEachFeature: (feature, layer) => {
          const country = feature?.properties?.admin;
          const province = feature?.properties?.name;
          const region = feature?.properties?.region;

          const isVisitedProvince = visitedPlacesData.visitedProvinces[country as string]?.includes(
            province as string
          );
          const isVisitedRegion = visitedPlacesData.visitedRegions[country as string]?.includes(
            region as string
          );

          if (isVisitedProvince || isVisitedRegion) {
            const countryCode = countryToCode[country as string] || '';
            const flag = countryCode
              ? `<span class="flag-icon flag-icon-${countryCode}"></span>`
              : '';

            layer.bindPopup(`
              <div>
                <h3>${flag} ${province || region}</h3>
                <p>${country}</p>
              </div>
            `);
          }
        },
      }).addTo(map);

      // Handle resize events
      window.addEventListener('resize', () => {
        const newIsDesktop = window.innerWidth >= 1024;
        map.setMinZoom(newIsDesktop ? 1.5 : 2);
        map.invalidateSize();
      });
    } catch (error) {
      console.error('Error loading map data:', error);
    }
  });

  return <div ref={mapContainer} class={styles.mapContainer} />;
};

export default Map;
