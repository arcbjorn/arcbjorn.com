import { Component, createSignal, createEffect, onCleanup } from 'solid-js';
import { getRandomInteger } from '@utils/typing';
import animations from '@styles/animations.module.css';

export type TypewriterOptions = {
  strings: string | string[];
  delay?: number | 'natural';
  deleteSpeed?: number | 'natural';
  loop?: boolean;
  cursor?: string;
  pauseFor?: number;
  devMode?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
  ref?: (instance: { reset: () => void }) => void;
  class?: string;
};

const Typewriter: Component<TypewriterOptions> = props => {
  const [displayText, setDisplayText] = createSignal('');
  const [isActive, setIsActive] = createSignal(false);
  let currentOperation: 'typing' | 'erasing' | null = null;
  let initialTypingDone = false;

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const typeText = async (text: string) => {
    if (currentOperation) return;
    currentOperation = 'typing';
    setIsActive(true);

    const chars = text.split('');
    for (let i = 0; i < chars.length && currentOperation === 'typing'; i++) {
      // Add slight variations for more natural typing rhythm
      const baseDelay = props.delay === 'natural' ? getRandomInteger(120, 240) : props.delay || 180;
      const variationDelay = getRandomInteger(-30, 50); // Add random variation

      // Add extra delay for punctuation and spaces
      const extraDelay = /[.,!? ]/.test(chars[i]) ? 100 : 0;

      await sleep(baseDelay + variationDelay + extraDelay);
      setDisplayText(prev => prev + chars[i]);
    }

    if (currentOperation === 'typing' && props.onComplete) {
      props.onComplete();
    }
    currentOperation = null;
    setIsActive(false);
  };

  const eraseText = async () => {
    if (currentOperation) return;
    currentOperation = 'erasing';
    setIsActive(true);

    while (displayText().length > 0 && currentOperation === 'erasing') {
      // Vary erasing speed with occasional pauses
      const baseDelay = 90;
      const variationDelay = getRandomInteger(-20, 40);
      const pauseDelay = Math.random() < 0.1 ? 200 : 0; // Occasional longer pause

      await sleep(baseDelay + variationDelay + pauseDelay);
      setDisplayText(prev => prev.slice(0, -1));
    }

    currentOperation = null;
    setIsActive(false);
  };

  const reset = async () => {
    // Stop current operation
    currentOperation = null;
    setIsActive(false);
    await sleep(50);

    // Start new sequence
    await eraseText();
    await sleep(100);

    const newText = Array.isArray(props.strings) ? props.strings[0] : props.strings;
    await typeText(newText);
  };

  // Initial typing - only run once
  createEffect(() => {
    if (props.autoStart && !initialTypingDone && !isActive()) {
      initialTypingDone = true;
      const text = Array.isArray(props.strings) ? props.strings[0] : props.strings;
      typeText(text);
    }
  });

  if (props.ref) {
    props.ref({ reset });
  }

  onCleanup(() => {
    currentOperation = null;
    setIsActive(false);
  });

  return (
    <span class={props.class} style={{ 'white-space': 'pre-wrap' }}>
      <span>{displayText()}</span>
      <span class={`opacity-100 ${animations.cursorBlink}`}>{props.cursor}</span>
    </span>
  );
};

export default Typewriter;
