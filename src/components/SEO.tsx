// components/seo.js
import { Component, createEffect } from 'solid-js';
import { Meta, Title, Link, MetaProvider } from '@solidjs/meta';
import { useI18n } from '@i18n/useI18n';

interface SEOProps {
  description: string;
  slug?: string;
}

const SITE_TITLE = 'Oleg Luganskiy';

const SEO: Component<SEOProps> = props => {
  const { language } = useI18n();

  createEffect(() => {
    document.documentElement.lang = language();
  });

  const siteUrl = () => {
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3000/' : 'https://arcbjorn.com/';
    return props.slug ? `${baseUrl}${props.slug}` : baseUrl;
  };

  return (
    <MetaProvider>
      <Meta name="language" content={language()} />
      <Title>
        {SITE_TITLE}
        {props.description ? ` | ${props.description}` : ''}
      </Title>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="description" content={props.description} />
      <Meta property="og:title" content={SITE_TITLE} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={siteUrl()} />
      <Meta property="og:site_name" content={SITE_TITLE} />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:site" content="@arcbjorn" />
      <Link rel="canonical" href={siteUrl()} />
    </MetaProvider>
  );
};

export default SEO;
