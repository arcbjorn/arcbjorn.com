import { Component, For, createSignal } from 'solid-js';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';
import TreeNode from '@components/ui/TreeNode';
import { EBookCategory } from '@/types/types';
import { Ei18nToken } from '@i18n/types';

import books from '@data/booksData';

import extraStyles from '@styles/extra.module.css';
import styles from '@styles/books.module.css';

type BookProps = {
  title: string;
  author: string;
  href: string;
};

const Book: Component<BookProps> = props => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      class="flex flex-1 justify-between py-3 pr-5 pl-5 md:pl-0"
    >
      <span>{`«${props.title}»`}</span>
      <span>{props.author}</span>
    </a>
  );
};

const categoryToI18nTokenMap: Record<EBookCategory, Ei18nToken> = {
  [EBookCategory.SOFTWARE]: Ei18nToken.SOFTWARE,
  [EBookCategory.PSYCHOLOGY]: Ei18nToken.PSYCHOLOGY,
  [EBookCategory.MISCELLANEOUS]: Ei18nToken.MISCELLANEOUS,
};

const categoriesList: EBookCategory[] = [
  EBookCategory.SOFTWARE,
  EBookCategory.PSYCHOLOGY,
  EBookCategory.MISCELLANEOUS,
];

export const Books: Component = () => {
  const [expandedSections, setExpandedSections] = createSignal<Set<EBookCategory>>(
    new Set([EBookCategory.PSYCHOLOGY]) // Psychology open by default
  );

  const toggleSection = (category: EBookCategory) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const isExpanded = (category: EBookCategory) => expandedSections().has(category);

  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>
        <TranslationMatrixEffect token={Ei18nToken.BOOKS_TITLE} />
      </legend>
      <div class={styles.books}>
        <For each={categoriesList}>
          {option => (
            <div class={styles.categorySection}>
              <button class={styles.categoryButton} onClick={() => toggleSection(option)}>
                <span class={`${styles.expandIcon} ${isExpanded(option) ? styles.expanded : ''}`}>
                  ▶
                </span>
                <span class={styles.categoryTitle}>
                  <TranslationMatrixEffect token={categoryToI18nTokenMap[option]} />
                </span>
              </button>
              {isExpanded(option) && (
                <div class={styles.bookList}>
                  <For each={books.filter(({ category }) => category === option)}>
                    {({ title, author, href }) => (
                      <div class={styles.bookEntry}>
                        <TreeNode class={styles.treeNode} />
                        <Book title={title} author={author} href={href} />
                      </div>
                    )}
                  </For>
                </div>
              )}
            </div>
          )}
        </For>
      </div>
    </fieldset>
  );
};

export default Books;
