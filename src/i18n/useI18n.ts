import { createSignal, createMemo } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import { dict as enDict } from './en';
import { dict as esDict } from './es';
import { dict as deDict } from './de';
import { dict as ruDict } from './ru';
import { dict as seDict } from './se';
import { dict as ptDict } from './pt';
import { dict as jaDict } from './ja';

export type Locale = 'en' | 'es' | 'de' | 'ru' | 'se' | 'pt' | 'ja';

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
  const [locale, setLocale] = createSignal<Locale>('en');

  const dict = createMemo(() => i18n.flatten(dictionaries[locale()]));
  const t = i18n.translator(dict, i18n.resolveTemplate);

  return {
    locale,
    setLocale,
    t,
  };
}
