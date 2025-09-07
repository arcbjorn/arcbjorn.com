import { createSignal, createEffect, Component, onMount } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { getInitialTheme, applyTheme } from '@utils/theme';

import { Theme } from '@/types/types';
import { Ei18nToken } from '@i18n/types';

export const ThemeToggle: Component = () => {
  const { t } = useI18n();
  const [isDark, setIsDark] = createSignal(getInitialTheme() === Theme.DARK);

  onMount(() => {
    // Listen for system theme changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        const newTheme: Theme = e.matches ? Theme.DARK : Theme.LIGHT;
        setIsDark(newTheme === Theme.DARK);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  });

  createEffect(() => {
    applyTheme(isDark() ? Theme.DARK : Theme.LIGHT);
  });

  const toggleTheme = () => {
    setIsDark(!isDark());
    localStorage.setItem('theme', !isDark() ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <button
      onClick={toggleTheme}
      class="z-10 mx-4 h-9 cursor-pointer rounded-lg border border-transparent px-2 leading-none transition-colors hover:border-neutral-600"
      aria-label={t(Ei18nToken.ARIA_LABEL_TOGGLE_THEME)}
    >
      {isDark() ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
