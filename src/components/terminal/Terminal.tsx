import { Component, createSignal, createEffect, createMemo } from 'solid-js';
import { quickLinks } from '@/data/links';
import { Ei18nToken } from '@i18n/types';
import { useI18n } from '@i18n/useI18n';
import { Typewriter } from '@/components/terminal/Typewriter';
import QuickLink from '@/components/QuickLink';
import styles from '@styles/terminal.module.css';
import animations from '@styles/animations.module.css';

interface ICompany {
  name: string;
  link: string;
}

export const Terminal: Component = () => {
  const { t, language } = useI18n();
  let typewriterRef: { reset: () => void } | null = null; // Reference to control typewriter animations

  // State signals for controlling component behavior
  const [quickLinksVisibility, setQuickLinksVisibility] = createSignal(false);
  const [startTypeWriter, setStartTypeWriter] = createSignal(true);
  const [showIntroText, setShowIntroText] = createSignal(false);
  const [currentTranslations, setCurrentTranslations] = createSignal({
    name: t(Ei18nToken.NAME),
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
    // Update translations after typing completes
    setCurrentTranslations({
      name: t(Ei18nToken.NAME),
      file: t(Ei18nToken.FILE),
      greeting: t(Ei18nToken.GREETING),
      position: t(Ei18nToken.POSITION),
      formerly: t(Ei18nToken.FORMERLY),
      interests: t(Ei18nToken.INTERESTS),
    });

    setTimeout(() => {
      setQuickLinksVisibility(true);
    }, 500);
  };

  // Effect that handles language changes
  createEffect(() => {
    const currentLang = language();
    if (typewriterRef) {
      typewriterRef.reset();
      setQuickLinksVisibility(false);
    }
  });

  const previousCompanies: ICompany[] = [
    { name: 'FundraiseUp', link: 'https://www.fundraiseup.com/' },
    { name: 'Muffins', link: 'https://muffins.io/' },
  ];

  const currentCompany: ICompany = {
    name: 'Sardine',
    link: 'https://www.sardine.ai/',
  };

  return (
    <div class={styles.terminal}>
      <div class={styles.terminalContent}>
        <div class={styles.terminalText}>
          <div class={styles.commandLine}>
            <span class={styles.userAndHost}>{currentTranslations().name}@archlinux:&nbsp;</span>
            <span class={styles.infoLocation}>~/</span>
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

          {showIntroText() && (
            <div class={`${styles.introText} ${animations.fadeIn}`}>
              <p class="py-8">{currentTranslations().greeting}</p>
              <p>
                {currentTranslations().position} @
                <a href={currentCompany.link} target="_blank" class={`${styles.company}`}>
                  {currentCompany.name}
                </a>
              </p>
              <p>
                {currentTranslations().formerly}{' '}
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
              <p class="pt-8">{currentTranslations().interests}</p>
            </div>
          )}
        </div>

        {quickLinksVisibility() && (
          <div class={`${styles.quickLinks} ${animations.fadeIn}`}>
            {quickLinks.map(link => (
              <QuickLink link={link} copyToClipboard={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
