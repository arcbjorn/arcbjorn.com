import { Component } from 'solid-js';
import FloatingMapButton from '@components/FloatingMapButton';
import Layout from '@layouts/Layout';
import Terminal from '@components/terminal/Terminal';
import SEO from '@components/SEO';

import { EDocumentDescription } from '@/types/types';
import { useI18n } from '@i18n/useI18n';

const IndexPage: Component = () => {
  const { language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.INDEX_PAGE} slug={`/${language()}/`} />
      <Terminal />
      <FloatingMapButton />
    </Layout>
  );
};

export default IndexPage;
