import { Component, createSignal, createEffect, createMemo } from 'solid-js';
import Typewriter from '@components/terminal/Typewriter';
import TextMatrixEffect from '@components/TextMatrixEffect';
import QuickLink from '@components/QuickLink';
import { useI18n } from '@i18n/useI18n';

import { quickLinks } from '@data/linksData';
import { Ei18nToken } from '@i18n/types';
import { previousCompanies, currentCompany } from '@data/terminalData';
import styles from '@styles/terminal.module.css';

export const Terminal: Component = () => {
  const { t, language } = useI18n();
  let typewriterRef: { reset: () => void } | null = null;
  let matrixCompleteCount = 0;
  let lastTranslations: Record<string, string> | null = null;
  let isInitialLoad = true;

  // State signals for controlling component behavior
  const [quickLinksVisibility, setQuickLinksVisibility] = createSignal(false);
  const [quickLinksDisplay, setQuickLinksDisplay] = createSignal(false);
  const [startTypeWriter, setStartTypeWriter] = createSignal(true);
  const [showIntroText, setShowIntroText] = createSignal(false);
  const [showMatrixEffect, setShowMatrixEffect] = createSignal(false);
  const [currentTranslations, setCurrentTranslations] = createSignal({
    name: t(Ei18nToken.NAME),
    shortName: t(Ei18nToken.SHORT_NAME),
    file: t(Ei18nToken.FILE),
    greeting: t(Ei18nToken.GREETING),
    position: t(Ei18nToken.POSITION),
    formerly: t(Ei18nToken.FORMERLY),
    interests: t(Ei18nToken.INTERESTS),
  });

  // Memoized command text that updates with language changes
  const commandText = createMemo(() => `cat ${t(Ei18nToken.FILE)}.txt`);

  // Handler for when typing animation completes
  const handleComplete = () => {
    setStartTypeWriter(false);
    setShowIntroText(true);

    const newTranslations = {
      name: t(Ei18nToken.NAME)!,
      shortName: t(Ei18nToken.SHORT_NAME)!,
      file: t(Ei18nToken.FILE)!,
      greeting: t(Ei18nToken.GREETING)!,
      position: t(Ei18nToken.POSITION)!,
      formerly: t(Ei18nToken.FORMERLY)!,
      interests: t(Ei18nToken.INTERESTS)!,
    };

    const shouldShowMatrix =
      !isInitialLoad && lastTranslations?.greeting !== newTranslations.greeting;

    if (shouldShowMatrix) {
      setShowMatrixEffect(true);
    }

    setCurrentTranslations(newTranslations);
    lastTranslations = newTranslations;
    isInitialLoad = false;

    setTimeout(() => {
      handleQuickLinksVisibility(true);
    }, 500);
  };

  const handleMatrixComplete = () => {
    matrixCompleteCount++;
    if (matrixCompleteCount >= 3) {
      setShowMatrixEffect(false);
      matrixCompleteCount = 0;
    }
  };

  const handleQuickLinksVisibility = (visible: boolean) => {
    if (visible) {
      setQuickLinksDisplay(true);
      setTimeout(() => setQuickLinksVisibility(true), 50);
    } else {
      setQuickLinksVisibility(false);
      setTimeout(() => setQuickLinksDisplay(false), 700);
    }
  };

  // Effect that handles language changes
  createEffect(() => {
    const _ = language();
    if (typewriterRef) {
      typewriterRef.reset();
      setQuickLinksVisibility(false);
    }
  });

  return (
    <div class={styles.terminal}>
      <div class={styles.terminalContent}>
        <div class={styles.terminalText}>
          <div class={styles.commandLine}>
            <div class="flex flex-wrap items-center">
              <span class={styles.userAndHost}>
                <span class="hidden sm:inline">{currentTranslations().name}@archlinux:</span>
                <span class="sm:hidden">{currentTranslations().shortName}@arch:</span>
              </span>
              <span class="hidden sm:inline">&nbsp;</span>
              <span class={styles.infoLocation}>~/</span>$&nbsp;
              <span class={styles.profileCommand}>
                <Typewriter
                  strings={commandText()}
                  delay={startTypeWriter() ? 60 : 60}
                  autoStart={true}
                  onComplete={handleComplete}
                  cursor="|"
                  ref={ref => (typewriterRef = ref)}
                />
              </span>
            </div>
          </div>

          {/* Pre-render with opacity 0 */}
          <div
            class={`${styles.introText}`}
            style={{
              opacity: showIntroText() ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
              visibility: showIntroText() ? 'visible' : 'hidden',
            }}
          >
            <p class="py-4 sm:py-8">
              <TextMatrixEffect
                text={currentTranslations().greeting}
                language={language()}
                showEffect={showMatrixEffect()}
                onComplete={handleMatrixComplete}
              />
            </p>
            <p>
              <TextMatrixEffect
                text={currentTranslations().position}
                language={language()}
                showEffect={showMatrixEffect()}
                onComplete={handleMatrixComplete}
              />
              &nbsp;@
              <a href={currentCompany.link} target="_blank" class={styles.company}>
                {currentCompany.name}
              </a>
            </p>
            <p>
              <TextMatrixEffect
                text={currentTranslations().formerly}
                language={language()}
                showEffect={showMatrixEffect()}
                onComplete={handleMatrixComplete}
              />
              &nbsp;
              {previousCompanies.map((company, index) => (
                <>
                  @
                  <a href={company.link} target="_blank" class={`${styles.company}`}>
                    {company.name}
                  </a>
                  {previousCompanies.length > 1 && index % 2 === 0 && ', '}
                </>
              ))}
            </p>
            <p class="pt-4 sm:pt-8">
              <TextMatrixEffect
                text={currentTranslations().interests}
                language={language()}
                showEffect={showMatrixEffect()}
                onComplete={handleMatrixComplete}
              />
            </p>
          </div>

          {/* Pre-render quick links with opacity 0 */}
          <div
            class={`${styles.quickLinks}`}
            style={{
              opacity: quickLinksVisibility() ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
              display: 'flex',
              visibility: quickLinksDisplay() ? 'visible' : 'hidden',
            }}
          >
            {quickLinks.map(link => (
              <QuickLink link={link} copyToClipboard={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
