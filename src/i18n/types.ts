export type Dictionary = {
  name: string;
  shortName: string;

  header: {
    about: string;
    extra: string;
    location: string;
    map: string;
  };

  notFound: {
    title: string;
    backButtonTitle: string;
  };

  home: {
    file: string;
    greeting: string;
    position: string;
    formerly: string;
    interests: string;
    cv: string;
  };

  extra: {
    platforms: {
      title: string;
      allSocials: string;
      names: {
        myTravelMap: string;
        blog: string;
      };
    };

    books: {
      title: string;
      categories: {
        software: string;
        psychology: string;
        fantasy: string;
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
};

export enum Ei18nToken {
  NAME = 'name',
  SHORT_NAME = 'shortName',

  LOCATION = 'header.location',

  PAGE_NOT_FOUND = 'notFound.title',
  GO_BACK = 'notFound.backButtonTitle',

  ABOUT = 'header.about',
  EXTRA = 'header.extra',
  MAP = 'header.map',

  FILE = 'home.file',
  GREETING = 'home.greeting',
  POSITION = 'home.position',
  FORMERLY = 'home.formerly',
  INTERESTS = 'home.interests',
  CV = 'home.cv',

  PLATFORMS_TITLE = 'extra.platforms.title',

  BLOG_TITLE = 'extra.platforms.names.blog',
  MY_TRAVEL_MAP_TITLE = 'extra.platforms.names.myTravelMap',

  BOOKS_TITLE = 'extra.books.title',

  SOFTWARE = 'extra.books.categories.software',
  PSYCHOLOGY = 'extra.books.categories.psychology',
  FANTASY = 'extra.books.categories.fantasy',

  LANGUAGES_TITLE = 'extra.languages.title',

  LANG_ENGLISH_NAME = 'extra.languages.english',
  LANG_RUSSIAN_NAME = 'extra.languages.russian',
  LANG_GERMAN_NAME = 'extra.languages.german',
  LANG_SPANISH_NAME = 'extra.languages.spanish',
  LANG_PORTUGUESE_NAME = 'extra.languages.portuguese',
  LANG_JAPANESE_NAME = 'extra.languages.japanese',
  LANG_SWEDISH_NAME = 'extra.languages.swedish',

  ALL_SOCIALS = 'extra.platforms.allSocials',

  LANG_LEVEL_NATIVE = 'extra.languages.levels.native',
  LANG_LEVEL_FLUENT = 'extra.languages.levels.fluent',
  LANG_LEVEL_BASIC = 'extra.languages.levels.basic',
}
