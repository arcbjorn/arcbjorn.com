import { Component, createEffect, createSignal } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { EDocumentDescription } from '@/types';
import Layout from '@layouts/Layout';
import SEO from '@components/SEO';
import NotFoundInfo from '@/components/notFound/NotFound';

const NotFoundPage: Component = () => {
  return (
    <Layout>
      <SEO description={EDocumentDescription.NOT_FOUND_PAGE} slug={`/*`} />
      <NotFoundInfo />
    </Layout>
  );
};

export default NotFoundPage;
