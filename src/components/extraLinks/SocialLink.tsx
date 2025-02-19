import { Component } from 'solid-js';
import { TLink } from '@/types';
import LinkIcon from '@components/LinkIcon';
import styles from '@styles/extraLinks.module.css';

interface SocialLinkProps {
  link: TLink;
}

const SocialLink: Component<SocialLinkProps> = props => {
  const { href } = props.link;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <LinkIcon link={props.link} class={styles.socialLinkIcon} />
    </a>
  );
};

export default SocialLink;
