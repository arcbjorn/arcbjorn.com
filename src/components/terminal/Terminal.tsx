import { Component, createSignal, createEffect, For } from 'solid-js';
import TextMatrixEffect from '@components/TextMatrixEffect';
import QuickLink from '@components/QuickLink';
import ProjectPreview from '@components/terminal/ProjectPreview';
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
    formerly: false,
    built: false,
    summary_line1: false,
    summary_line2: false,
  });

  const [, setMatrixCompleteCount] = createSignal(0);
  const [currentTranslations, setCurrentTranslations] = createSignal({
    greeting: t(Ei18nToken.GREETING),
    pronunciation: t(Ei18nToken.PRONUNCIATION),
    formerly: t(Ei18nToken.FORMERLY),
    built: t(Ei18nToken.BUILT),
    summary_line1: t(Ei18nToken.SUMMARY_LINE1),
    summary_line2: t(Ei18nToken.SUMMARY_LINE2),
  });

  const [hoveredProject, setHoveredProject] = createSignal<string | null>(null);

  const projects = [
    { name: 'Sumi Finance', url: 'https://sumi.finance/' },
    { name: 'Humans Connect AI', url: 'https://humansconnect.ai/' },
    { name: 'Argentina Music Space', url: 'https://argentinamusic.space/' },
  ];

  // Update translations when language changes
  createEffect(() => {
    const newTranslations = {
      greeting: t(Ei18nToken.GREETING)!,
      pronunciation: t(Ei18nToken.PRONUNCIATION)!,
      formerly: t(Ei18nToken.FORMERLY)!,
      built: t(Ei18nToken.BUILT)!,
      summary_line1: t(Ei18nToken.SUMMARY_LINE1)!,
      summary_line2: t(Ei18nToken.SUMMARY_LINE2)!,
    };

    if (!isInitialLoad) {
      // Check each field individually and update effects accordingly
      const newEffects = {
        greeting: lastTranslations?.greeting !== newTranslations.greeting,
        pronunciation: lastTranslations?.pronunciation !== newTranslations.pronunciation,
        formerly: lastTranslations?.formerly !== newTranslations.formerly,
        built: lastTranslations?.built !== newTranslations.built,
        summary_line1: lastTranslations?.summary_line1 !== newTranslations.summary_line1,
        summary_line2: lastTranslations?.summary_line2 !== newTranslations.summary_line2,
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
          formerly: false,
          built: false,
          summary_line1: false,
          summary_line2: false,
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
            <p class="pb-8 pt-4 sm:pt-8">
              <TextMatrixEffect
                text={currentTranslations().greeting}
                language={language()}
                showEffect={matrixEffects().greeting}
                onComplete={handleMatrixComplete}
                slot={
                  <span style={{ color: 'var(--focusColor)' }}>
                    <TextMatrixEffect
                      text={currentTranslations().pronunciation}
                      language={language()}
                      showEffect={matrixEffects().pronunciation}
                      onComplete={handleMatrixComplete}
                    />
                  </span>
                }
              />
            </p>
            <p class="pb-8 leading-relaxed">
              <TextMatrixEffect
                text={currentTranslations().summary_line1}
                language={language()}
                showEffect={matrixEffects().summary_line1}
                onComplete={handleMatrixComplete}
              />
              <br />
              <TextMatrixEffect
                text={currentTranslations().summary_line2}
                language={language()}
                showEffect={matrixEffects().summary_line2}
                onComplete={handleMatrixComplete}
              />
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
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-start py-10">
          <For each={quickLinks}>{link => <QuickLink link={link} copyToClipboard={false} />}</For>
        </div>

        <div class="flex flex-wrap items-center justify-start pt-4 text-xs">
          <TextMatrixEffect
            text={currentTranslations().built}
            language={language()}
            showEffect={matrixEffects().built}
            onComplete={handleMatrixComplete}
          />
          &nbsp;
          <For each={projects}>
            {(project, index) => (
              <>
                <span
                  class={styles.projectLink}
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <a href={project.url} target="_blank" class={styles.company}>
                    {project.name}
                  </a>
                  <ProjectPreview
                    url={project.url}
                    name={project.name}
                    isVisible={hoveredProject() === project.name}
                  />
                  {index() < projects.length - 1 ? ', ' : ''}
                </span>
              </>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
