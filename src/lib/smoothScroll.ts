import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scroll } from './state';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Start Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll(enabled: boolean) {
  const onScroll = () => {
    scroll.y = window.scrollY;
  };
  if (!enabled) {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on('scroll', () => {
    onScroll();
    ScrollTrigger.update();
  });
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

const NAV_OFFSET = 0;

/** Scroll to an element, an id ("#work") or a position, smoothly when Lenis is running. */
export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target as never, { offset: NAV_OFFSET, immediate, force: true, duration: immediate ? 0 : 1.4 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
