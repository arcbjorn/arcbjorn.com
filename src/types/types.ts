import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Ei18nToken } from '@i18n/types';

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
  MISCELLANEOUS = 'Miscellaneous',
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

type LinkBase<TLinkPartial = Record<string, unknown>> = TLinkPartial & {
  href: ELinkUrl;
  iconTitle: string;
};

type FontAwesomeLink = LinkBase & {
  iconPrefix: EIconLibrary.FONT_AWESOME;
  iconName: IconName;
};

type MaterialLink = LinkBase & {
  iconPrefix: EIconLibrary.MATERIAL;
  iconName: string;
};

type CustomLink = LinkBase & {
  iconPrefix: EIconLibrary.CUSTOM;
  iconName: string;
};

export type TLink<TLinkPartial = Record<string, unknown>> =
  | (FontAwesomeLink & TLinkPartial)
  | (MaterialLink & TLinkPartial)
  | (CustomLink & TLinkPartial);

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
  LEETCODE = 'LeetCode',

  X = 'X',
  INSTAGRAM = 'Instagram',
}

export enum ELinkUrl {
  LINKEDIN = 'https://www.linkedin.com/in/oleg-luganskiy/',
  GITHUB = 'https://www.github.com/arcbjorn',
  MAIL = 'mailto:oleg.luganskiy@gmail.com?subject=Employment%20Offer&body=Hi%20Oleg',
  CV = '/OL.CV.pdf',
  CV_LINK = 'https://arcbjorn.com/OL.CV.pdf',
  BLOG = 'https://blog.arcbjorn.com',

  PORTFOLIO = 'https://arcbjorn.com',
  COPY_MAIL = 'oleg.luganskiy@gmail.com',

  LEETCODE = 'https://leetcode.com/arcbjorn',

  X = 'https://x.com/arcbjorn',
  INSTAGRAM = 'https://www.instagram.com/arcbjorn',
}
