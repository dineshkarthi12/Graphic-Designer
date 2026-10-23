import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '../lib/env';

const PATTERN = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/** Counts the number inside a display value ("+65%", "−40%", "4.8/5", "2,850") up from zero when it scrolls into view. */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const m = value.match(PATTERN);
  const [text, setText] = useState(() => (m && !reduced ? format(m, 0) : value));

  useEffect(() => {
    if (!m || reduced || !inView) {
      if (!m || reduced) setText(value);
      return;
    }
    const target = parseFloat(m[2].replace(/,/g, ''));
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(format(m, v)),
      onComplete: () => setText(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

function format(m: RegExpMatchArray, v: number) {
  const raw = m[2];
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  let n = v.toFixed(decimals);
  if (raw.includes(',')) n = Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals });
  return `${m[1]}${n}${m[3]}`;
}
