import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '@i18n/useI18n';

import { Ei18nToken } from '@i18n/types';
import styles from '@styles/common.module.css';
import animations from '@styles/animations.module.css';
const NotFoundInfo: Component = () => {
  const { t } = useI18n();

  return (
    <div class={`${animations.fadeIn} flex h-full w-full items-center justify-center`}>
      <div class="text-center text-base sm:text-2xl">
        <h1>{t(Ei18nToken.PAGE_NOT_FOUND)}</h1>
        <A href="/">
          <span class={styles.link}>{t(Ei18nToken.GO_BACK)}</span>
        </A>
      </div>
    </div>
  );
};

export default NotFoundInfo;
