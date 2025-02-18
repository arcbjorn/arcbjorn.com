import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '@i18n/useI18n';

import { Ei18nToken } from '@i18n/types';
import styles from './NotFoundInfo.module.css';

const NotFoundInfo: Component = () => {
  const { t } = useI18n();

  return (
    <div class={styles.info}>
      <div class={styles.message}>
        <h1>{t(Ei18nToken.PAGE_NOT_FOUND)}</h1>
        <A href="/">
          <span class={styles.link}>{t(Ei18nToken.GO_BACK)}</span>
        </A>
      </div>
    </div>
  );
};

export default NotFoundInfo;
