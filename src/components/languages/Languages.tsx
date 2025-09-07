import { Component, For, createMemo } from 'solid-js';
import { Ei18nToken } from '@i18n/types';
import languages from '@/data/languagesData';
import { getLevelToken } from '@utils/languages';
import TreeNode from '@components/ui/TreeNode';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';
import styles from '@styles/languages.module.css';
import extraStyles from '@styles/extra.module.css';

const Languages: Component = () => {
  const groupedLanguages = createMemo(() => {
    const groups = new Map<number, any[]>();

    languages.forEach(({ token, level }) => {
      if (!groups.has(level)) {
        groups.set(level, []);
      }
      groups.get(level)!.push(token);
    });

    const levelOrder = { 80: 0, 60: 1, 85: 2 }; // fluent, basic, native
    return Array.from(groups.entries()).sort((a, b) => levelOrder[a[0]] - levelOrder[b[0]]);
  });

  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>
        <TranslationMatrixEffect token={Ei18nToken.LANGUAGES_TITLE} />
      </legend>
      <div class={styles.languages}>
        <For each={groupedLanguages()}>
          {([level, tokens]) => (
            <div class={styles.languageEntry}>
              <TreeNode class={styles.treeNode} />
              <div class={styles.language}>
                <span>
                  <For each={tokens}>
                    {(token, i) => (
                      <>
                        <TranslationMatrixEffect token={token} />
                        {i() < tokens.length - 1 && ', '}
                      </>
                    )}
                  </For>
                </span>
                <span>
                  <TranslationMatrixEffect token={getLevelToken(level)} />
                </span>
              </div>
            </div>
          )}
        </For>
      </div>
    </fieldset>
  );
};

export default Languages;
