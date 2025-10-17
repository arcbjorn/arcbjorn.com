import { Component } from 'solid-js';
import { A, useParams, useLocation } from '@solidjs/router';
import ThemeToggle from '@components/ThemeToggle';
import LanguageSwitch from '@components/LanguageSwitch';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';

import { getNavMenuLinkPath, isActiveNavPath } from '@utils/navigation';
import { Ei18nToken } from '@i18n/types';

import styles from '@styles/header.module.css';
import common from '@styles/common.module.css';

export const Header: Component = () => {
  const params = useParams();
  const location = useLocation();

  return (
    <div class={styles.header}>
      <A class={styles.logo} href={getNavMenuLinkPath('/', params)}>
        <TranslationMatrixEffect token={Ei18nToken.NAME} />
      </A>
      <div class={styles.nav}>
        <div class={styles.links}>
          <A
            class={common.link}
            classList={{ [common.activeRoute]: isActiveNavPath('/', location, params) }}
            href={getNavMenuLinkPath('/', params)}
          >
            <TranslationMatrixEffect token={Ei18nToken.ABOUT} />
          </A>
          <A
            class={common.link}
            classList={{ [common.activeRoute]: isActiveNavPath('/extra', location, params) }}
            href={getNavMenuLinkPath('/extra', params)}
          >
            <TranslationMatrixEffect token={Ei18nToken.EXTRA} />
          </A>
          <A
            class={common.link}
            classList={{ [common.activeRoute]: isActiveNavPath('/map', location, params) }}
            href={getNavMenuLinkPath('/map', params)}
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
