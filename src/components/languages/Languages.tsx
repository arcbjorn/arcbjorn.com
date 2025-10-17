import { Component, For, createMemo } from 'solid-js';
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

    const levelOrder: Record<number, number> = { 80: 0, 60: 1, 85: 2 }; // fluent, basic, native
    return Array.from(groups.entries()).sort((a, b) => levelOrder[a[0]] - levelOrder[b[0]]);
  });

  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          style={{ width: '1.25rem', height: '1.25rem', display: 'inline-block' }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
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
