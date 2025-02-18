import { Component, onMount } from 'solid-js';
import { useLocation } from '@solidjs/router';
import { useI18n, Language, languages } from '@i18n/useI18n';

export const LanguageSwitch: Component = () => {
  const { language, setLanguage } = useI18n();
  const location = useLocation();

  const handleChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const newLang = select.value as Language;
    setLanguage(newLang);

    const currentPath = location.pathname;
    const newPath =
      currentPath === '/' || currentPath === '/extra' || currentPath === '/access_links'
        ? `/${newLang}${currentPath}`
        : currentPath.replace(/^\/[a-z]{2}/, `/${newLang}`);

    window.history.replaceState(null, '', newPath);
  };

  return (
    <div>
      <select value={language()} class="mx-4 cursor-pointer bg-transparent" onChange={handleChange}>
        {languages.map(lang => (
          <option value={lang} class="bg-[var(--bg)]">
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;
