import { Component, Show, createSignal, onMount, createEffect, onCleanup } from 'solid-js';
import { getInitialTheme } from '@utils/theme';
import { Theme } from '@/types/types';
import styles from '@styles/projectPreview.module.css';

interface ProjectPreviewProps {
  url: string;
  name: string;
  isVisible: boolean;
  onPreviewEnter?: () => void;
  onPreviewLeave?: () => void;
}

export const ProjectPreview: Component<ProjectPreviewProps> = props => {
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [loaderReady, setLoaderReady] = createSignal(false);
  const [previousUrl, setPreviousUrl] = createSignal<string | null>(null);
  const [currentThemeColor, setCurrentThemeColor] = createSignal('#1b1d1e');
  const [loadFailed, setLoadFailed] = createSignal(false);
  let containerEl: HTMLDivElement | undefined;
  const [pos, setPos] = createSignal<{ left: number; top: number }>({ left: 0, top: 0 });

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  const getCurrentThemeColor = () => {
    try {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--color').trim();
      return color || (getInitialTheme() === Theme.DARK ? '#dddddd' : '#1b1d1e');
    } catch {
      return getInitialTheme() === Theme.DARK ? '#dddddd' : '#1b1d1e';
    }
  };

  createEffect(() => {
    if (typeof window === 'undefined' || !props.isVisible) return;

    const handleThemeChange = () => setCurrentThemeColor(getCurrentThemeColor());
    let mediaQuery: MediaQueryList | undefined;
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleThemeChange);
    }
    const storageListener = (e: StorageEvent) => {
      if (e.key === 'theme') handleThemeChange();
    };
    window.addEventListener('storage', storageListener);
    const customListener = () => handleThemeChange();
    window.addEventListener('themechange', customListener as EventListener);

    onCleanup(() => {
      if (mediaQuery) mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('storage', storageListener);
      window.removeEventListener('themechange', customListener as EventListener);
    });
  });

  onMount(async () => {
    await import('ldrs/zoomies');
    setLoaderReady(true);
    setCurrentThemeColor(getCurrentThemeColor());
  });

  createEffect(() => {
    if (previousUrl() && previousUrl() !== props.url) {
      setIsLoaded(false);
      setLoadFailed(false);
    }
    setPreviousUrl(props.url);
  });

  createEffect(() => {
    if (!props.isVisible || isLoaded()) return;
    let timer: number | undefined;
    timer = window.setTimeout(() => {
      if (!isLoaded()) {
        setLoadFailed(true);
        setIsLoaded(true);
      }
    }, 10000);
    onCleanup(() => {
      if (timer) window.clearTimeout(timer);
    });
  });

  const computePosition = () => {
    if (!containerEl) return;
    const anchor = containerEl.parentElement as HTMLElement | null;
    if (!anchor) return;
    const a = anchor.getBoundingClientRect();
    const width = containerEl.offsetWidth || 400;
    const height = containerEl.offsetHeight || 300;

    let left = a.left;
    let top = a.top - height - 8;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (left + width > vw - 8) left = Math.max(8, vw - width - 8);
    if (left < 8) left = 8;

    if (top < 8) top = Math.min(vh - height - 8, a.bottom + 8);

    setPos({ left, top });
  };

  createEffect(() => {
    if (!props.isVisible) return;
    requestAnimationFrame(computePosition);
    const onResize = () => requestAnimationFrame(computePosition);
    const onScroll = () => requestAnimationFrame(computePosition);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    onCleanup(() => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    });
  });

  return (
    <Show when={props.isVisible}>
      <div
        ref={el => (containerEl = el)}
        class={styles.previewContainer}
        aria-busy={!isLoaded()}
        style={{ position: 'fixed', left: `${pos().left}px`, top: `${pos().top}px` }}
        onMouseEnter={() => props.onPreviewEnter?.()}
        onMouseLeave={() => props.onPreviewLeave?.()}
      >
        <Show when={!isLoaded() && loaderReady()}>
          <div class={styles.loaderContainer} role="status" aria-live="polite">
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
        <Show when={loadFailed()}>
          <div class={styles.loaderContainer}>
            <div class={styles.errorMessage}>
              Preview unavailable. <a href={props.url} target="_blank">Open</a>
            </div>
          </div>
        </Show>
        <iframe
          src={props.url}
          class={styles.previewIframe}
          title={`Preview of ${props.name}`}
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={() => {
            setLoadFailed(true);
            setIsLoaded(true);
          }}
          style={{ opacity: isLoaded() ? 1 : 0 }}
        />
      </div>
    </Show>
  );
};

export default ProjectPreview;
