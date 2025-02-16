/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@material-design-icons/font';
import './index.css';

const routes = [
  {
    path: '/extra',
    component: lazy(() => import('./pages/Extra')),
  },
  {
    path: '/:lang/extra',
    component: lazy(() => import('./pages/Extra')),
  },
  {
    path: '/links',
    component: lazy(() => import('./pages/AccessLinks')),
  },
  {
    path: '/:lang/links',
    component: lazy(() => import('./pages/AccessLinks')),
  },
  {
    path: '*',
    component: lazy(() => import('./pages/404')),
  },
  {
    path: '/:lang/*',
    component: lazy(() => import('./pages/404')),
  },
];

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(() => <Router>{routes}</Router>, root!);
