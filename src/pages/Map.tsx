import { Component, lazy, Suspense } from 'solid-js';
import Layout from '@layouts/Layout';
import SEO from '@components/SEO';
import Loader from '@components/Loader';

import { EDocumentDescription } from '@/types/types';
import { useI18n } from '@i18n/useI18n';

const Map = lazy(() => import('@components/Map'));

import animations from '@styles/animations.module.css';

const MapPage: Component = () => {
  const { language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.MAP} slug={`/${language()}/map`} />
      <div class={`relative flex h-full flex-col px-4 pb-4 ${animations.longerFadeIn}`}>
        <Suspense fallback={<Loader />}>
          <Map />
        </Suspense>
      </div>
    </Layout>
  );
};

export default MapPage;
