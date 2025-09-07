import { Component, For } from 'solid-js';
import { Ei18nToken } from '@i18n/types';
import PlatformLink from '@/components/extraLinks/PlatformLink';
import SocialLink from '@/components/extraLinks/SocialLink';
import TranslationMatrixEffect from '@/components/TranslationMatrixEffect';
import { platformLinks, socialLinks } from '@data/linksData';
import extraStyles from '@styles/extra.module.css';
import styles from '@styles/extraLinks.module.css';

const ExtraLinks: Component = () => {
  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>
        <TranslationMatrixEffect token={Ei18nToken.PLATFORMS_TITLE} />
      </legend>

      <div class={styles.linksContainer}>
        <div class={styles.platformLinks}>
          <For each={platformLinks}>{link => (
            <PlatformLink link={link} />
          )}</For>
        </div>

        <div class={styles.socialLinks}>
          <For each={socialLinks}>{link => (
            <SocialLink link={link} />
          )}</For>
        </div>
      </div>
    </fieldset>
  );
};

export default ExtraLinks;
