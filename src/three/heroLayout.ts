import layout from './heroLayout.json';

/** Size of the hero source image (design/hero/source.png) in pixels. All coordinates below use it. */
export const IMG = { w: layout.width, h: layout.height };
export const ISLANDS = layout.islands;
export const ATLAS = layout.atlas;

/** Centre of the main portal's opening: the glass core floats here. */
export const PORTAL_CENTER = { x: 820, y: 375 };
/** Height of the main portal's opening. */
export const PORTAL_INNER_H = 430;
/** Where the road disappears into the portal: light pulses travel towards it. */
export const VANISH = { x: 815, y: 560 };

/** Portal openings that shimmer: x0, y0, x1, y1. */
export const PORTALS: [number, number, number, number][] = [
  [655, 160, 985, 590],
  [765, 425, 880, 560],
  [1180, 440, 1252, 580],
];

/**
 * Where the portal centre sits on screen, as fractions from the top-left.
 * Desktop: to the right of the headline. Phones: near the top, above the text.
 */
const ANCHOR_DESKTOP = { x: 0.68, y: 0.47 };
const ANCHOR_MOBILE = { x: 0.5, y: 0.27 };

export type HeroView = {
  /** Screen pixels per image pixel. */
  scale: number;
  /** Screen anchor in pixels from the top-left. */
  anchorX: number;
  anchorY: number;
  /** Anchor in normalised device coordinates (−1…1, y up). */
  ndcX: number;
  ndcY: number;
  /** Portal opening height as a fraction of the viewport height. */
  portalFrac: number;
};

/**
 * Fit the image so it always covers the screen while keeping the portal at its anchor.
 * `zoom` > 1 dollies into the portal (used while scrolling out of the hero).
 */
export function heroView(width: number, height: number, mobile: boolean, zoom = 1): HeroView {
  const a = mobile ? ANCHOR_MOBILE : ANCHOR_DESKTOP;
  const f = PORTAL_CENTER;
  const need = Math.max(
    (a.x * width) / f.x,
    ((1 - a.x) * width) / (IMG.w - f.x),
    (a.y * height) / f.y,
    ((1 - a.y) * height) / (IMG.h - f.y),
  );
  // Headroom so mouse and scroll parallax never reveal an edge.
  const scale = need * 1.07 * zoom;
  return {
    scale,
    anchorX: a.x * width,
    anchorY: a.y * height,
    ndcX: a.x * 2 - 1,
    ndcY: 1 - a.y * 2,
    portalFrac: (PORTAL_INNER_H * scale) / height,
  };
}

/** Live hero state shared between the backdrop shader and the core (written every frame). */
export const hero = { view: heroView(1440, 900, false), visible: 1 };
