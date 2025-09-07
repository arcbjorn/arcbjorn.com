/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { MetaProvider } from '@solidjs/meta';

import IndexPage from '@/pages/Index';
import ExtraPage from '@/pages/Extra';
import AccessLinksPage from '@/pages/AccessLinks';
import NotFoundPage from '@/pages/404';
import MapPage from '@/pages/Map';

import './index.css';
import filteredGeoDataRaw from '@data/filtered_provinces.geojson?url';
import { startTilePreloading } from '@utils/tilePreloader';

const routes = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/:lang',
    component: IndexPage,
  },
  {
    path: '/extra',
    component: ExtraPage,
  },
  {
    path: '/:lang/extra',
    component: ExtraPage,
  },
  {
    path: '/links',
    component: AccessLinksPage,
  },
  {
    path: '/:lang/links',
    component: AccessLinksPage,
  },
  {
    path: '/map',
    component: MapPage,
  },
  {
    path: '/:lang/map',
    component: MapPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(
  () => (
    <MetaProvider>
      <Router>{routes}</Router>
    </MetaProvider>
  ),
  root!
);

// Preload Map code and data in the background for instant nav
const prewarmMap = () => {
  const idle = (cb: () => void) =>
    typeof (window as any).requestIdleCallback === 'function'
      ? (window as any).requestIdleCallback(cb)
      : setTimeout(cb, 0);

  idle(() => {
    // Preload the Map component (pulls Leaflet with it)
    import('@components/Map').catch(() => {});
    import('leaflet').catch(() => {});
    // Prime the GeoJSON in the HTTP cache
    fetch(filteredGeoDataRaw).catch(() => {});
    // Start preloading map tiles in background
    startTilePreloading();
  });
};

prewarmMap();

// Load analytics only in production
if (import.meta.env.PROD) {
  const existing = document.querySelector(
    'script[data-website-id="8f336108-6224-410f-8d56-8025fae879f7"]'
  );
  if (!existing) {
    const s = document.createElement('script');
    s.defer = true;
    s.src = 'https://analytics.arcbjorn.com/script.js';
    s.setAttribute('data-website-id', '8f336108-6224-410f-8d56-8025fae879f7');
    document.head.appendChild(s);
  }
}
