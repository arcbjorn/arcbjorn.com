/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import IndexPage from '@/pages/Index';
import ExtraPage from '@/pages/Extra';
import AccessLinksPage from '@/pages/AccessLinks';
import NotFoundPage from '@/pages/404';
import MapPage from '@/pages/Map';

import '@material-design-icons/font';
import './index.css';

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

render(() => <Router>{routes}</Router>, root!);
