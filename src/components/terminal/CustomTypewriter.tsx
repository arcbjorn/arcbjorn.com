import { createSignal, createEffect, onCleanup, Component } from 'solid-js';
import { TypewriterOptions, EventName, EventQueueItem } from '@/types';
import { getRandomInteger } from '@/utils/typewriter';

export const CustomTypewriter: Component<TypewriterOptions> = props => {
  const [displayText, setDisplayText] = createSignal('');
  const [cursorVisible, setCursorVisible] = createSignal(true);
  let eventQueue: EventQueueItem[] = [];
  let lastFrameTime: number | null = null;
  let pauseUntil: number | null = null;
  let frameId: number | null = null;

  const defaultOptions: TypewriterOptions = {
    delay: 'natural',
    deleteSpeed: 'natural',
    loop: false,
    cursor: '|',
    pauseFor: 1500,
    devMode: false,
    autoStart: true,
    ...props,
  };

  createEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 400);

    onCleanup(() => clearInterval(cursorInterval));
  });

  const addToQueue = (eventName: EventName, eventArgs?: any) => {
    eventQueue.push({ eventName, eventArgs });
    if (!frameId) {
      runEventLoop();
    }
  };

  const typeString = (str: string) => {
    const chars = str.split('');
    chars.forEach(char => {
      addToQueue('TYPE_CHARACTER', { character: char });
    });
    addToQueue('PAUSE_FOR', { ms: defaultOptions.pauseFor });
  };

  const runEventLoop = () => {
    if (!lastFrameTime) {
      lastFrameTime = Date.now();
    }

    const now = Date.now();
    const delta = now - lastFrameTime;

    if (eventQueue.length === 0) {
      if (props.onComplete) {
        props.onComplete();
      }
      return;
    }

    if (pauseUntil && now < pauseUntil) {
      frameId = requestAnimationFrame(runEventLoop);
      return;
    }

    const currentEvent = eventQueue[0];
    const delay =
      defaultOptions.delay === 'natural'
        ? getRandomInteger(120, 160)
        : (defaultOptions.delay as number);

    if (delta <= delay) {
      frameId = requestAnimationFrame(runEventLoop);
      return;
    }

    const { eventName, eventArgs } = eventQueue.shift()!;

    switch (eventName) {
      case 'TYPE_CHARACTER':
        setDisplayText(prev => prev + eventArgs.character);
        break;
      case 'PAUSE_FOR':
        pauseUntil = now + eventArgs.ms;
        break;
    }

    lastFrameTime = now;
    frameId = requestAnimationFrame(runEventLoop);
  };

  createEffect(() => {
    if (defaultOptions.autoStart && props.strings) {
      typeString(Array.isArray(props.strings) ? props.strings[0] : props.strings);
    }
  });

  onCleanup(() => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  });

  return (
    <div class="typewriter" style={{ 'white-space': 'pre-wrap' }}>
      <span>{displayText()}</span>
      <span style={{ opacity: cursorVisible() ? 1 : 0 }} class="typewriter-cursor">
        {defaultOptions.cursor}
      </span>
    </div>
  );
};
