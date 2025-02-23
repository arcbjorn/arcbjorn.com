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
  let previousText = props.lowerCase ? t(props.token)?.toLowerCase() : t(props.token);

  createEffect(() => {
    // Track language changes
    language();

    // Skip the effect on mount
    if (!isMounted) {
      isMounted = true;
      return;
    }

    // Check if text changed and trigger effect
    const currentText = props.lowerCase ? t(props.token)?.toLowerCase() : t(props.token);
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
      text={props.lowerCase ? t(props.token)?.toLowerCase() : t(props.token)}
    />
  );
};

export default TranslationMatrixEffect;
