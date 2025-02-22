import { Component, createSignal, createEffect } from 'solid-js';
import { A, useParams } from '@solidjs/router';
import { useI18n, Language } from '@i18n/useI18n';
import ThemeToggle from '@components/ThemeToggle';
import LanguageSwitch from '@components/LanguageSwitch';
import TimeZone from '@components/TimeZone';
import TextMatrixEffect from '@components/TextMatrixEffect';
import { Ei18nToken } from '@i18n/types';
import styles from '@styles/header.module.css';
import common from '@styles/common.module.css';

export const Header: Component = () => {
  let isMounted = false;
  const params = useParams();
  const { t, language } = useI18n();
  const [_, setMatrixCompleteCount] = createSignal(0);
  const [showMatrixEffects, setShowMatrixEffects] = createSignal<Record<string, boolean>>({
    name: false,
    about: false,
    extra: false,
  });
  let previousTexts = {
    name: t(Ei18nToken.NAME),
    about: t(Ei18nToken.ABOUT),
    extra: t(Ei18nToken.EXTRA),
  };

  const getPath = (path: string) => {
    const currentLang = params.lang || Language.EN;
    return currentLang === Language.EN ? path : `/${currentLang}${path}`;
  };

  createEffect(() => {
    // Track language changes
    language();

    // Skip the effect on mount
    if (!isMounted) {
      isMounted = true;
      return;
    }

    // Get current translations
    const currentTexts = {
      name: t(Ei18nToken.NAME),
      about: t(Ei18nToken.ABOUT),
      extra: t(Ei18nToken.EXTRA),
    };

    // Check each text individually and update effects accordingly
    const newEffects = {
      name: currentTexts.name !== previousTexts.name,
      about: currentTexts.about !== previousTexts.about,
      extra: currentTexts.extra !== previousTexts.extra,
    };

    setShowMatrixEffects(newEffects);
    previousTexts = currentTexts;
  });

  const handleMatrixComplete = () => {
    setMatrixCompleteCount(prev => {
      const newCount = prev + 1;
      // Reset count after all active effects complete
      const activeEffects = Object.values(showMatrixEffects()).filter(Boolean).length;
      if (newCount >= activeEffects) {
        setShowMatrixEffects({ name: false, about: false, extra: false });
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div class={styles.header}>
      <A class={styles.logo} href={getPath('/')}>
        <TextMatrixEffect
          text={t(Ei18nToken.NAME)}
          language={language()}
          showEffect={showMatrixEffects().name}
          onComplete={handleMatrixComplete}
        />
      </A>
      <TimeZone />
      <div class={styles.nav}>
        <div class={styles.links}>
          <A class={common.link} activeClass={common.activeRoute} href={getPath('/')} end={true}>
            <TextMatrixEffect
              text={t(Ei18nToken.ABOUT)}
              language={language()}
              showEffect={showMatrixEffects().about}
              onComplete={handleMatrixComplete}
            />
          </A>
          <A class={common.link} activeClass={common.activeRoute} href={getPath('/extra')}>
            <TextMatrixEffect
              text={t(Ei18nToken.EXTRA)}
              language={language()}
              showEffect={showMatrixEffects().extra}
              onComplete={handleMatrixComplete}
            />
          </A>
        </div>
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
