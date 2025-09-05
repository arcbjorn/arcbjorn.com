import { Ei18nToken } from '@i18n/types';

export const getLevelToken = (numLevel: number): Ei18nToken => {
  switch (numLevel) {
    case 85:
      return Ei18nToken.LANG_LEVEL_NATIVE;
    case 80:
      return Ei18nToken.LANG_LEVEL_FLUENT;
    case 60:
      return Ei18nToken.LANG_LEVEL_BASIC;
    default:
      return Ei18nToken.LANG_LEVEL_BASIC;
  }
};
