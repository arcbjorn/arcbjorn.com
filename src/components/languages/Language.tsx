import { Component, createSignal } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import MatrixEffect from '@/components/languages/MatrixEffect';
import TranslationMatrixEffect from '@components/TranslationMatrixEffect';

import { getLevelToken } from '@utils/languages';
import { TLanguage } from '@/types/types';

import styles from '@styles/languages.module.css';

type TLanguageProps = Omit<TLanguage, 'category'>;

const Language: Component<TLanguageProps> = props => {
  const { t } = useI18n();
  const [isHovered, setIsHovered] = createSignal(false);

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
          <span
            class={styles.levelText}
            style={{
              right: '15px',
              'z-index': 2,
            }}
          >
            {t(getLevelToken(props.level))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Language;
