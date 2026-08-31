import { useState, useEffect, useRef, useCallback } from 'react';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScramble(initialText: string, autoStart = true, delay = 0) {
  const [displayText, setDisplayText] = useState(initialText);
  const isScramblingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const scrambleTo = useCallback((targetText: string) => {
    if (isScramblingRef.current && frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    isScramblingRef.current = true;
    const length = Math.max(displayText.length, targetText.length);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

    for (let i = 0; i < length; i++) {
      const from = displayText[i] || '';
      const to = targetText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      queue.push({ from, to, start, end });
    }

    let frame = 0;

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (frame >= item.end) {
          complete++;
          output += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.3) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          output += item.char;
        } else {
          output += item.from;
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        isScramblingRef.current = false;
      } else {
        frame++;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [displayText]);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        scrambleTo(initialText);
      }, delay);
      return () => {
        clearTimeout(timer);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }
  }, [autoStart, delay, initialText, scrambleTo]);

  return { displayText, scrambleTo };
}
