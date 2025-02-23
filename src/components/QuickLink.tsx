import { Component, createSignal } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { TLink, ELinkUrl } from '@/types/types';
import LinkIcon from '@components/LinkIcon';
import { Ei18nToken } from '@i18n/types';
import styles from '@styles/quickLink.module.css';

type QuickLinkProps = {
  link: TLink & {
    children?: any;
  };
  copyToClipboard?: boolean;
  titleOverride?: string;
};

const QuickLink: Component<QuickLinkProps> = props => {
  const { titleOverride } = props;
  const { href, title } = props.link;
  const { copyToClipboard = false } = props;
  const { t } = useI18n();
  const [isCopied, setIsCopied] = createSignal(false);

  let processedHref = href;
  let cvLinkCss = '';

  const translatedTitle = () => {
    if (titleOverride) {
      return titleOverride;
    }

    if (title === Ei18nToken.CV) {
      return t(title) ?? title;
    }
    return title;
  };

  if (title === Ei18nToken.CV) {
    processedHref = href;
    cvLinkCss = styles.cvLink;

    if (copyToClipboard) {
      processedHref = ELinkUrl.CV_LINK;
    }
  }

  const handleClick = async (e: MouseEvent) => {
    if (copyToClipboard) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(processedHref);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link: ', err);
      }
    }
  };

  return (
    <a
      class={`${styles.quickLink} ${cvLinkCss}`}
      href={processedHref}
      target={copyToClipboard ? '_self' : '_blank'}
      onClick={handleClick}
      rel="noopener noreferrer"
    >
      <LinkIcon link={props.link} class={styles.icon} />
      {isCopied() ? 'Copied!' : translatedTitle()}
    </a>
  );
};

export default QuickLink;
