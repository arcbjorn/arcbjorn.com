import { Component } from 'solid-js';
import { Ei18nToken } from '@i18n/types';
import SocialLink from '@/components/extraLinks/SocialLink';
import TranslationMatrixEffect from '@/components/TranslationMatrixEffect';
import { platformLinks, socialLinks } from '@data/linksData';
import extraStyles from '@styles/extra.module.css';
import styles from '@styles/extraLinks.module.css';

const ExtraLinks: Component = () => {
  // Get LeetCode from platformLinks
  const leetcodeLink = platformLinks.find(link => link.title === 'LeetCode');

  return (
    <div class={styles.platformsWrapper}>
      <fieldset class={`${extraStyles.extraInnerSection} ${styles.compactSection}`}>
        <legend class={extraStyles.extraSectionTitle}>
          <TranslationMatrixEffect token={Ei18nToken.PLATFORMS_TITLE} />
        </legend>

        <div class={styles.linksContainer}>
          {leetcodeLink && (
            <>
              <SocialLink link={leetcodeLink} />
              <div class={styles.divider} />
            </>
          )}
          <SocialLink link={socialLinks[0]} />
          <div class={styles.divider} />
          <SocialLink link={socialLinks[1]} />
        </div>
      </fieldset>
    </div>
  );
};

export default ExtraLinks;
