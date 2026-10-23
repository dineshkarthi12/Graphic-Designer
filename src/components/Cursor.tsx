import { useEffect, useRef, useState } from 'react';
import { useFinePointer, useReducedMotion } from '../lib/env';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor]';

/** Dot + trailing ring. The ring grows over links and shows a label over [data-cursor="…"]. Desktop only. */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;
    let overHtml = false;
    let overGl = false;
    let htmlLabel = '';
    const sync = () => {
      setHover(overHtml || overGl);
      setLabel(htmlLabel || (overGl ? 'View' : ''));
    };

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        dot.current?.style.setProperty('opacity', '1');
        ring.current?.style.setProperty('opacity', '1');
      }
    };
    const over = (e: Event) => {
      const t = (e.target as Element).closest?.(INTERACTIVE);
      overHtml = !!t;
      htmlLabel = t?.getAttribute('data-cursor') || '';
      sync();
    };
    const out = () => {
      visible = false;
      dot.current?.style.setProperty('opacity', '0');
      ring.current?.style.setProperty('opacity', '0');
    };
    const loop = () => {
      const gl = document.documentElement.dataset.webglHover === 'true';
      if (gl !== overGl) {
        overGl = gl;
        sync();
      }
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', out);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', out);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div
        ref={ring}
        className={`cursor-ring${hover ? ' is-hover' : ''}${label ? ' has-label' : ''}`}
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
