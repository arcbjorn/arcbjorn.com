import { Component, createEffect, createSignal } from 'solid-js';
import Layout from '@layouts/Layout';
import Books from '@/components/Books';
import Utils from '@/components/Utils';
import Loader from '@components/Loader';
import ExtraLinks from '@components/extraLinks/ExtraLinks';
import Languages from '@components/languages/Languages';
import SEO from '@components/SEO';

import { useI18n } from '@i18n/useI18n';
import { EDocumentDescription } from '@/types/types';

import styles from '@styles/extra.module.css';
import animations from '@styles/animations.module.css';

const ExtraPage: Component = () => {
  const [isLoading, setLoading] = createSignal(true);
  const { language } = useI18n();

  createEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  });

  return (
    <Layout>
      <SEO description={EDocumentDescription.EXTRA} slug={`/${language()}/extra`} />

      {isLoading() ? (
        <Loader />
      ) : (
        <div class={`${styles.extraInfo} ${animations.fadeIn}`}>
          {/* Left Column */}
          <div class={styles.extraSection}>
            <Utils />
            <ExtraLinks />
          </div>

          {/* Right Column */}
          <div class={styles.extraSection}>
            <Books />
            <Languages />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ExtraPage;
