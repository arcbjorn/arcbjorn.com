import { Component, createSignal } from 'solid-js';
import { TLanguage } from '@/types';
import { Ei18nToken } from '@/i18n/types';
import MatrixEffect from '@/components/languages/language/MatrixEffect';

type TLanguageProps = Omit<TLanguage, 'category'>;

const Language: Component<TLanguageProps> = props => {
  const [isHovered, setIsHovered] = createSignal(false);

  const getLevelToken = (numLevel: number): Ei18nToken => {
    switch (numLevel) {
      case 100:
        return Ei18nToken.LANG_LEVEL_NATIVE;
      case 90:
        return Ei18nToken.LANG_LEVEL_FLUENT;
      case 70:
        return Ei18nToken.LANG_LEVEL_BASIC;
      default:
        return Ei18nToken.LANG_LEVEL_BASIC;
    }
  };

  return (
    <div
      class="language"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div class="name-level">
        {props.name}
        <div class="level-bar">
          <div class="level-background">
            <div
              class="level-fill"
              style={{
                width: isHovered() ? `${props.level}%` : '0%',
              }}
            >
              <MatrixEffect
                isHovered={isHovered()}
                level={props.level}
                languageToken={props.name}
              />
            </div>
          </div>
          {isHovered() && (
            <span
              class="level-text"
              style={{
                color: 'var(--bg)',
                right: '15px',
                'z-index': 2,
              }}
            >
              {getLevelToken(props.level)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Language;
