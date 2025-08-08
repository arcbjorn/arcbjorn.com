import { Component, For } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';
import languages from '@/data/languagesData';
import Language from '@/components/languages/Language';
import TreeNode from '@components/ui/TreeNode';
import styles from '@styles/languages.module.css';
import extraStyles from '@styles/extra.module.css';

const Languages: Component = () => {
  const { t } = useI18n();

  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>{t(Ei18nToken.LANGUAGES_TITLE)}</legend>
      <div class={styles.languages}>
        <For each={languages}>
          {({ token, level }, i) => (
            <div class={styles.languageEntry}>
              <TreeNode class={styles.treeNode} />
              <Language token={token} level={level} />
            </div>
          )}
        </For>
      </div>
    </fieldset>
  );
};

export default Languages;
