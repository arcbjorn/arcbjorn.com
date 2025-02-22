import { Component, createSignal } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { TLanguage } from '@/types';
import { Ei18nToken } from '@i18n/types';
import MatrixEffect from '@/components/languages/MatrixEffect';
import styles from '@styles/languages.module.css';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';

type TLanguageProps = Omit<TLanguage, 'category'>;

const Language: Component<TLanguageProps> = props => {
  const { t } = useI18n();
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
      class={styles.language}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div class={styles.nameLevel}>
        <TranslationMatrixEffect token={props.token} />
        <div class={styles.levelBar}>
          <div class={styles.levelBackground}>
            <div
              class={styles.levelFill}
              style={{
                width: isHovered() ? `${props.level}%` : '0%',
              }}
            >
              <MatrixEffect
                isHovered={isHovered()}
                level={props.level}
                languageToken={props.token}
              />
            </div>
          </div>
          {isHovered() && (
            <span
              class={styles.levelText}
              style={{
                color: 'var(--bg)',
                right: '15px',
                'z-index': 2,
              }}
            >
              {t(getLevelToken(props.level))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Language;
