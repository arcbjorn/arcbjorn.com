import { Component, createSignal, Show } from 'solid-js';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  class?: string;
}

const OptimizedImage: Component<OptimizedImageProps> = props => {
  const [imageError, setImageError] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(true);

  const webpSrc = props.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture class={props.class}>
      <Show when={!imageError()}>
        <source srcset={webpSrc} type="image/webp" />
      </Show>
      <img
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        loading={props.loading || 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => setImageError(true)}
        style={{
          opacity: isLoading() ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </picture>
  );
};

export default OptimizedImage;
