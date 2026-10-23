import { useEffect, useState } from 'react';

const query = () => new URLSearchParams(window.location.search);

/** True when the browser can create a WebGL context. `?nowebgl` forces the fallback for testing. */
export function detectWebGL(): boolean {
  if (query().has('nowebgl')) return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export const WEBGL = typeof window !== 'undefined' && detectWebGL();

function useMedia(q: string, initial = false) {
  const [match, setMatch] = useState(() => (typeof window === 'undefined' ? initial : window.matchMedia(q).matches));
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [q]);
  return match;
}

export const prefersReducedMotion = () =>
  query().has('reducedmotion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReducedMotion() {
  const media = useMedia('(prefers-reduced-motion: reduce)');
  return media || query().has('reducedmotion');
}

export const useIsMobile = () => useMedia('(max-width: 767px)');
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)');
