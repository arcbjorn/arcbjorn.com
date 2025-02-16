export const dict = {
  name: 'arkbjörn',

  notFound: {
    title: 'Sidan hittas int',
    backButtonTitle: 'gå tillbaka',
  },

  header: {
    about: 'om mig',
    extra: 'extra',
    location: 'Buenos Aires',
  },

  home: {
    file: 'om_mig',
    greeting: 'Hej, jag heter Oleg',
    position: 'Mjukvaruingenjör',
    formerly: 'tidigare',
    interests: 'Webb • System • AI • Blockchain',
    cv: 'CV',
  },

  extra: {
    platforms: {
      title: 'Mig på andra plattformar',
      names: {
        myTravelMap: 'Min resvägskarta',
        blog: 'Blogg',
      },
      allSocials: 'Alla sociala medier',
    },
    books: {
      title: 'Böcker som jag gillar',
      categories: {
        software: 'Programvara',
        psychology: 'Psykologi',
        fantasy: 'Fantasi',
      },
    },
    languages: {
      title: 'Språk',
      english: 'Engelska',
      russian: 'Ryska',
      spanish: 'Spanska',
      german: 'Tyska',
      portuguese: 'Portugisiska',
      japanese: 'Japanska',
      swedish: 'Svenska',
      levels: {
        native: 'Modersmål',
        fluent: 'Flytande',
        basic: 'Grundläggande',
      },
    },
  },
};

export type Dictionary = typeof dict;
