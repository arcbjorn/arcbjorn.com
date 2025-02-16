import { Component } from 'solid-js';
import { useI18n, Language, languages } from '@i18n/useI18n';

export const LanguageSwitch: Component = () => {
  const { language, setLanguage } = useI18n();

  const handleChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    setLanguage(select.value as Language);
  };

  return (
    <div>
      <select value={language()} class="mx-4 cursor-pointer bg-transparent" onChange={handleChange}>
        {languages.map(lang => (
          <option value={lang} class="bg-[var(--bg)]">
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;
