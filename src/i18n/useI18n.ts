import { createSignal, createResource, createRoot } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import { enDict, esDict, deDict, ruDict, seDict, ptDict, jaDict } from '@i18n/translations';

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
  [Language.EN]: enDict,
  [Language.ES]: esDict,
  [Language.DE]: deDict,
  [Language.RU]: ruDict,
  [Language.SE]: seDict,
  [Language.PT]: ptDict,
  [Language.JA]: jaDict,
} as const;

const getInitialLanguage = (): Language => {
  const urlLang = window.location.pathname.split('/')[1];

  if (urlLang && Object.values(Language).includes(urlLang as Language)) {
    return urlLang as Language;
  }

  const storedLang = localStorage.getItem('language');
  if (storedLang && Object.values(Language).includes(storedLang as Language)) {
    return storedLang as Language;
  }

  return Language.EN;
};

const createI18n = () => {
  const [language, setLanguage] = createSignal<Language>(getInitialLanguage());

  const [dict] = createResource(language, lang =>
    i18n.flatten(dictionaries[lang] ?? dictionaries[Language.EN])
  );

  const t = i18n.translator(dict, i18n.resolveTemplate);

  return { language, setLanguage, t };
};

const i18nContext = createRoot(createI18n);

export function useI18n() {
  return i18nContext;
}
