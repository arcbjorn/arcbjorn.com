import { Component, Show } from 'solid-js';
import styles from '@styles/projectPreview.module.css';

interface ProjectPreviewProps {
  url: string;
  name: string;
  isVisible: boolean;
}

export const ProjectPreview: Component<ProjectPreviewProps> = props => {
  return (
    <Show when={props.isVisible}>
      <div class={styles.previewContainer}>
        <iframe
          src={props.url}
          class={styles.previewIframe}
          title={`Preview of ${props.name}`}
          loading="lazy"
        />
      </div>
    </Show>
  );
};

export default ProjectPreview;
