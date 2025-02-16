import { Component, Show } from 'solid-js';
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faReddit,
  faInstagram,
  faSpotify,
  faGoodreads,
} from '@fortawesome/free-brands-svg-icons';
import { faTerminal, faEarthAmericas, faBook } from '@fortawesome/free-solid-svg-icons';
import { EIconLibrary, TLink, IPlatformLinkPartial, IHomePageLinkPartial } from '@/types';
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';

interface LinkIconProps {
  link: TLink | TLink<IPlatformLinkPartial> | TLink<IHomePageLinkPartial>;
  class?: string;
}

const iconMap: Record<IconName | string, IconDefinition> = {
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
  reddit: faReddit,
  instagram: faInstagram,
  spotify: faSpotify,
  goodreads: faGoodreads,
  terminal: faTerminal,
  'earth-americas': faEarthAmericas,
  book: faBook,
};

const FontAwesomeIcon: Component<{ icon: IconDefinition; title: string }> = props => {
  const path = Array.isArray(props.icon.icon[4]) ? props.icon.icon[4][0] : props.icon.icon[4];

  return (
    <svg
      viewBox={`0 0 ${props.icon.icon[0]} ${props.icon.icon[1]}`}
      class="h-5 w-5"
      fill="currentColor"
      aria-label={props.title}
      role="img"
    >
      <title>{props.title}</title>
      <path d={path} />
    </svg>
  );
};

const LinkIcon: Component<LinkIconProps> = props => {
  const isFontAwesome = () => props.link.iconPrefix === EIconLibrary.FONT_AWESOME;
  const isMaterialIcon = () => props.link.iconPrefix === EIconLibrary.MATERIAL;

  return (
    <div class={`${props.class || ''}`} title={props.link.iconTitle}>
      <Show when={isFontAwesome()}>
        <FontAwesomeIcon icon={iconMap[props.link.iconName]} title={props.link.iconTitle} />
      </Show>

      <Show when={isMaterialIcon()}>
        <span class="material-icons">{props.link.iconName}</span>
      </Show>
    </div>
  );
};
export default LinkIcon;
