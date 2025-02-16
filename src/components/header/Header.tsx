import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '@i18n/useI18n';
import ThemeToggle from '@components/ThemeToggle';
import LanguageSwitch from '@components/LanguageSwitch';
import TimeZone from '@components/TimeZone';
import { Ei18nToken } from '@i18n/types';

enum Route {
  about = '/',
  extra = '/extra',
}

export const Header: Component = () => {
  const { t } = useI18n();

  return (
    <div class="header">
      <A class="logo" href={Route.about}>
        {t(Ei18nToken.NAME)}
      </A>
      <TimeZone />
      <div class="nav">
        <div class="links">
          <A class="link" activeClass="activeRoute" href={Route.about}>
            {t(Ei18nToken.ABOUT)}
          </A>
          <A class="link" activeClass="activeRoute" href={Route.extra}>
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
