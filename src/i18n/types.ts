export type Dictionary = {
  name: string;
  short_name: string;

  header: {
    about: string;
    extra: string;
    location: string;
    map: string;
  };

  not_found: {
    title: string;
    back_button_title: string;
  };

  home: {
    file: string;
    greeting: string;
    pronunciation: string;
    formerly: string;
    summary_line1: string;
    summary_line2: string;
    cv: string;
    blog: string;
  };

  extra: {
    platforms: {
      title: string;
    };

    utils: {
      title: string;
    };

    books: {
      title: string;
      categories: {
        software: string;
        psychology: string;
        miscellaneous: string;
      };
    };

    languages: {
      title: string;
      english: string;
      russian: string;
      swedish: string;
      portuguese: string;
      japanese: string;
      german: string;
      spanish: string;
      levels: {
        native: string;
        fluent: string;
        basic: string;
      };
    };
  };

  map: {
    visited: string;
    plan_to_visit: string;
  };

  aria_label: {
    select_language: string;
    toggle_theme: string;
  };
};

export enum Ei18nToken {
  NAME = 'name',
  SHORT_NAME = 'short_name',

  LOCATION = 'header.location',

  PAGE_NOT_FOUND = 'not_found.title',
  GO_BACK = 'not_found.back_button_title',

  ABOUT = 'header.about',
  EXTRA = 'header.extra',
  MAP = 'header.map',

  FILE = 'home.file',
  GREETING = 'home.greeting',
  PRONUNCIATION = 'home.pronunciation',
  FORMERLY = 'home.formerly',
  SUMMARY_LINE1 = 'home.summary_line1',
  SUMMARY_LINE2 = 'home.summary_line2',
  SUMMARY_LINE3 = 'home.summary_line3',
  CV = 'home.cv',
  BLOG_TITLE = 'home.blog',

  PLATFORMS_TITLE = 'extra.platforms.title',

  UTILS_TITLE = 'extra.utils.title',

  BOOKS_TITLE = 'extra.books.title',

  SOFTWARE = 'extra.books.categories.software',
  PSYCHOLOGY = 'extra.books.categories.psychology',
  MISCELLANEOUS = 'extra.books.categories.miscellaneous',

  LANGUAGES_TITLE = 'extra.languages.title',

  LANG_ENGLISH_NAME = 'extra.languages.english',
  LANG_RUSSIAN_NAME = 'extra.languages.russian',
  LANG_GERMAN_NAME = 'extra.languages.german',
  LANG_SPANISH_NAME = 'extra.languages.spanish',
  LANG_PORTUGUESE_NAME = 'extra.languages.portuguese',
  LANG_JAPANESE_NAME = 'extra.languages.japanese',
  LANG_SWEDISH_NAME = 'extra.languages.swedish',

  LANG_LEVEL_NATIVE = 'extra.languages.levels.native',
  LANG_LEVEL_FLUENT = 'extra.languages.levels.fluent',
  LANG_LEVEL_BASIC = 'extra.languages.levels.basic',

  MAP_VISITED = 'map.visited',
  MAP_PLAN_TO_VISIT = 'map.plan_to_visit',

  ARIA_LABEL_SELECT_LANGUAGE = 'aria_label.select_language',
  ARIA_LABEL_TOGGLE_THEME = 'aria_label.toggle_theme',
}
