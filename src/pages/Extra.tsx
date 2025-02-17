import { Component, createEffect, createSignal } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { EDocumentDescription } from '@/types';
import Layout from '@layouts/Layout';
import Books from '@components/books/Books';
import Loader from '@components/Loader';
import ExtraLinks from '@components/extraLinks/ExtraLinks';
import Languages from '@components/languages/Languages';
import SEO from '@components/SEO';
import { Ei18nToken } from '@/i18n/types';

const ExtraPage: Component = () => {
  const [isLoading, setLoading] = createSignal(true);
  const { t, language } = useI18n();

  createEffect(() => {
    if (
      typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      window.location.href = '/';
    }
  });

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
        <div class="extra-info">
          <div class="extra-section w-full sm:w-5/12">
            <ExtraLinks />
            <a
              href="https://arcbjorn.bio.link"
              target="_blank"
              rel="noopener noreferrer"
              class="self-center p-4 text-center underline"
            >
              {t(Ei18nToken.ALL_SOCIALS)}
            </a>
            <Languages />
          </div>
          <div class="extra-section w-full sm:w-7/12">
            <Books />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ExtraPage;
