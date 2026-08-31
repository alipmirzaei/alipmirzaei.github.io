import React, { useState, useEffect, useRef } from 'react';
import { cyberAudio } from '../utils/audio';

interface ScrambleSpanProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  scrambleOnMount?: boolean;
  delay?: number;
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleSpan: React.FC<ScrambleSpanProps> = ({
  text,
  className = '',
  scrambleOnHover = true,
  scrambleOnMount = true,
  delay = 0,
}) => {
  const [output, setOutput] = useState(text);
  const frameRef = useRef<number | null>(null);

  const runScramble = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const length = text.length;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

    for (let i = 0; i < length; i++) {
      const from = output[i] || '';
      const to = text[i] || '';
      const start = Math.floor(Math.random() * 15);
      const end = start + Math.floor(Math.random() * 15) + 8;
      queue.push({ from, to, start, end });
    }

    let frame = 0;

    const update = () => {
      let currentString = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (frame >= item.end) {
          complete++;
          currentString += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          currentString += item.char;
        } else {
          currentString += item.from;
        }
      }

      setOutput(currentString);

      if (complete < queue.length) {
        frame++;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      const timer = setTimeout(() => {
        runScramble();
      }, delay);
      return () => {
        clearTimeout(timer);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }
  }, [text, scrambleOnMount, delay]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      cyberAudio.playClick();
      runScramble();
    }
  };

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={text}
    >
      {output}
    </span>
  );
};
