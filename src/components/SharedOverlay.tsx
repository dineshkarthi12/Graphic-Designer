import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { shared } from '../lib/sharedTransition';
import { useStore } from '../lib/useStore';

const ease = [0.76, 0, 0.24, 1] as const;

/** The flying image of the shared-element transition from a project card to its case study. */
export function SharedOverlay() {
  const s = useStore(shared);
  const ref = useRef<HTMLDivElement>(null);

  // Take off: grow from the card towards the top of the screen while the page changes.
  useEffect(() => {
    const el = ref.current;
    if (s.phase !== 'flying' || !el || !s.from) return;
    Object.assign(el.style, px(s.from), { borderRadius: '16px', opacity: '1' });
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const a = animate(
      el,
      { top: '0px', left: '0px', width: `${vw}px`, height: `${Math.round(vh * 0.72)}px`, borderRadius: '0px' },
      { duration: 0.9, ease },
    );
    return () => a.stop();
  }, [s.phase, s.from]);

  // Land exactly on the case-study hero image, then hand over to it.
  useEffect(() => {
    const el = ref.current;
    if (s.phase !== 'landing' || !el || !s.to) return;
    const a = animate(el, { ...px(s.to), borderRadius: '0px' }, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
    a.then(() => animate(el, { opacity: 0 }, { duration: 0.35, delay: 0.05 })).then(() =>
      shared.set({ phase: 'idle', from: null, to: null, slug: '', src: '' }),
    );
    return () => a.stop();
  }, [s.phase, s.to]);

  if (s.phase === 'idle') return null;
  return (
    <div ref={ref} className="shared-overlay" aria-hidden="true">
      <img src={s.src} alt="" />
    </div>
  );
}

const px = (r: { top: number; left: number; width: number; height: number }) => ({
  top: `${r.top}px`,
  left: `${r.left}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
});
