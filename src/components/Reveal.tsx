import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  as = 'div',
  ...rest
}: { children: ReactNode; delay?: number; y?: number; as?: 'div' | 'li' | 'section' | 'article' } & HTMLMotionProps<'div'>) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Headline that slides up word by word from behind a mask. */
export function RevealText({
  text,
  className,
  id,
  as = 'h2',
}: {
  text: string;
  className?: string;
  id?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) {
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(' ');
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.05 }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 0.85, ease } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
