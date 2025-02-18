import { createSignal, createResource, createRoot } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import { en, es, de, ru, se, pt, ja } from '@i18n/translations';
import { Dictionary } from '@i18n/types';

export enum Language {
  EN = 'en',
  ES = 'es',
  DE = 'de',
  RU = 'ru',
  SE = 'se',
  PT = 'pt',
  JA = 'ja',
}

export const languages: Language[] = [
  Language.EN,
  Language.ES,
  Language.DE,
  Language.RU,
  Language.SE,
  Language.PT,
  Language.JA,
];

const dictionaries: Record<Language, Dictionary> = {
  [Language.EN]: en,
  [Language.ES]: es,
  [Language.DE]: de,
  [Language.RU]: ru,
  [Language.SE]: se,
  [Language.PT]: pt,
  [Language.JA]: ja,
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
