import { Component } from 'solid-js';
import { EDocumentDescription } from '@/types';
import Layout from '@layouts/Layout';
import SEO from '@components/SEO';
import NotFoundInfo from '@/components/NotFound';

const NotFoundPage: Component = () => {
  return (
    <Layout>
      <SEO description={EDocumentDescription.NOT_FOUND_PAGE} slug={`/*`} />
      <NotFoundInfo />
    </Layout>
  );
};

export default NotFoundPage;
