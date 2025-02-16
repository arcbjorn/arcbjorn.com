export const dict = {
  name: 'arcbjorn',

  notFound: {
    title: 'Страница не найдена',
    backButtonTitle: 'Назад',
  },

  header: {
    about: 'обо мне',
    extra: 'дополнительно',
    location: 'Буэнос-Айрес',
  },

  home: {
    file: 'обо_мне',
    greeting: 'Привет, меня зовут Олег',
    position: 'Инженер ПО',
    formerly: 'ранее',
    interests: 'Web • Системы • ИИ • Блокчейн',
    cv: 'Resume',
  },

  extra: {
    platforms: {
      title: 'Я на других платформах',
      names: {
        myTravelMap: 'Карта моих путешествий',
        blog: 'Блог',
      },
      allSocials: 'Все социальные сети',
    },
    books: {
      title: 'Книги, которым отдаю предпочтение',
      categories: {
        software: 'Разработка ПО',
        psychology: 'Психология',
        fantasy: 'Фэнтази',
      },
    },
    languages: {
      title: 'Языки',
      english: 'Английский',
      russian: 'Русский',
      spanish: 'Испанский',
      german: 'Немецкий',
      portuguese: 'Португальский',
      japanese: 'Японский',
      swedish: 'Шведский',
      levels: {
        native: 'Родной',
        fluent: 'Свободно',
        basic: 'Базовый',
      },
    },
  },
};

export type Dictionary = typeof dict;
