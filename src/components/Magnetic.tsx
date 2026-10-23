import { useRef, type ReactNode } from 'react';
import { useFinePointer, useReducedMotion } from '../lib/env';

/** Pulls its child towards the pointer while hovered. Desktop only. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !active) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = '';
    window.setTimeout(() => el && (el.style.transition = ''), 600);
  };

  return (
    <span ref={ref} className="magnetic" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  );
}
