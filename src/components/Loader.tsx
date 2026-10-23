import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { loading } from '../lib/state';
import { useStore } from '../lib/useStore';
import { lockScroll } from '../lib/smoothScroll';

const MIN_MS = 1500;
const MAX_MS = 8000;

/**
 * White screen with a 0→100 counter and "DK" drawn as a single line. The counter follows
 * real progress: fonts, plus the 3D scene's textures (drei useProgress) when WebGL is on.
 */
export function Loader({ waitForScene, quick }: { waitForScene: boolean; quick: boolean }) {
  const state = useStore(loading);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const start = useRef(performance.now());
  const target = useRef(0);

  useEffect(() => {
    document.fonts?.ready.then(() => loading.set({ fontsReady: true }));
    lockScroll(true);
  }, []);

  const fonts = state.fontsReady ? 1 : 0;
  const scene = waitForScene ? (state.sceneReady ? 1 : state.sceneProgress / 100) : 1;
  target.current = Math.round((fonts * 0.25 + scene * 0.75) * 100);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const elapsed = performance.now() - start.current;
      const timeCap = quick ? 100 : Math.min(100, (elapsed / MIN_MS) * 100);
      const goal = elapsed > MAX_MS ? 100 : Math.min(target.current, timeCap);
      setShown((s) => {
        const next = s + Math.max(0.6, (goal - s) * 0.12);
        return Math.min(goal, next);
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [quick]);

  useEffect(() => {
    if (shown >= 100 && !done) {
      const t = window.setTimeout(() => setDone(true), quick ? 50 : 250);
      return () => window.clearTimeout(t);
    }
  }, [shown, done, quick]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        lockScroll(false);
        loading.set({ revealed: true });
      }}
    >
      {!done && (
        <motion.div
          className="loader"
          role="status"
          aria-live="polite"
          aria-label={`Loading, ${Math.floor(shown)} percent`}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: quick ? 0.35 : 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg className="loader-mark" viewBox="0 0 220 120" aria-hidden="true">
            <defs>
              <linearGradient id="dk-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#4F46E5" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            {/* "DK" drawn as one continuous line: the D first, then the K. */}
            <motion.path
              d="M20 12 V108 H52 C86 108 104 86 104 60 C104 34 86 12 52 12 H20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.max(0.02, Math.min(1, shown / 55)) }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
            <motion.path
              d="M130 12 V108 M198 12 L130 70 M150 52 L202 108"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.max(0, Math.min(1, (shown - 50) / 50)) }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
          </svg>
          <span className="loader-label">Dinesh Kumar · AI/ML Engineer</span>
          <span className="loader-count" aria-hidden="true">
            {String(Math.floor(shown)).padStart(3, '0')}
          </span>
          <motion.span className="loader-bar" style={{ scaleX: shown / 100 }} aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
