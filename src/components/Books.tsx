import { Component, For } from 'solid-js';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';
import { EBookCategory } from '@/types/types';
import { Ei18nToken } from '@i18n/types';

import books from '@/data/booksData';

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
  [EBookCategory.FANTASY]: Ei18nToken.FANTASY,
};

const categoriesList: EBookCategory[] = [
  EBookCategory.SOFTWARE,
  EBookCategory.PSYCHOLOGY,
  EBookCategory.FANTASY,
];

export const Books: Component = () => {
  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>
        <TranslationMatrixEffect token={Ei18nToken.BOOKS_TITLE} />
      </legend>
      <div class={styles.books}>
        <For each={categoriesList}>
          {option => (
            <>
              <span class={styles.categoryTitle}>
                <TranslationMatrixEffect token={categoryToI18nTokenMap[option]} />
              </span>
              <div class={styles.bookList}>
                <For each={books.filter(({ category }) => category === option)}>
                  {({ title, author, href }) => (
                    <div class={styles.bookEntry}>
                      <svg width="70" height="50" class={styles.treeNode}>
                        <line x1="30" y1="25" x2="60" y2="25" stroke="current" stroke-width="3" />
                        <line x1="30" y1="0" x2="30" y2="50" stroke="current" stroke-width="3" />
                      </svg>
                      <Book title={title} author={author} href={href} />
                    </div>
                  )}
                </For>
              </div>
            </>
          )}
        </For>
      </div>
    </fieldset>
  );
};

export default Books;
