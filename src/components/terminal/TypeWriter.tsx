import { Component } from 'solid-js';
import Typewriter from 'typewriter-effect';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';
import getTerminalText from '@/data/introText';
import styles from './terminal.module.css';

type TypeWriterProps = {
  toggleQuickLinksVisibility: () => void;
  toggleTypeWriter: () => void;
  startTypeWriter: boolean;
};

const TypeWriter: Component<TypeWriterProps> = props => {
  const { t } = useI18n();

  const introText = getTerminalText({
    name: t(Ei18nToken.NAME),
    file: t(Ei18nToken.FILE),
    greeting: t(Ei18nToken.GREETING),
    position: t(Ei18nToken.POSITION),
    formerly: t(Ei18nToken.FORMERLY),
    interests: t(Ei18nToken.INTERESTS),
  });

  return (
    <div class={styles.typeWriter}>
      <Typewriter
        onInit={typewriter => {
          if (props.startTypeWriter) {
            typewriter
              .typeString(introText)
              .callFunction(() => {
                props.toggleTypeWriter();
                props.toggleQuickLinksVisibility();
              })
              .start();
          } else {
            typewriter
              .pasteString(introText, null)
              .callFunction(() => {
                props.toggleQuickLinksVisibility();
              })
              .start();
          }
        }}
        options={{
          delay: props.startTypeWriter ? 60 : 0,
        }}
      />
    </div>
  );
};

export default TypeWriter;
