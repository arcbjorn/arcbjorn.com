export const dict = {
  name: 'arcbjorn',

  notFound: {
    title: 'Página no encontrada',
    backButtonTitle: 'Volver',
  },

  header: {
    about: 'sobre',
    extra: 'extra',
    location: 'Buenos Aires',
  },

  home: {
    file: 'sobre_mi',
    greeting: 'Hola, soy Oleg',
    position: 'Ingeniero de software',
    formerly: 'anteriormente',
    interests: 'Web • Sistemas • IA • Blockchain',
    cv: 'CV',
  },

  extra: {
    platforms: {
      title: 'Yo en otras plataformas',
      allSocials: 'Todas las redes sociales',
      names: {
        myTravelMap: 'Mi mapa de viajes',
        blog: 'Blog',
      },
    },
    books: {
      title: 'Libros que me gustan',
      categories: {
        software: 'Software',
        psychology: 'Psicología',
        fantasy: 'Fantasía',
      },
    },
    languages: {
      title: 'Idiomas',
      english: 'Inglés',
      russian: 'Ruso',
      spanish: 'Español',
      german: 'Alemán',
      portuguese: 'Portugués',
      japanese: 'Japonés',
      swedish: 'Sueco',
      levels: {
        native: 'Nativo',
        fluent: 'Fluido',
        basic: 'Básico',
      },
    },
  },
};

export type Dictionary = typeof dict;
