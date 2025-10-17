import { Component, createSignal, createEffect } from 'solid-js';
import { useI18n } from '@i18n/useI18n';
import { Ei18nToken } from '@i18n/types';
import TextMatrixEffect from '@components/TextMatrixEffect';

interface TranslationMatrixEffectProps {
  token: Ei18nToken;
  lowerCase?: boolean;
}

const TranslationMatrixEffect: Component<TranslationMatrixEffectProps> = props => {
  const { t, language } = useI18n();
  let isMounted = false;
  const [showMatrixEffect, setShowMatrixEffect] = createSignal(false);
  const getText = () => {
    const text = t(props.token) as string;
    return props.lowerCase ? text.toLowerCase() : text;
  };
  let previousText = getText();

  createEffect(() => {
    // Track language changes
    language();

    // Skip the effect on mount
    if (!isMounted) {
      isMounted = true;
      return;
    }

    // Check if text changed and trigger effect
    const currentText = getText();
    if (currentText !== previousText) {
      setShowMatrixEffect(true);
      previousText = currentText;
    }
  });

  return (
    <TextMatrixEffect
      language={language()}
      showEffect={showMatrixEffect()}
      onComplete={() => setShowMatrixEffect(false)}
      text={getText()}
    />
  );
};

export default TranslationMatrixEffect;
