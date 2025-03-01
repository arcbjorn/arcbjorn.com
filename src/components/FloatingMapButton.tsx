import { Component, createSignal, onMount } from 'solid-js';
import { A, useParams } from '@solidjs/router';
import { getNavMenuLinkPath } from '@utils/navigation';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';

const FloatingMapButton: Component = () => {
  const { t } = useI18n();
  const params = useParams();
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    setTimeout(() => setIsVisible(true), 2000);
  });

  return (
    <div
      class="fixed right-6 bottom-6 sm:hidden"
      style={{
        opacity: isVisible() ? 1 : 0,
        'pointer-events': isVisible() ? 'auto' : 'none',
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <A
        href={getNavMenuLinkPath('/map', params)}
        class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color)] text-[var(--bg)] shadow-lg transition-colors hover:bg-[var(--bg)] hover:text-[var(--color)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
          />
        </svg>
      </A>
    </div>
  );
};

export default FloatingMapButton;
