import { Component, createSignal, onMount, onCleanup } from 'solid-js';
import { useLocation, useNavigate } from '@solidjs/router';
import { useI18n, Language, languages } from '@i18n/useI18n';
import styles from '@styles/languageSwitch.module.css';

export const LanguageSwitch: Component = () => {
  const { language, setLanguage } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = createSignal(false);
  let switcherRef: HTMLDivElement | undefined;

  const handleClickOutside = (event: MouseEvent) => {
    if (switcherRef && !switcherRef.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  const handleLanguageSelect = (newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);

    const currentPath = location.pathname;
    let newPath: string;

    // If it's a root path
    if (currentPath === '/') {
      newPath = newLang === Language.EN ? '/' : `/${newLang}`;
    } else {
      // Check if current path already has a language prefix
      const hasLangPrefix = /^\/[a-z]{2}\//.test(currentPath);

      if (hasLangPrefix) {
        // Replace existing language prefix
        newPath =
          newLang === Language.EN
            ? currentPath.replace(/^\/[a-z]{2}/, '')
            : currentPath.replace(/^\/[a-z]{2}/, `/${newLang}`);
      } else {
        // Add language prefix to path without one
        newPath = newLang === Language.EN ? currentPath : `/${newLang}${currentPath}`;
      }
    }

    // Clean up the path
    newPath = newPath.replace(/\/+/g, '/');
    if (newPath.length > 1 && newPath.endsWith('/')) {
      newPath = newPath.slice(0, -1);
    }

    // Use router navigation instead of history.replaceState
    navigate(newPath, { replace: true });
  };

  return (
    <div class={styles.languageSwitcher} ref={switcherRef}>
      <button
        class={styles.switcherButton}
        onClick={e => {
          e.stopPropagation();
          setIsOpen(!isOpen());
        }}
        aria-label="Select language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class={styles.globeIcon}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span class={styles.currentLanguage}>{language().toUpperCase()}</span>
      </button>

      {isOpen() && (
        <div class={styles.dropdown} role="listbox">
          {languages.map(lang => (
            <button
              class={`${styles.languageOption} ${lang === language() ? styles.active : ''}`}
              onClick={() => handleLanguageSelect(lang)}
              role="option"
              aria-selected={lang === language()}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
