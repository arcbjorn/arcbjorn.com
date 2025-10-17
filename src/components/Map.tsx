import { Component, createEffect, onMount } from 'solid-js';
import type { Map as LeafletMap, Control as LeafletControl, LatLngBoundsLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import places from '@data/places.json';
import filteredGeoDataRaw from '@data/filtered_provinces.geojson?url';

import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';

import styles from '@styles/map.module.css';

import {
  Places,
  getFeatureStyle,
  isRelevant,
  createLegend,
  createPopupContent,
  addRegionLabels,
} from '@utils/map';

const placesData = {
  regions: places.regions,
  provinces: places.provinces,
  planned_provinces: places.planned_provinces,
  planned_regions: places.planned_regions,
} as Places;

const config = {
  DESKTOP_MIN_ZOOM: 1.5,
  MOBILE_MIN_ZOOM: 1,
  MAX_ZOOM: 8,
  MAX_BOUNDS: [
    [-85, -180],
    [85, 180],
  ] as LatLngBoundsLiteral,
  INITIAL_CENTER: [20, -20] as [number, number],
} as const;

const Map: Component = () => {
  const { t, language } = useI18n();
  let mapContainer: HTMLDivElement | undefined;
  let mapInstance: LeafletMap | undefined;
  let legendInstance: LeafletControl | undefined;
  let L: any;

  const ensureLeaflet = async () => {
    if (!L) {
      const mod = await import('leaflet');
      L = mod.default ?? mod;
    }
  };

  const initializeMap = () => {
    if (!mapContainer) return;

    const isDesktop = window.innerWidth >= 1024;
    const initialZoom = isDesktop ? 3 : 2;

    mapInstance = L.map(mapContainer, {
      minZoom: isDesktop ? config.DESKTOP_MIN_ZOOM : config.MOBILE_MIN_ZOOM,
      maxZoom: config.MAX_ZOOM,
      zoomControl: true,
      attributionControl: false,
      maxBounds: config.MAX_BOUNDS,
      maxBoundsViscosity: 1.0,
    }).setView(config.INITIAL_CENTER, initialZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      bounds: config.MAX_BOUNDS,
    }).addTo(mapInstance);

    if (mapInstance) {
      addRegionLabels(mapInstance, language());
      legendInstance = createLegend(t(Ei18nToken.MAP_VISITED), t(Ei18nToken.MAP_PLAN_TO_VISIT));
      legendInstance.addTo(mapInstance);
    }
  };

  const handleResize = () => {
    const newIsDesktop = window.innerWidth >= 1024;
    mapInstance?.setMinZoom(newIsDesktop ? config.DESKTOP_MIN_ZOOM : config.MOBILE_MIN_ZOOM);
    mapInstance?.invalidateSize();

    if (mapInstance && legendInstance) {
      mapInstance.removeControl(legendInstance);
      legendInstance = createLegend(t(Ei18nToken.MAP_VISITED), t(Ei18nToken.MAP_PLAN_TO_VISIT));
      legendInstance.addTo(mapInstance);
    }
  };

  const loadGeoData = async () => {
    try {
      const response = await fetch(filteredGeoDataRaw);
      const provincesData = await response.json();

      L.geoJSON(provincesData, {
        style: (feature: GeoJSON.Feature | undefined) => getFeatureStyle(feature, placesData),
        // eslint-disable-next-line no-undef
        onEachFeature: (feature: GeoJSON.Feature, layer: L.Layer) => {
          if (isRelevant(feature, placesData)) {
            layer.bindPopup(createPopupContent(feature));
          }
        },
      }).addTo(mapInstance!);

      window.addEventListener('resize', handleResize);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading map data:', error);
      }
    }
  };

  createEffect(() => {
    language();
    if (mapInstance && legendInstance) {
      mapInstance.removeControl(legendInstance);
      legendInstance = createLegend(t(Ei18nToken.MAP_VISITED), t(Ei18nToken.MAP_PLAN_TO_VISIT));
      legendInstance.addTo(mapInstance);

      const elements = document.getElementsByClassName('continent-label');
      while (elements.length > 0) {
        elements[0].remove();
      }
      addRegionLabels(mapInstance, language());
    }
  });

  onMount(() => {
    ensureLeaflet().then(() => {
      initializeMap();
      loadGeoData();
    });
  });

  return <div ref={mapContainer} class={styles.mapContainer} />;
};

export default Map;
