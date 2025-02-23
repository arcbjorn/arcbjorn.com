import { Component, createEffect, onMount } from 'solid-js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import places from '@data/places.json';
import filteredGeoDataRaw from '@data/filtered_provinces.geojson?url';
import countryToCode from '@data/flagsMap';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';

import styles from '@styles/map.module.css';

interface Places {
  regions: Record<string, string[]>;
  provinces: Record<string, string[]>;
  planned_provinces: Record<string, string[]>;
  planned_regions: Record<string, string[]>;
}

const placesData = {
  regions: places.regions,
  provinces: places.provinces,
  planned_provinces: places.planned_provinces,
  planned_regions: places.planned_regions,
} as Places;

const Map: Component = () => {
  const { t, language } = useI18n();
  let mapContainer: HTMLDivElement | undefined;
  let mapInstance: L.Map | undefined;
  let legendInstance: L.Control | undefined;

  const createLegend = () => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      div.style.padding = '12px 15px';
      div.style.border = '1px solid rgba(255, 255, 255, 0.3)';
      div.style.borderRadius = '12px';
      div.style.backdropFilter = 'blur(8px)';
      div.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      div.style.color = '#333';
      div.style.fontSize = '14px';
      div.style.lineHeight = '1.6';
      div.style.fontFamily = 'var(--font-ibm), system-ui, sans-serif';

      div.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <i style="background: #008080; width: 18px; height: 18px; border-radius: 4px; margin-right: 10px; opacity: 0.9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></i>
          <span style="font-weight: 500;">${t(Ei18nToken.MAP_VISITED)}</span>
        </div>
        <div style="display: flex; align-items: center;">
          <i style="background: #f15025; width: 18px; height: 18px; border-radius: 4px; margin-right: 10px; opacity: 0.9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></i>
          <span style="font-weight: 500;">${t(Ei18nToken.MAP_PLAN_TO_VISIT)}</span>
        </div>
      `;

      return div;
    };

    return legend;
  };

  createEffect(() => {
    language();
    if (mapInstance && legendInstance) {
      mapInstance.removeControl(legendInstance);
      legendInstance = createLegend();
      legendInstance.addTo(mapInstance);
    }
  });

  onMount(async () => {
    if (!mapContainer) return;

    const isDesktop = window.innerWidth >= 1024;
    const initialZoom = isDesktop ? 3 : 2;

    mapInstance = L.map(mapContainer, {
      minZoom: isDesktop ? 1.5 : 2,
      maxZoom: 8,
      zoomControl: true,
      attributionControl: false,
      maxBounds: [
        [-85, -180],
        [85, 180],
      ],
      maxBoundsViscosity: 1.0,
    }).setView([20, 0], initialZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      bounds: [
        [-85, -180],
        [85, 180],
      ],
    }).addTo(mapInstance);

    legendInstance = createLegend();
    legendInstance.addTo(mapInstance);

    try {
      const response = await fetch(filteredGeoDataRaw);
      const provincesData = await response.json();

      // Fetch and parse the all data to get correct country/province/region names
      // const allData = await fetch(
      //   'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson'
      // );
      // const allDataJson = await allData.json();

      L.geoJSON(provincesData, {
        style: feature => {
          const country = feature?.properties?.admin;
          const province = feature?.properties?.name;
          const region = feature?.properties?.region;

          const isVisitedProvince = placesData.provinces[country as string]?.includes(
            province as string
          );
          const isVisitedRegion = placesData.regions[country as string]?.includes(region as string);

          const isPlannedProvince = placesData.planned_provinces?.[country as string]?.includes(
            province as string
          );
          const isPlannedRegion = placesData.planned_regions?.[country as string]?.includes(
            region as string
          );

          if (isVisitedProvince || isVisitedRegion) {
            return {
              color: '#008080',
              weight: 2,
              fillColor: '#008080',
              fillOpacity: 0.15,
              opacity: 0.8,
            };
          } else if (isPlannedProvince || isPlannedRegion) {
            return {
              color: '#f15025',
              weight: 2,
              fillColor: '#f15025',
              fillOpacity: 0.15,
              opacity: 0.8,
            };
          }

          return {
            color: '#cccccc',
            weight: 1,
            fillColor: 'transparent',
            fillOpacity: 0,
            opacity: 0.2,
          };
        },
        onEachFeature: (feature, layer) => {
          const country = feature?.properties?.admin;
          const province = feature?.properties?.name;
          const region = feature?.properties?.region;

          const isVisitedProvince = placesData.provinces[country as string]?.includes(
            province as string
          );
          const isVisitedRegion = placesData.regions[country as string]?.includes(region as string);

          const isPlannedProvince = placesData.planned_provinces?.[country as string]?.includes(
            province as string
          );
          const isPlannedRegion = placesData.planned_regions?.[country as string]?.includes(
            region as string
          );

          if (isVisitedProvince || isVisitedRegion || isPlannedProvince || isPlannedRegion) {
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
      }).addTo(mapInstance);

      window.addEventListener('resize', () => {
        const newIsDesktop = window.innerWidth >= 1024;
        mapInstance?.setMinZoom(newIsDesktop ? 1.5 : 2);
        mapInstance?.invalidateSize();
      });
    } catch (error) {
      console.error('Error loading map data:', error);
    }
  });

  return <div ref={mapContainer} class={styles.mapContainer} />;
};

export default Map;
