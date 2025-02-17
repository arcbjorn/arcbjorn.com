import { Component, For } from 'solid-js';
import { EBookCategory } from '@/types';
import { Ei18nToken } from '@i18n/types';
import books from '@/data/booksData';
import { useI18n } from '@i18n/useI18n';

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
      <span>{`"${props.title}"`}</span>
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
  const { t } = useI18n();

  return (
    <fieldset class="extra-inner-section">
      <legend class="extra-section-title">{t(Ei18nToken.BOOKS_TITLE)}</legend>
      <div class="books flex flex-col pt-5">
        <For each={categoriesList}>
          {option => (
            <>
              <span class="category-title">{t(categoryToI18nTokenMap[option])}</span>
              <div class="py-5">
                <For each={books.filter(({ category }) => category === option)}>
                  {({ title, author, href }) => (
                    <div class="book-entry">
                      <svg width="70" height="50" class="tree-node hidden md:block">
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
