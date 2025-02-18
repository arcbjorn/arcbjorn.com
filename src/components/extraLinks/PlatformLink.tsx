import { Component } from 'solid-js';
import { IPlatformLinkPartial, TLink } from '@/types';
import { useI18n } from '@i18n/useI18n';
import LinkIcon from '@components/LinkIcon';
import { Ei18nToken } from '@/i18n/types';
import styles from './extraLinks.module.css';

type TPlatformLinkProps = {
  link: TLink<IPlatformLinkPartial>;
};

const PlatformLink: Component<TPlatformLinkProps> = props => {
  const { t } = useI18n();
  const { title, href } = props.link;

  const isEi18nToken = (title: string): title is Ei18nToken => {
    return Object.values(Ei18nToken).includes(title as Ei18nToken);
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" class={styles.platformLink}>
      <div class={styles.platformLinkTitle}>
        <LinkIcon link={props.link} class={styles.platformLinkIcon} />
        {isEi18nToken(title) ? t(title) : title}
      </div>
    </a>
  );
};

export default PlatformLink;
