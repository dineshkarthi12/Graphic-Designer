import { CatmullRomCurve3, MathUtils, Vector3 } from 'three';
import { scroll } from '../lib/state';

/**
 * The home storyboard as one number, t:
 *   0 hero · 1 about · 2 skills · 3 projects · 4 experience · 5 contact
 * t = i when section i starts (its top reaches 30% of the viewport), with linear progress in between.
 */
export function sceneT(): number {
  const a = scroll.anchors;
  if (a.length < 2) return 0;
  const y = scroll.y;
  for (let i = a.length - 1; i >= 0; i--) {
    if (y >= a[i]) {
      if (i === a.length - 1) return i;
      const span = Math.max(1, a[i + 1] - a[i]);
      return i + Math.min(1, (y - a[i]) / span);
    }
  }
  return 0;
}

/** Shared, per-frame storyboard state (written by the camera rig, read by everything else). */
export const story = { t: 0, mobile: false };

export const smooth = (a: number, b: number, x: number) => MathUtils.smoothstep(x, a, b);
/** 0 → 1 between a and b, back to 0 between c and d. */
export const band = (x: number, a: number, b: number, c: number, d: number) => smooth(a, b, x) * (1 - smooth(c, d, x));

/** World anchors (desktop). The core lives at A for hero→skills and at C for contact. */
export const CORE_A = new Vector3(1.75, 0.05, 0);
export const CORE_S = new Vector3(2.55, 0.05, 0);
export const CORE_C = new Vector3(2.45, -42, 0);
/** Radius of the contact "ring of light". */
export const RING_R = 1.55;
export const GALLERY_TOP = -8;
export const GALLERY_STEP = 3.4;
export const TIMELINE_TOP = -26.5;

type Key = { t: number; pos: [number, number, number]; look: [number, number, number] };

const DESKTOP_KEYS: Key[] = [
  { t: 0, pos: [0.15, 0.1, 7.6], look: [0.15, 0.0, 0] },
  { t: 1, pos: [0.85, 0.15, 4.7], look: [1.15, 0.0, 0] },
  { t: 2, pos: [0.2, 1.4, 8.6], look: [0.75, -0.1, 0] },
  { t: 3, pos: [0.35, GALLERY_TOP + 0.2, 6.2], look: [1.1, GALLERY_TOP, 0] },
  { t: 3.8, pos: [0.35, GALLERY_TOP - GALLERY_STEP * 4 + 0.2, 6.2], look: [1.1, GALLERY_TOP - GALLERY_STEP * 4, 0] },
  { t: 4, pos: [0.3, TIMELINE_TOP + 0.4, 7.4], look: [1.0, TIMELINE_TOP - 0.6, 0] },
  { t: 4.8, pos: [0.3, TIMELINE_TOP - 9.6, 7.4], look: [1.0, TIMELINE_TOP - 10.4, 0] },
  { t: 5, pos: [0.2, CORE_C.y + 0.1, 8.2], look: [0.55, CORE_C.y, 0] },
];

// Mobile: one gentle move around the core; the core drifts behind the text.
const MOBILE_KEYS: Key[] = [
  { t: 0, pos: [0, -0.4, 8.6], look: [0, -0.2, 0] },
  { t: 2, pos: [0.6, 0.0, 9.4], look: [0.2, 0.0, 0] },
  { t: 5, pos: [-0.4, 0.4, 9.0], look: [0, 0.2, 0] },
];

function build(keys: Key[]) {
  const pos = new CatmullRomCurve3(keys.map((k) => new Vector3(...k.pos)), false, 'centripetal');
  const look = new CatmullRomCurve3(keys.map((k) => new Vector3(...k.look)), false, 'centripetal');
  const n = keys.length - 1;
  /** Map storyboard t to the curves' parameter so key i is hit exactly at keys[i].t. */
  const u = (t: number) => {
    if (t <= keys[0].t) return 0;
    for (let i = 0; i < n; i++) {
      if (t <= keys[i + 1].t) {
        const f = (t - keys[i].t) / (keys[i + 1].t - keys[i].t);
        return (i + f) / n;
      }
    }
    return 1;
  };
  return { pos, look, u };
}

export const desktopPath = build(DESKTOP_KEYS);
export const mobilePath = build(MOBILE_KEYS);
