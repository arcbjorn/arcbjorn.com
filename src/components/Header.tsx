import { Component } from 'solid-js';
import { A, useParams, useLocation } from '@solidjs/router';
import ThemeToggle from '@components/ThemeToggle';
import LanguageSwitch from '@components/LanguageSwitch';
import TimeZone from '@components/TimeZone';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';

import { getNavPath } from '@utils/helpers';
import { Ei18nToken } from '@i18n/types';

import styles from '@styles/header.module.css';
import common from '@styles/common.module.css';

export const Header: Component = () => {
  const params = useParams();
  const location = useLocation();

  const isActive = (path: string) => {
    const currentPath = location.pathname;
    const langPrefix = params.lang ? `/${params.lang}` : '';

    if (path === '/') {
      return currentPath === '/' || currentPath === langPrefix;
    }

    return currentPath === path || currentPath === `${langPrefix}${path}`;
  };

  return (
    <div class={styles.header}>
      <A class={styles.logo} href={getNavPath('/', params)}>
        <TranslationMatrixEffect token={Ei18nToken.NAME} />
      </A>
      <TimeZone />
      <div class={styles.nav}>
        <div class={styles.links}>
          <A
            class={common.link}
            classList={{ [common.activeRoute]: isActive('/') }}
            href={getNavPath('/', params)}
          >
            <TranslationMatrixEffect token={Ei18nToken.ABOUT} />
          </A>
          <A
            class={common.link}
            classList={{ [common.activeRoute]: isActive('/extra') }}
            href={getNavPath('/extra', params)}
          >
            <TranslationMatrixEffect token={Ei18nToken.EXTRA} />
          </A>
          <A
            class={common.link}
            classList={{ [common.activeRoute]: isActive('/map') }}
            href={getNavPath('/map', params)}
          >
            <TranslationMatrixEffect token={Ei18nToken.MAP} />
          </A>
        </div>
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
