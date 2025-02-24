import { describe, it, expect } from 'vitest';
import { Language } from '@i18n/useI18n';
import {
  getInitialNavPathBasedOnLanguage,
  getNavMenuLinkPath,
  getNavPathOnLanguageChange,
  isActiveNavPath,
} from '@utils/navigation';

describe('navigation utilities', () => {
  describe('getInitialNavPathBasedOnLanguage', () => {
    it('should add language code when needed', () => {
      expect(getInitialNavPathBasedOnLanguage('/page', Language.JA)).toBe('/ja/page');
      expect(getInitialNavPathBasedOnLanguage('/', Language.ES)).toBe('/es/');
    });

    it('should not modify valid paths', () => {
      expect(getInitialNavPathBasedOnLanguage('/ja/page', Language.JA)).toBe('');
      expect(getInitialNavPathBasedOnLanguage('/es/', Language.ES)).toBe('');
    });

    it('should handle English as default', () => {
      expect(getInitialNavPathBasedOnLanguage('/', Language.EN)).toBe('/en/');
      expect(getInitialNavPathBasedOnLanguage('/page', Language.EN)).toBe('/en/page');
    });
  });

  describe('getNavMenuLinkPath', () => {
    const params = { lang: Language.JA };
    const enParams = { lang: Language.EN };

    it('should handle root path', () => {
      expect(getNavMenuLinkPath('/', params)).toBe('/ja');
      expect(getNavMenuLinkPath('/', enParams)).toBe('/en');
    });

    it('should handle non-root paths', () => {
      expect(getNavMenuLinkPath('/map', params)).toBe('/ja/map');
      expect(getNavMenuLinkPath('/extra', params)).toBe('/ja/extra');
    });

    it('should handle English paths', () => {
      expect(getNavMenuLinkPath('/map', enParams)).toBe('/en/map');
      expect(getNavMenuLinkPath('/extra', enParams)).toBe('/en/extra');
    });

    it('should handle missing lang parameter', () => {
      expect(getNavMenuLinkPath('/', {})).toBe('/en');
      expect(getNavMenuLinkPath('/map', {})).toBe('/en/map');
    });
  });

  describe('getNavPathOnLanguageChange', () => {
    it('should handle root path correctly', () => {
      expect(getNavPathOnLanguageChange('/', Language.EN)).toBe('/en');
      expect(getNavPathOnLanguageChange('/', Language.JA)).toBe('/ja');
    });

    it('should handle language change from one language to another', () => {
      expect(getNavPathOnLanguageChange('/ja/map', Language.ES)).toBe('/es/map');
      expect(getNavPathOnLanguageChange('/es/extra', Language.JA)).toBe('/ja/extra');
    });

    it('should handle paths without language prefix', () => {
      expect(getNavPathOnLanguageChange('/map', Language.JA)).toBe('/ja/map');
      expect(getNavPathOnLanguageChange('/extra', Language.ES)).toBe('/es/extra');
    });

    it('should handle switching to English', () => {
      expect(getNavPathOnLanguageChange('/ja/map', Language.EN)).toBe('/en/map');
      expect(getNavPathOnLanguageChange('/es/', Language.EN)).toBe('/en/');
    });
  });

  describe('isActiveNavPath', () => {
    it('should handle root path', () => {
      const location = { pathname: '/en', search: '', hash: '', state: {}, key: '', query: {} };
      expect(isActiveNavPath('/', location, { lang: Language.EN })).toBe(true);

      const locationWithLang = {
        pathname: '/ja',
        search: '',
        hash: '',
        state: {},
        key: '',
        query: {},
      };
      expect(isActiveNavPath('/', locationWithLang, { lang: Language.JA })).toBe(true);
    });

    it('should handle non-root paths with language', () => {
      const location = { pathname: '/ja/map', search: '', hash: '', state: {}, key: '', query: {} };
      const params = { lang: Language.JA };

      expect(isActiveNavPath('/map', location, params)).toBe(true);
      expect(isActiveNavPath('/extra', location, params)).toBe(false);
    });

    it('should handle paths without language prefix', () => {
      const location = { pathname: '/en/map', search: '', hash: '', state: {}, key: '', query: {} };
      const params = { lang: Language.EN };

      expect(isActiveNavPath('/map', location, params)).toBe(true);
      expect(isActiveNavPath('/extra', location, params)).toBe(false);
    });

    it('should handle different language prefixes', () => {
      const location = { pathname: '/ja/map', search: '', hash: '', state: {}, key: '', query: {} };
      const params = { lang: Language.JA };

      expect(isActiveNavPath('/map', location, params)).toBe(true);
      expect(
        isActiveNavPath(
          '/map',
          { pathname: '/ja/map', search: '', hash: '', state: {}, key: '', query: {} },
          { lang: Language.ES }
        )
      ).toBe(false);
    });
  });
});
