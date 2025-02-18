import { Component, createSignal } from 'solid-js';
import TypeWriter from '@/components/terminal/TypeWriter';
import { QuickLinks } from '@components/quickLinks/QuickLinks';
import styles from './terminal.module.css';

export const Terminal: Component = () => {
  const [quickLinksVisibility, setQuickLinksVisibility] = createSignal(false);
  const [startTypeWriter, setStartTypeWriter] = createSignal(true);

  const toggleQuickLinksVisibility = () => {
    setQuickLinksVisibility(!quickLinksVisibility());
  };

  const toggleTypeWriter = () => {
    setStartTypeWriter(false);
  };

  return (
    <div class={styles.terminal}>
      <div class={styles.window}>
        <TypeWriter
          toggleQuickLinksVisibility={toggleQuickLinksVisibility}
          toggleTypeWriter={toggleTypeWriter}
          startTypeWriter={startTypeWriter()}
        />
        {quickLinksVisibility() && <QuickLinks />}
      </div>
    </div>
  );
};

export default Terminal;
