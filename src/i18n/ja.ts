export const dict = {
  name: 'アークビョーン',

  notFound: {
    title: 'ページが見つかりません',
    backButtonTitle: '戻る',
  },

  header: {
    about: '私について',
    extra: 'その他',
    location: 'ブエノスアイレス',
  },

  home: {
    file: '私について',
    greeting: 'こんにちは、Olegです',
    position: 'ソフトウェアエンジニア',
    formerly: '以前',
    interests: 'Web • システム • 人工知能 • ブロックチェーン',
    cv: '履歴書',
  },

  extra: {
    platforms: {
      title: '他のプラットフォームでの私',
      names: {
        myTravelMap: '私の旅行マップ',
        blog: 'ブログ',
      },
      allSocials: 'すべてのソーシャルメディア',
    },
    books: {
      title: '好きな本',
      categories: {
        software: 'ソフトウェア',
        psychology: '心理学',
        fantasy: 'ファンタジー',
      },
    },
    languages: {
      title: '言語',
      english: '英語',
      russian: 'ロシア語',
      spanish: 'スペイン語',
      german: 'ドイツ語',
      portuguese: 'ポルトガル語',
      japanese: '日本語',
      swedish: 'スウェーデン語',
      levels: {
        native: '母語',
        fluent: '流暢',
        basic: '基礎',
      },
    },
  },
};

export type Dictionary = typeof dict;
