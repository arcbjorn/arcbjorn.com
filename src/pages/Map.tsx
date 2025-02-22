import { Component } from 'solid-js';
import Layout from '@layouts/Layout';
import Map from '@/components/map/Map';
import SEO from '@components/SEO';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';

import { EDocumentDescription } from '@/types';
import { Ei18nToken } from '@/i18n/types';
import { useI18n } from '@i18n/useI18n';

import styles from '@styles/map.module.css';

const MapPage: Component = () => {
  const { t, language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.MAP} slug={`/${language()}/map`} />
      <div class={styles.mapPage}>
        <h1 class={styles.mapTitle}>
          <TranslationMatrixEffect token={Ei18nToken.MY_TRAVEL_MAP_TITLE} />
        </h1>
        <Map />
      </div>
    </Layout>
  );
};

export default MapPage;
