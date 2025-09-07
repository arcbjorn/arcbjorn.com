import { Theme } from '@/types/types';

/**
 * Comprehensive function to detect user's theme preference
 * Checks multiple sources in order of priority:
 * 1. User's explicit preference stored in localStorage
 * 2. Browser's prefers-color-scheme media query
 * 3. OS-level dark mode settings via CSS variables (for browsers that support it)
 * 4. Time-based fallback
 */
export const getInitialTheme = (): Theme => {
  // 1. Check localStorage first (user's explicit choice takes precedence)
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === Theme.DARK || storedTheme === Theme.LIGHT) {
      return storedTheme;
    }
  }

  // 2. Check browser's prefers-color-scheme media query (most reliable cross-platform method)
  if (typeof window !== 'undefined' && window.matchMedia) {
    // This works for both browser and OS preferences on most platforms
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Theme.DARK;
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return Theme.LIGHT;
    }
  }

  // 3. Try to detect via CSS variables (some browsers expose OS theme this way)
  try {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      // Some browsers expose theme via CSS variables
      const colorScheme = getComputedStyle(document.documentElement)
        .getPropertyValue('color-scheme')
        .trim();
      if (colorScheme.includes('dark')) {
        return Theme.DARK;
      } else if (colorScheme.includes('light')) {
        return Theme.LIGHT;
      }
    }
  } catch {
    // Ignore errors from this method, it's just an additional detection attempt
  }

  // 4. Check if current time is between sunset and sunrise (fallback)
  const hour = new Date().getHours();
  if (hour <= 6 || hour >= 20) {
    return Theme.DARK;
  }

  // 5. Default to light mode
  return Theme.LIGHT;
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const body = document.body;

  if (theme === Theme.DARK) {
    body.classList.add('dark');
    root.style.setProperty('--bg', '#1b1d1e');
    root.style.setProperty('--color', '#dddddd');
    // Set color-scheme CSS property for better integration with browser features
    root.style.setProperty('color-scheme', 'dark');
  } else {
    body.classList.remove('dark');
    root.style.setProperty('--bg', '#f9f5ef');
    root.style.setProperty('--color', '#1b1d1e');
    // Set color-scheme CSS property for better integration with browser features
    root.style.setProperty('color-scheme', 'light');
  }

  localStorage.setItem('theme', theme);
};
