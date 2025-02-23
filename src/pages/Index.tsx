import { Component } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { EDocumentDescription } from '@/types/types';
import Layout from '@layouts/Layout';
import Terminal from '@components/terminal/Terminal';
import SEO from '@components/SEO';

const IndexPage: Component = () => {
  const { language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.INDEX_PAGE} slug={`/${language()}/`} />
      <script
        data-website-id="88cd3360-86f7-4497-a654-46d79f251501"
        src="https://analytics.arcbjorn.com/umami.js"
      />
      <Terminal />
    </Layout>
  );
};

export default IndexPage;
