import { Component, createSignal, createEffect, For } from 'solid-js';
import TextMatrixEffect from '@components/TextMatrixEffect';
import QuickLink from '@components/QuickLink';
import { useI18n } from '@i18n/useI18n';

import { quickLinks } from '@data/linksData';
import { Ei18nToken } from '@i18n/types';
import { previousCompanies } from '@data/terminalData';
import styles from '@styles/terminal.module.css';

export const Terminal: Component = () => {
  const { t, language } = useI18n();
  let lastTranslations: Record<string, string> | null = null;
  let isInitialLoad = true;

  // Replace single showMatrixEffect with per-field effects
  const [matrixEffects, setMatrixEffects] = createSignal<Record<string, boolean>>({
    greeting: false,
    pronunciation: false,
    position: false,
    formerly: false,
    interests: false,
  });

  const [, setMatrixCompleteCount] = createSignal(0);
  const [currentTranslations, setCurrentTranslations] = createSignal({
    greeting: t(Ei18nToken.GREETING),
    pronunciation: t(Ei18nToken.PRONUNCIATION),
    position: t(Ei18nToken.POSITION),
    formerly: t(Ei18nToken.FORMERLY),
    interests: t(Ei18nToken.INTERESTS),
  });

  // Update translations when language changes
  createEffect(() => {
    const newTranslations = {
      greeting: t(Ei18nToken.GREETING)!,
      pronunciation: t(Ei18nToken.PRONUNCIATION)!,
      position: t(Ei18nToken.POSITION)!,
      formerly: t(Ei18nToken.FORMERLY)!,
      interests: t(Ei18nToken.INTERESTS)!,
    };

    if (!isInitialLoad) {
      // Check each field individually and update effects accordingly
      const newEffects = {
        greeting: lastTranslations?.greeting !== newTranslations.greeting,
        pronunciation: lastTranslations?.pronunciation !== newTranslations.pronunciation,
        position: lastTranslations?.position !== newTranslations.position,
        formerly: lastTranslations?.formerly !== newTranslations.formerly,
        interests: lastTranslations?.interests !== newTranslations.interests,
      };
      setMatrixEffects(newEffects);
    }

    setCurrentTranslations(newTranslations);
    lastTranslations = newTranslations;
    isInitialLoad = false;
  });

  const handleMatrixComplete = () => {
    setMatrixCompleteCount(prev => {
      const newCount = prev + 1;
      // Reset effects after all active effects complete
      const activeEffects = Object.values(matrixEffects()).filter(Boolean).length;
      if (newCount >= activeEffects) {
        setMatrixEffects({
          greeting: false,
          pronunciation: false,
          position: false,
          formerly: false,
          interests: false,
        });
        return 0;
      }
      return newCount;
    });
  };


  return (
    <div class={styles.terminal}>
      <div class={styles.terminalContent}>
        <div class={styles.terminalText}>
          <div class="flex flex-col pt-4">
            <p class="py-4 sm:py-8">
              <TextMatrixEffect
                text={currentTranslations().greeting}
                language={language()}
                showEffect={matrixEffects().greeting}
                onComplete={handleMatrixComplete}
              />
              <span style={{ color: 'var(--focusColor)', 'margin-left': '0.5rem' }}>
                <TextMatrixEffect
                  text={currentTranslations().pronunciation}
                  language={language()}
                  showEffect={matrixEffects().pronunciation}
                  onComplete={handleMatrixComplete}
                />
              </span>
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

        <div class="flex flex-wrap items-center justify-start py-10">
          <For each={quickLinks}>{link => <QuickLink link={link} copyToClipboard={false} />}</For>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
