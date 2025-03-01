import { createEffect, createSignal, onCleanup } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';
import TextMatrixEffect from '@/components/TextMatrixEffect';
import animations from '@styles/animations.module.css';

const getTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires',
  });
};

export const TimeZone = () => {
  const { t, language } = useI18n();
  const [time, setTime] = createSignal(getTime());
  const [showMatrixEffect, setShowMatrixEffect] = createSignal(false);
  let isMounted = false;
  let previousLocation = t(Ei18nToken.LOCATION);

  createEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 60000);

    onCleanup(() => clearInterval(interval));
  });

  createEffect(() => {
    // Track language changes
    language();

    // Skip the effect on mount
    if (!isMounted) {
      isMounted = true;
      return;
    }

    const currentLocation = t(Ei18nToken.LOCATION);
    if (currentLocation !== previousLocation) {
      setShowMatrixEffect(true);
      previousLocation = currentLocation;
    }
  });

  const handleMatrixComplete = () => {
    setShowMatrixEffect(false);
  };

  return (
    <div class="hidden lg:flex">
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />
      </svg>
      &nbsp;&nbsp;
      <span>
        {time().substring(0, 2)}
        <span class={`${animations.clockBlink}`}>:</span>
        {time().substring(3, 5)}
      </span>
      &nbsp;&nbsp;
      <TextMatrixEffect
        text={t(Ei18nToken.LOCATION)}
        language={language()}
        showEffect={showMatrixEffect()}
        onComplete={handleMatrixComplete}
      />
    </div>
  );
};

export default TimeZone;
