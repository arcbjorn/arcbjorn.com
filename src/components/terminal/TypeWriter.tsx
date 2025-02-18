import { Component } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';
import getTerminalText from '@/data/introText';
import { CustomTypewriter } from './CustomTypewriter';
import styles from './terminal.module.css';

type TypeWriterProps = {
  toggleQuickLinksVisibility: () => void;
  toggleTypeWriter: () => void;
  startTypeWriter: boolean;
};

const TypeWriter: Component<TypeWriterProps> = props => {
  const { t } = useI18n();

  const translatedText = getTerminalText({
    name: t(Ei18nToken.NAME),
    file: t(Ei18nToken.FILE),
    greeting: t(Ei18nToken.GREETING),
    position: t(Ei18nToken.POSITION),
    formerly: t(Ei18nToken.FORMERLY),
    interests: t(Ei18nToken.INTERESTS),
  });

  const handleComplete = () => {
    props.toggleTypeWriter();
    props.toggleQuickLinksVisibility();
  };

  return (
    <div class={styles.typeWriter}>
      <CustomTypewriter
        strings={translatedText}
        delay={props.startTypeWriter ? 60 : 0}
        autoStart={true}
        onComplete={handleComplete}
        cursor="|"
      />
    </div>
  );
};

export default TypeWriter;
