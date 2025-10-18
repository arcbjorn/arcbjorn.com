import { Component, Show, createSignal, onMount, createEffect, onCleanup } from 'solid-js';
import { getInitialTheme } from '@utils/theme';
import { Theme } from '@/types/types';
import styles from '@styles/projectPreview.module.css';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'l-zoomies': {
        size?: string;
        stroke?: string;
        speed?: string;
        color?: string;
      };
    }
  }
}

interface ProjectPreviewProps {
  url: string;
  name: string;
  isVisible: boolean;
}

export const ProjectPreview: Component<ProjectPreviewProps> = props => {
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [loaderReady, setLoaderReady] = createSignal(false);
  const [previousUrl, setPreviousUrl] = createSignal<string | null>(null);
  const [currentThemeColor, setCurrentThemeColor] = createSignal('#1b1d1e');

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  const getCurrentThemeColor = () => {
    const currentTheme = getInitialTheme();
    // Return current theme color: dark for dark mode, light for light mode
    return currentTheme === Theme.DARK ? '#dddddd' : '#1b1d1e';
  };

  // Set up theme change listeners
  createEffect(() => {
    if (!props.isVisible) return;

    const handleThemeChange = () => setCurrentThemeColor(getCurrentThemeColor());

    // system theme changes
    let mediaQuery: MediaQueryList | undefined;
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleThemeChange);
    }

    // cross-tab theme changes
    const storageListener = (e: StorageEvent) => {
      if (e.key === 'theme') handleThemeChange();
    };
    window.addEventListener('storage', storageListener);

    // same-tab theme changes via applyTheme()
    const customListener = () => handleThemeChange();
    window.addEventListener('themechange', customListener as EventListener);

    onCleanup(() => {
      if (mediaQuery) mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('storage', storageListener);
      window.removeEventListener('themechange', customListener as EventListener);
    });
  });

  onMount(async () => {
    // Dynamically import the loader only when component mounts
    await import('ldrs/zoomies');
    setLoaderReady(true);
    setCurrentThemeColor(getCurrentThemeColor());
  });

  // Reset loading state when URL changes
  createEffect(() => {
    if (previousUrl() && previousUrl() !== props.url) {
      setIsLoaded(false);
    }
    setPreviousUrl(props.url);
  });

  return (
    <Show when={props.isVisible}>
      <div class={styles.previewContainer}>
        <Show when={!isLoaded() && loaderReady()}>
          <div class={styles.loaderContainer}>
            <div class={styles.miniLoader}>
              <l-zoomies
                size="60"
                stroke="4"
                speed="1.2"
                color={currentThemeColor()}
              />
            </div>
          </div>
        </Show>
        <iframe
          src={props.url}
          class={styles.previewIframe}
          title={`Preview of ${props.name}`}
          loading="lazy"
          onLoad={handleIframeLoad}
          style={{ opacity: isLoaded() ? 1 : 0 }}
        />
      </div>
    </Show>
  );
};

export default ProjectPreview;
