import { Component } from 'solid-js';
import Layout from '@layouts/Layout';
import Map from '@/components/map/Map';
import SEO from '@components/SEO';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';

import { EDocumentDescription } from '@/types/types';
import { Ei18nToken } from '@i18n/types';
import { useI18n } from '@i18n/useI18n';

const MapPage: Component = () => {
  const { t, language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.MAP} slug={`/${language()}/map`} />
      <div class="relative flex h-full flex-col p-4">
        <h1 class="mb-4 text-center text-2xl">
          <TranslationMatrixEffect token={Ei18nToken.MY_TRAVEL_MAP_TITLE} lowerCase={true} />
        </h1>
        <Map />
      </div>
    </Layout>
  );
};

export default MapPage;
