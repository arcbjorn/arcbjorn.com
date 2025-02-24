import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Ei18nToken } from '@i18n/types';
import { MaterialIcon } from '@material-design-icons/font';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum EDocumentDescription {
  INDEX_PAGE = '',
  EXTRA = 'extra',
  ACCESS_LINKS = 'access_links',
  MAP = 'map',
  NOT_FOUND_PAGE = 'Not Found',
}

export type TLanguage = {
  token: Ei18nToken;
  level: number;
};

export enum EBookCategory {
  SOFTWARE = 'Software',
  PSYCHOLOGY = 'Psychology',
  FANTASY = 'Fantasy',
}

export type TBook = {
  author: string;
  title: string;
  category: EBookCategory;
  href: string;
};

export enum EIconLibrary {
  FONT_AWESOME = 'font-awesome',
  MATERIAL = 'material',
  CUSTOM = 'custom',
}

export type TLink<TLinkPartial = Record<string, string>> = TLinkPartial & {
  href: ELinkUrl;
  iconName: IconName | MaterialIcon; // its either font awesome or material icon
  iconPrefix: EIconLibrary;
  iconTitle: string;
};

export type IHomePageLinkPartial = {
  title: ELinkTitle | Ei18nToken;
};

export interface IPlatformLinkPartial {
  title: ELinkTitle | Ei18nToken;
}

export enum ELinkTitle {
  LINKEDIN = 'LinkedIn',
  GITHUB = 'Github',
  EMAIL = 'EMail',

  BLOG = 'Blog',
  LEETCODE = 'LeetCode',
  MY_TRAVEL_MAP = 'My travel map',

  TWITTER = 'Twitter',
  REDDIT = 'Reddit',
  INSTAGRAM = 'Instagram',
  SPOTIFY = 'Spotify',
  GOOD_READS = 'GoodReads',
}

export enum ELinkUrl {
  LINKEDIN = 'https://www.linkedin.com/in/oleg-luganskiy/',
  GITHUB = 'https://www.github.com/arcbjorn',
  MAIL = 'mailto:oleg.luganskiy@gmail.com?subject=Employment%20Offer&body=Hi%20Oleg',
  CV = '/OL.CV.pdf',
  CV_LINK = 'https://arcbjorn.com/OL.CV.pdf',

  PORTFOLIO = 'https://arcbjorn.com',
  COPY_MAIL = 'oleg.luganskiy@gmail.com',

  BLOG = 'https://blog.arcbjorn.com/',
  LEETCODE = 'https://leetcode.com/arcbjorn',
  MY_TRAVEL_MAP = 'https://www.mytravelmap.xyz/u/gg104931485347737929283',

  TWITTER = 'https://twitter.com/arcbjorn',
  REDDIT = 'https://www.reddit.com/u/Arcbjorn',
  INSTAGRAM = 'https://www.instagram.com/arcbjorn',
  SPOTIFY = 'https://open.spotify.com/user/hrpn170u8d82ch90nw6y1floe',
  GOOD_READS = 'https://www.goodreads.com/arcbjorn',
}
