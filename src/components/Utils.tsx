import { Component, For } from 'solid-js';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';
import { Ei18nToken } from '@i18n/types';

import utils from '@data/utilsData';

import extraStyles from '@styles/extra.module.css';
import styles from '@styles/utils.module.css';

type UtilRowProps = {
  name: string;
  description: string;
  technology: string;
  href: string;
  status?: 'active' | 'experimental' | 'archived';
};

const UtilRow: Component<UtilRowProps> = props => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer" class={styles.utilRow}>
      <div class={styles.titleRow}>
        <span class={styles.utilName}>{props.name}</span>
        <span class={styles.technologyColumn}>{props.technology}</span>
      </div>
      <span class={styles.descriptionColumn}>{props.description}</span>
    </a>
  );
};

export const Utils: Component = () => {
  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>
        <TranslationMatrixEffect token={Ei18nToken.UTILS_TITLE} />
      </legend>
      <div class={styles.utils}>
        <For each={utils}>
          {({ name, description, technology, href, status }) => (
            <div class={styles.utilEntry}>
              <UtilRow
                name={name}
                description={description}
                technology={technology}
                href={href}
                status={status}
              />
            </div>
          )}
        </For>
      </div>
    </fieldset>
  );
};

export default Utils;
