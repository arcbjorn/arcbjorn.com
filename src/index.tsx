/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, useNavigate, useLocation } from '@solidjs/router';
import { lazy, Component } from 'solid-js';
import { Language } from '@i18n/useI18n';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@material-design-icons/font';
import './index.css';

const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/Index')),
  },
  {
    path: '/:lang',
    component: lazy(() => import('./pages/Index')),
  },
  {
    path: '/extra',
    component: lazy(() => import('./pages/Extra')),
  },
  {
    path: '/:lang/extra',
    component: lazy(() => import('./pages/Extra')),
  },
  {
    path: '/access_links',
    component: lazy(() => import('./pages/AccessLinks')),
  },
  {
    path: '/:lang/access_links',
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

const RouterWrapper: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
  const urlLang = langMatch?.[1];

  if (urlLang && !Object.values(Language).includes(urlLang as Language)) {
    const newPath = path.replace(/^\/[a-z]{2}/, '');
    navigate(newPath, { replace: true });
  }

  return <>{routes}</>;
};

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(
  () => (
    <Router>
      <RouterWrapper />
    </Router>
  ),
  root!
);
