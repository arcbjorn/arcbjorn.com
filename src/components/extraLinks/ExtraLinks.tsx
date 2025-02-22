import { Component } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';

import PlatformLink from '@/components/extraLinks/PlatformLink';
import SocialLink from '@/components/extraLinks/SocialLink';
import { platformLinks, socialLinks } from '@data/linksData';

import extraStyles from '@styles/extra.module.css';
import styles from '@styles/extraLinks.module.css';

const ExtraLinks: Component = () => {
  const { t } = useI18n();

  return (
    <fieldset class={extraStyles.extraInnerSection}>
      <legend class={extraStyles.extraSectionTitle}>{t(Ei18nToken.PLATFORMS_TITLE)}</legend>

      <div class={styles.platformLinks}>
        {platformLinks.map(link => (
          <PlatformLink link={link} />
        ))}
      </div>

      <div class={styles.socialLinks}>
        {socialLinks.map(link => (
          <SocialLink link={link} />
        ))}
      </div>
    </fieldset>
  );
};

export default ExtraLinks;
