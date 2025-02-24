import { Ei18nToken } from '@i18n/types';

export const getLevelToken = (numLevel: number): Ei18nToken => {
  switch (numLevel) {
    case 100:
      return Ei18nToken.LANG_LEVEL_NATIVE;
    case 90:
      return Ei18nToken.LANG_LEVEL_FLUENT;
    case 70:
      return Ei18nToken.LANG_LEVEL_BASIC;
    default:
      return Ei18nToken.LANG_LEVEL_BASIC;
  }
};
