import { Component } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { EDocumentDescription } from '@/types';
import Layout from '@layouts/Layout';
import SEO from '@components/SEO';
import { QuickAccessLinks } from '@/components/QuickAccessLinks';

const AccessLinksPage: Component = () => {
  const { language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.ACCESS_LINKS} slug={`/${language()}/access_links`} />
      <QuickAccessLinks />
    </Layout>
  );
};

export default AccessLinksPage;
