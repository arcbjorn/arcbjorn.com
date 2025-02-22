import { Component, createSignal, createEffect, createMemo, For, Show } from 'solid-js';
import styles from '@styles/languages.module.css';
import { getLanguageChars } from '@utils/helpers';

type MatrixColumn = {
  chars: string[];
  x: number;
  speed: number;
  head: number;
  length: number;
};

interface MatrixEffectProps {
  isHovered: boolean;
  level: number;
  languageToken: string;
}

const MatrixEffect: Component<MatrixEffectProps> = props => {
  const [matrixColumns, setMatrixColumns] = createSignal<MatrixColumn[]>([]);

  const getRandomChar = createMemo(() => (langToken: string) => {
    const chars = getLanguageChars(langToken);
    return chars[Math.floor(Math.random() * chars.length)];
  });

  const generateColumns = createMemo(() => {
    const columnWidth = 1.2;
    const availableWidth = Math.min(85, props.level);
    const maxColumns = Math.floor(85 / columnWidth);
    const activeColumns = Math.floor(availableWidth / columnWidth);
    const columnsToShow = Math.max(8, Math.min(maxColumns, activeColumns));

    return Array(columnsToShow)
      .fill(0)
      .map((_, index) => {
        const spacing = availableWidth / columnsToShow;
        return {
          chars: Array(10)
            .fill('')
            .map(() => getRandomChar()(props.languageToken)),
          x: index * spacing,
          speed: 0.15 + Math.random() * 0.2,
          head: Math.random() * 20,
          length: 3 + Math.floor(Math.random() * 2),
        };
      });
  });

  const updateColumns = createMemo(() => (prevColumns: MatrixColumn[]) => {
    return prevColumns.map(column => {
      const newHead = (column.head + column.speed) % 100;

      const newChars = [...column.chars];
      if (Math.random() < 0.15) {
        const changeIndex = Math.floor(Math.random() * column.chars.length);
        newChars[changeIndex] = getRandomChar()(props.languageToken);
      }

      return {
        ...column,
        head: newHead,
        chars: newChars,
      };
    });
  });

  createEffect(() => {
    if (props.isHovered) {
      setMatrixColumns(generateColumns());
      const interval = setInterval(() => {
        setMatrixColumns(prev => updateColumns()(prev));
      }, 50);
      return () => clearInterval(interval);
    }
  });

  return (
    <Show when={props.isHovered}>
      <div
        class={styles.matrixEffect}
        style={{
          width: '100%',
          height: '120%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <For each={matrixColumns()}>
          {(column, i) => (
            <div
              style={{
                position: 'absolute',
                left: `${column.x}%`,
                top: '0',
                height: '100%',
                'font-size': '11px',
                'line-height': '11px',
                width: '1.2%',
                'text-align': 'center',
              }}
            >
              <For each={column.chars}>
                {(char, j) => {
                  const charPosition = (j() + column.head) % 20;
                  const isHead = j() === Math.floor(column.head) % column.chars.length;
                  const isTail =
                    j() === (Math.floor(column.head) + column.length) % column.chars.length;
                  const distanceFromHead = (j() - Math.floor(column.head)) % column.chars.length;

                  const opacity = isHead
                    ? 1
                    : isTail
                      ? 0.05
                      : Math.max(0.05, 1 - (distanceFromHead / column.length) * 2);

                  return (
                    <div
                      style={{
                        position: 'absolute',
                        top: `${charPosition * 20}%`,
                        left: '0',
                        right: '0',
                        color: 'var(--bg)',
                        opacity,
                        transform: isHead ? 'scale(1.15)' : 'scale(1)',
                        'font-weight': isHead ? 'bold' : 'normal',
                        'text-shadow': isHead ? '0 0 6px var(--bg)' : 'none',
                      }}
                    >
                      {char}
                    </div>
                  );
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};

export default MatrixEffect;
