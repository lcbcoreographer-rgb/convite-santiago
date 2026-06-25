import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FlyingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export function FlyingText({ text, className, delay = 0 }: FlyingTextProps) {
  const letters = useMemo(
    () =>
      splitGraphemes(text).map((ch, i) => ({
        ch,
        i,
        fromX: (Math.random() - 0.5) * 220,
        fromY: -60 - Math.random() * 140,
        rotate: (Math.random() - 0.5) * 100,
      })),
    [text]
  );

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.018, delayChildren: delay } } }}
      >
        {letters.map((l) => (
          <motion.span
            key={l.i}
            style={{ display: 'inline-block', whiteSpace: l.ch === ' ' ? 'pre' : 'normal' }}
            variants={{
              hidden: { opacity: 0, x: l.fromX, y: l.fromY, rotate: l.rotate, filter: 'blur(5px)' },
              visible: { opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {l.ch}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}
