import { Component, createEffect, createSignal } from 'solid-js';
import Layout from '@layouts/Layout';
import Map from '@components/Map';
import SEO from '@components/SEO';
import Loader from '@components/Loader';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';

import { EDocumentDescription } from '@/types/types';
import { Ei18nToken } from '@i18n/types';
import { useI18n } from '@i18n/useI18n';

import animations from '@styles/animations.module.css';

const MapPage: Component = () => {
  const { language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.MAP} slug={`/${language()}/map`} />
      <div class={`relative flex h-full flex-col p-4 ${animations.longerFadeIn}`}>
        <h1 class="mb-4 text-center text-2xl">
          <TranslationMatrixEffect token={Ei18nToken.MY_TRAVEL_MAP_TITLE} lowerCase={true} />
        </h1>
        <Map />
      </div>
    </Layout>
  );
};

export default MapPage;
