import { Component, For } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';
import languages from '@/data/languagesData';
import Language from '@/components/languages/language/Language';

const Languages: Component = () => {
  const { t } = useI18n();

  return (
    <fieldset class="extra-inner-section">
      <legend class="extra-section-title">{t(Ei18nToken.LANGUAGES_TITLE)}</legend>
      <div class="languages">
        <For each={languages}>
          {({ name, level }, i) => (
            <div class="language-entry">
              <svg width="70" height="50" class="tree-node">
                <line x1="30" y1="25" x2="60" y2="25" stroke="current" stroke-width="3" />
                <line x1="30" y1="0" x2="30" y2="50" stroke="current" stroke-width="3" />
              </svg>
              <Language name={name} level={level} />
            </div>
          )}
        </For>
      </div>
    </fieldset>
  );
};

export default Languages;
