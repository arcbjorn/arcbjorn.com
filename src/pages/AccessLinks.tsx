import { Component } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { EDocumentDescription } from '@/types';
import Layout from '@layouts/Layout';
import SEO from '@components/SEO';
import { quickAccessLinks } from '@/data/links';
import QuickLink from '@/components/QuickLink';
import styles from '@styles/terminal.module.css';

const AccessLinksPage: Component = () => {
  const { language } = useI18n();

  return (
    <Layout>
      <SEO description={EDocumentDescription.ACCESS_LINKS} slug={`/${language()}/access_links`} />
      <div class="flex h-full flex-col items-center px-6 pt-10 sm:pt-16">
        <h3 class="text-xl font-bold sm:text-2xl">Click to copy link:</h3>
        <div class={`${styles.quickLinks} flex-col`}>
          {quickAccessLinks.map(link => (
            <QuickLink link={link} copyToClipboard={true} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AccessLinksPage;
