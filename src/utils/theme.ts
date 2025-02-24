import { Theme } from '@/types/types';

export const getInitialTheme = (): Theme => {
  // 1. Check localStorage preference first
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === Theme.DARK || storedTheme === Theme.LIGHT) {
      return storedTheme;
    }
  }

  // 2. Check prefers-color-scheme media query
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Theme.DARK;
    }
  }

  // 3. Check if current time is between sunset and sunrise
  const hour = new Date().getHours();
  if (hour <= 6 || hour >= 20) {
    return Theme.DARK;
  }

  // 4. Default to light mode
  return Theme.LIGHT;
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const body = document.body;

  if (theme === Theme.DARK) {
    body.classList.add('dark');
    root.style.setProperty('--bg', '#1b1d1e');
    root.style.setProperty('--color', '#dddddd');
  } else {
    body.classList.remove('dark');
    root.style.setProperty('--bg', '#f9f5ef');
    root.style.setProperty('--color', '#1b1d1e');
  }

  localStorage.setItem('theme', theme);
};
