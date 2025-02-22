import { Component, onMount } from 'solid-js';

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

export const Loader: Component = () => {
  onMount(async () => {
    // Dynamically import the loader only when component mounts
    await import('ldrs/zoomies');
  });

  return (
    <div class="flex h-[90vh] w-full items-center justify-center">
      <l-zoomies size="150" stroke="10" speed="1.2" color="var(--color)" />
    </div>
  );
};

export default Loader;
