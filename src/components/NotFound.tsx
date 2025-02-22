import { Component, createEffect, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '@i18n/useI18n';
import TextMatrixEffect from '@/components/TextMatrixEffect';
import styles from '@styles/common.module.css';
import { Ei18nToken } from '@/i18n/types';

const NotFoundInfo: Component = () => {
  const { t, language } = useI18n();
  const [showMatrixEffect, setShowMatrixEffect] = createSignal(true);

  createEffect(() => {
    language();
    setShowMatrixEffect(true);
  });

  const handleMatrixComplete = () => {
    setShowMatrixEffect(false);
  };

  return (
    <div class="flex h-[90vh] w-full items-center justify-center">
      <div class="text-center text-base sm:text-2xl">
        <h1 class="mb-4">
          <TextMatrixEffect
            text={t(Ei18nToken.PAGE_NOT_FOUND)}
            language={language()}
            showEffect={showMatrixEffect()}
            onComplete={handleMatrixComplete}
          />
        </h1>
        <A href="/">
          <span class={styles.link}>
            <TextMatrixEffect
              text={t(Ei18nToken.GO_BACK)}
              language={language()}
              showEffect={showMatrixEffect()}
              onComplete={handleMatrixComplete}
            />
          </span>
        </A>
      </div>
    </div>
  );
};

export default NotFoundInfo;
