import { createSignal, createEffect, onCleanup } from 'solid-js';
import { useI18n } from '../i18n/useI18n';
import { Ei18nToken } from '@/i18n/types';

const getTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Argentina/Buenos_Aires',
  });
};

export const TimeZone = () => {
  const { t } = useI18n();
  const [time, setTime] = createSignal(getTime());

  createEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 60000);

    onCleanup(() => clearInterval(interval));
  });

  const Clock = (
    <span>
      {time().substring(0, 2)}
      <span class="animate-blink">:</span>
      {time().substring(3, 5)}
    </span>
  );

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
      &nbsp;&nbsp;{Clock}&nbsp;&nbsp;{t(Ei18nToken.LOCATION)}
    </div>
  );
};

export default TimeZone;
