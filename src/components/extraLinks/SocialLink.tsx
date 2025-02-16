import { Component } from 'solid-js';
import { TLink } from '@/types';
import LinkIcon from '@components/LinkIcon';

interface SocialLinkProps {
  link: TLink;
}

const SocialLink: Component<SocialLinkProps> = props => {
  const { href } = props.link;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" class="social-link-icon">
      <LinkIcon link={props.link} class="social-link-icon" />
    </a>
  );
};

export default SocialLink;
