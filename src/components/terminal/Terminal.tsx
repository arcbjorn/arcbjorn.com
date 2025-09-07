import { Component, createSignal, createEffect, createMemo, For } from 'solid-js';
import Typewriter from '@/components/terminal/TypeWriter';
import TextMatrixEffect from '@components/TextMatrixEffect';
import QuickLink from '@components/QuickLink';
import { useI18n } from '@i18n/useI18n';

import { quickLinks } from '@data/linksData';
import { Ei18nToken } from '@i18n/types';
import { previousCompanies } from '@data/terminalData';
import styles from '@styles/terminal.module.css';

export const Terminal: Component = () => {
  const { t, language } = useI18n();
  let typewriterRef: { reset: () => void } | null = null;
  let lastTranslations: Record<string, string> | null = null;
  let isInitialLoad = true;

  // State signals for controlling component behavior
  const [quickLinksVisibility, setQuickLinksVisibility] = createSignal(false);
  const [quickLinksDisplay, setQuickLinksDisplay] = createSignal(false);
  const [startTypeWriter, setStartTypeWriter] = createSignal(true);
  const [showIntroText, setShowIntroText] = createSignal(false);

  // Replace single showMatrixEffect with per-field effects
  const [matrixEffects, setMatrixEffects] = createSignal<Record<string, boolean>>({
    name: false,
    shortName: false,
    greeting: false,
    position: false,
    formerly: false,
    interests: false,
  });

  const [, setMatrixCompleteCount] = createSignal(0);
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

    if (!isInitialLoad) {
      // Check each field individually and update effects accordingly
      const newEffects = {
        name: lastTranslations?.name !== newTranslations.name,
        shortName: lastTranslations?.shortName !== newTranslations.shortName,
        greeting: lastTranslations?.greeting !== newTranslations.greeting,
        position: lastTranslations?.position !== newTranslations.position,
        formerly: lastTranslations?.formerly !== newTranslations.formerly,
        interests: lastTranslations?.interests !== newTranslations.interests,
      };
      setMatrixEffects(newEffects);
    }

    setCurrentTranslations(newTranslations);
    lastTranslations = newTranslations;
    isInitialLoad = false;

    setTimeout(() => {
      handleQuickLinksVisibility(true);
    }, 500);
  };

  const handleMatrixComplete = () => {
    setMatrixCompleteCount(prev => {
      const newCount = prev + 1;
      // Reset effects after all active effects complete
      const activeEffects = Object.values(matrixEffects()).filter(Boolean).length;
      if (newCount >= activeEffects) {
        setMatrixEffects({
          name: false,
          shortName: false,
          greeting: false,
          position: false,
          formerly: false,
          interests: false,
        });
        return 0;
      }
      return newCount;
    });
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
    language(); // Track language changes
    if (typewriterRef) {
      typewriterRef.reset();
      setQuickLinksVisibility(false);
    }
  });

  return (
    <div class={styles.terminal}>
      <div class={styles.terminalContent}>
        <div class={styles.terminalText}>
          <span class={styles.userAndHost}>
            <span class="hidden sm:inline">
              <TextMatrixEffect
                text={currentTranslations().name}
                language={language()}
                showEffect={matrixEffects().name}
                onComplete={handleMatrixComplete}
              />
              @archlinux:
            </span>
            <span class="sm:hidden">
              <TextMatrixEffect
                text={currentTranslations().shortName}
                language={language()}
                showEffect={matrixEffects().shortName}
                onComplete={handleMatrixComplete}
              />
              @arch:
            </span>
          </span>
          <span class="hidden sm:inline">&nbsp;</span>
          <span class={styles.infoLocation}>~/</span>$&nbsp;
          <Typewriter
            class="inline text-lg sm:text-xl"
            strings={commandText()}
            delay={startTypeWriter() ? 60 : 60}
            autoStart={true}
            onComplete={handleComplete}
            cursor="|"
            ref={ref => (typewriterRef = ref)}
          />
          {/* Pre-render with opacity 0 */}
          <div
            class="flex flex-col pt-4"
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
                showEffect={matrixEffects().greeting}
                onComplete={handleMatrixComplete}
              />
            </p>
            <p class="pb-4">
              <TextMatrixEffect
                text={currentTranslations().position}
                language={language()}
                showEffect={matrixEffects().position}
                onComplete={handleMatrixComplete}
              />
              {/* &nbsp;@
              <a href={currentCompany.link} target="_blank" class={styles.company}>
                {currentCompany.name}
              </a> */}
            </p>
            <p class="pb-4">
              <TextMatrixEffect
                text={currentTranslations().formerly}
                language={language()}
                showEffect={matrixEffects().formerly}
                onComplete={handleMatrixComplete}
              />
              &nbsp;
              <For each={previousCompanies}>
                {(company, index) => (
                  <>
                    @
                    <a href={company.link} target="_blank" class={styles.company}>
                      {company.name}
                    </a>
                    {index() < previousCompanies.length - 1 && ', '}
                  </>
                )}
              </For>
            </p>
            <p class="py-4 sm:pt-8">
              <TextMatrixEffect
                text={currentTranslations().interests}
                language={language()}
                showEffect={matrixEffects().interests}
                onComplete={handleMatrixComplete}
              />
            </p>
          </div>
        </div>

        {/* Pre-render quick links with opacity 0 */}
        <div
          class="flex flex-wrap items-center justify-start py-10"
          style={{
            opacity: quickLinksVisibility() ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
            display: 'flex',
            visibility: quickLinksDisplay() ? 'visible' : 'hidden',
          }}
        >
          <For each={quickLinks}>{link => <QuickLink link={link} copyToClipboard={false} />}</For>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
