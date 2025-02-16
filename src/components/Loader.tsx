import { Component } from 'solid-js';
import 'ldrs/zoomies';

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
  return (
    <div class="flex h-full w-full items-center justify-center">
      <l-zoomies size="150" stroke="10" speed="1.2" color="var(--color)" />
    </div>
  );
};

export default Loader;
