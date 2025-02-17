import { Component } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';

import PlatformLink from '@/components/extraLinks/PlatformLink';
import SocialLink from '@/components/extraLinks/SocialLink';
import { platformLinks, socialLinks } from '@/data/links';

const ExtraLinks: Component = () => {
  const { t } = useI18n();

  return (
    <fieldset class="extra-inner-section">
      <legend class="extra-section-title">{t(Ei18nToken.PLATFORMS_TITLE)}</legend>

      <div class="platform-links">
        {platformLinks.map(link => (
          <PlatformLink link={link} />
        ))}
      </div>

      <div class="social-links">
        {socialLinks.map(link => (
          <SocialLink link={link} />
        ))}
      </div>
    </fieldset>
  );
};

export default ExtraLinks;
