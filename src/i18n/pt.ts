export const dict = {
  name: 'arcbjorn',

  notFound: {
    title: 'Página não encontrada',
    backButtonTitle: 'Voltar',
  },

  header: {
    about: 'sobre',
    extra: 'extra',
    location: 'Buenos Aires',
  },

  home: {
    file: 'sobre_mim',
    greeting: 'Olá, sou Oleg',
    position: 'Engenheiro de Software',
    formerly: 'anteriormente',
    interests: 'Web • Sistemas • IA • Blockchain',
    cv: 'CV',
  },

  extra: {
    platforms: {
      title: 'Eu em outras plataformas',
      allSocials: 'Todas as redes sociais',
      names: {
        myTravelMap: 'Meu mapa de viagens',
        blog: 'Blog',
      },
    },
    books: {
      title: 'Livros que eu gosto',
      categories: {
        software: 'Software',
        psychology: 'Psicologia',
        fantasy: 'Fantasia',
      },
    },
    languages: {
      title: 'Idiomas',
      english: 'Inglês',
      russian: 'Russo',
      spanish: 'Espanhol',
      german: 'Alemão',
      portuguese: 'Português',
      japanese: 'Japonês',
      swedish: 'Sueco',
      levels: {
        native: 'Nativo',
        fluent: 'Fluente',
        basic: 'Básico',
      },
    },
  },
};

export type Dictionary = typeof dict;
