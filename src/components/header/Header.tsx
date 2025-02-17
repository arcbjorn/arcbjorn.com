import { Component } from 'solid-js';
import { A, useParams } from '@solidjs/router';
import { useI18n, Language } from '@i18n/useI18n';
import ThemeToggle from '@components/ThemeToggle';
import LanguageSwitch from '@components/LanguageSwitch';
import TimeZone from '@components/TimeZone';
import { Ei18nToken } from '@i18n/types';

export const Header: Component = () => {
  const { t } = useI18n();
  const params = useParams();

  const getPath = (path: string) => {
    const currentLang = params.lang || Language.EN;
    return currentLang === Language.EN ? path : `/${currentLang}${path}`;
  };

  return (
    <div class="header">
      <A class="logo" href={getPath('/')}>
        {t(Ei18nToken.NAME)}
      </A>
      <TimeZone />
      <div class="nav">
        <div class="links">
          <A class="link" activeClass="activeRoute" href={getPath('/')}>
            {t(Ei18nToken.ABOUT)}
          </A>
          <A class="link" activeClass="activeRoute" href={getPath('/extra')}>
            {t(Ei18nToken.EXTRA)}
          </A>
        </div>
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
