import { Component, createEffect, For } from 'solid-js';
import { Meta, Title, Link } from '@solidjs/meta';
import { useI18n } from '@i18n/useI18n';

interface SEOProps {
  description: string;
  slug?: string;
}

const SITE_TITLE = 'Oleg Luganskiy';

// Supported languages with their hreflang codes
const LANGUAGES = [
  { code: 'en', path: '' },
  { code: 'es', path: 'es' },
  { code: 'de', path: 'de' },
  { code: 'ru', path: 'ru' },
  { code: 'pt', path: 'pt' },
  { code: 'ja', path: 'ja' },
  { code: 'sv', path: 'se' }, // Note: using 'se' as path but 'sv' for hreflang (ISO 639-1)
];

const SEO: Component<SEOProps> = props => {
  const { language } = useI18n();

  createEffect(() => {
    document.documentElement.lang = language();
  });

  const baseUrl = () => import.meta.env.DEV ? 'http://localhost:3000' : 'https://arcbjorn.com';

  const siteUrl = () => {
    const base = baseUrl();
    return props.slug ? `${base}/${props.slug}` : base;
  };

  const getAlternateUrl = (langPath: string) => {
    const base = baseUrl();
    if (!props.slug) {
      // Home page
      return langPath ? `${base}/${langPath}` : base;
    }
    // Other pages like /extra, /links, /map
    const page = props.slug.replace(/^(en|es|de|ru|pt|ja|se)\//, '');
    return langPath ? `${base}/${langPath}/${page}` : `${base}/${page}`;
  };

  return (
    <>
      <Meta name="language" content={language()} />
      <Title>{() => `${SITE_TITLE}${props.description ? ` | ${props.description}` : ''}`}</Title>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="description" content={props.description} />
      <Meta property="og:title" content={SITE_TITLE} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={() => siteUrl()} />
      <Meta property="og:site_name" content={SITE_TITLE} />
      <Meta property="og:image" content={() => `${baseUrl()}/icon.png`} />
      <Meta property="og:locale" content={() => {
        const langMap: Record<string, string> = {
          en: 'en_US',
          es: 'es_ES',
          de: 'de_DE',
          ru: 'ru_RU',
          pt: 'pt_BR',
          ja: 'ja_JP',
          se: 'sv_SE',
        };
        return langMap[language()] || 'en_US';
      }} />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:site" content="@arcbjorn" />
      <Meta name="twitter:image" content={() => `${baseUrl()}/icon.png`} />

      {/* Canonical URL - always point to non-www */}
      <Link rel="canonical" href={() => siteUrl()} />

      {/* Hreflang tags for language variants */}
      <For each={LANGUAGES}>
        {lang => (
          <Link rel="alternate" hreflang={lang.code} href={getAlternateUrl(lang.path)} />
        )}
      </For>

      {/* x-default for international fallback */}
      <Link rel="alternate" hreflang="x-default" href={getAlternateUrl('')} />

      <script type="application/ld+json" src="/structured-data.json" />
    </>
  );
};

export default SEO;
