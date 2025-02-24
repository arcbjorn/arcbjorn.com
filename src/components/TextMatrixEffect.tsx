import { Component, createSignal, createEffect } from 'solid-js';
import { getLanguageChars } from '@utils/typing';

interface TextMatrixEffectProps {
  text: string | undefined;
  onComplete: () => void;
  language: string;
  showEffect: boolean;
}

export const TextMatrixEffect: Component<TextMatrixEffectProps> = props => {
  const [currentText, setCurrentText] = createSignal(props.text);

  const animateText = async () => {
    if (!props.showEffect || !props.text) return;

    const chars = getLanguageChars(props.language);
    const finalText = props.text;
    const iterations = 8; // Increased iterations for more effect
    let stabilizedPositions = new Set<number>();

    for (let i = 0; i < iterations; i++) {
      const newText = Array.from(finalText)
        .map((char, index) => {
          // Keep already stabilized characters
          if (stabilizedPositions.has(index)) {
            return char;
          }
          // Gradually increase chance of showing correct character
          if (Math.random() < (i / iterations) * 0.9) {
            stabilizedPositions.add(index);
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setCurrentText(newText);
      await new Promise(resolve => setTimeout(resolve, 60));
    }

    // Ensure final text is set correctly
    setCurrentText(finalText);
    props.onComplete();
  };

  createEffect(() => {
    if (props.showEffect) {
      animateText();
    }
  });

  return <span>{currentText()}</span>;
};

export default TextMatrixEffect;
