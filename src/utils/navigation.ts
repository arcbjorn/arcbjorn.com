import { Language } from '@i18n/useI18n';
import { Params, Location } from '@solidjs/router';

export const getInitialNavPathBasedOnLanguage = (path: string, currentLang: Language) => {
  const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
  const urlLang = langMatch?.[1];

  // If URL has invalid language code
  if (urlLang && !Object.values(Language).includes(urlLang as Language)) {
    return `/${currentLang}${path.replace(/^\/[a-z]{2}/, '')}`;
  }

  // If URL has no language code, add it
  if (!urlLang) {
    return `/${currentLang}${path}`;
  }

  return '';
};

export const getNavMenuLinkPath = (path: string, params: Params) => {
  const currentLang = params.lang || Language.EN;

  // Always include language prefix for consistency
  if (path === '/') {
    return `/${currentLang}`;
  }

  // For other paths, always include language prefix
  return `/${currentLang}${path}`;
};

export const isActiveNavPath = (path: string, location: Location, params: Params) => {
  const currentPath = location.pathname;
  const langPrefix = `/${params.lang || Language.EN}`;

  if (path === '/') {
    return currentPath === langPrefix;
  }

  return currentPath === `${langPrefix}${path}`;
};

export const getNavPathOnLanguageChange = (currentPath: string, newLang: Language): string => {
  // First, check if current path has a language prefix
  const langMatch = currentPath.match(/^\/([a-z]{2})(\/.*)?$/);

  if (langMatch) {
    // We have a language prefix, replace it with new language
    const remainingPath = langMatch[2] || '';
    return `/${newLang}${remainingPath}`;
  } else {
    // No language prefix in current path, add new language
    return `/${newLang}${currentPath === '/' ? '' : currentPath}`;
  }
};
