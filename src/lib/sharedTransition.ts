import { createStore } from './store';

export type Rect = { top: number; left: number; width: number; height: number };

/**
 * Shared-element transition from a project card image to the case-study hero.
 * The card hands over its image and position; the case-study hero reports where it
 * landed; the overlay flies between the two.
 */
export const shared = createStore<{
  phase: 'idle' | 'flying' | 'landing';
  slug: string;
  src: string;
  from: Rect | null;
  to: Rect | null;
}>({ phase: 'idle', slug: '', src: '', from: null, to: null });

export const rectOf = (el: Element): Rect => {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
};
