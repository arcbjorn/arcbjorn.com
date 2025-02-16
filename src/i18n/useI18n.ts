import { createSignal, createMemo } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import { dict as enDict } from './en';
import { dict as esDict } from './es';
import { dict as deDict } from './de';
import { dict as ruDict } from './ru';
import { dict as seDict } from './se';
import { dict as ptDict } from './pt';
import { dict as jaDict } from './ja';

export enum Language {
  EN = 'en',
  ES = 'es',
  DE = 'de',
  RU = 'ru',
  SE = 'se',
  PT = 'pt',
  JA = 'ja',
}

export const languages = [
  Language.EN,
  Language.ES,
  Language.DE,
  Language.RU,
  Language.SE,
  Language.PT,
  Language.JA,
];

const dictionaries = {
  en: enDict,
  es: esDict,
  de: deDict,
  ru: ruDict,
  se: seDict,
  pt: ptDict,
  ja: jaDict,
};

export function useI18n() {
  const [language, setLanguage] = createSignal<Language>(Language.EN);

  const dict = createMemo(() => i18n.flatten(dictionaries[language()]));
  const t = i18n.translator(dict, i18n.resolveTemplate);

  return {
    language,
    setLanguage,
    t,
  };
}
