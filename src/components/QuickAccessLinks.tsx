import { Component, createSignal } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { TLink, ELinkUrl } from '@/types';
import { quickAccessLinks } from '@/data/links';
import LinkIcon from '@components/LinkIcon';
import { Ei18nToken } from '@i18n/types';

type QuickAccesLinkProps = {
  link: TLink & {
    children?: any;
  };
  copyToClipboard: boolean;
};

const QuickAccesLink: Component<QuickAccesLinkProps> = props => {
  const { title, href } = props.link;
  const { copyToClipboard } = props;
  const { t } = useI18n();
  const [isCopied, setIsCopied] = createSignal(false);

  let processedHref = href;
  let cvLinkCss = '';
  let translatedTitle = title;

  if (title === Ei18nToken.CV) {
    processedHref = href;
    cvLinkCss = 'cvLink';
    translatedTitle = t(Ei18nToken.CV);

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
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <a
      class={`quickLink ${cvLinkCss}`}
      href={processedHref}
      target={copyToClipboard ? '_self' : '_blank'}
      onClick={handleClick}
      rel="noopener noreferrer"
    >
      <LinkIcon link={props.link} class="icon" />
      {isCopied() ? 'Copied!' : translatedTitle}
    </a>
  );
};

export const QuickAccessLinks: Component = () => {
  return (
    <div class="flex h-full flex-col items-center px-6 pt-10 sm:pt-16">
      <h3 class="text-xl font-bold sm:text-2xl">Click to copy link:</h3>
      <div class="flex-col">
        {quickAccessLinks.map(link => (
          <QuickAccesLink link={link} copyToClipboard={true} />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessLinks;
