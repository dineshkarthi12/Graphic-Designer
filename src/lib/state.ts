import { createStore } from './store';

/** Loading progress shared by the loader and the 3D scene. */
export const loading = createStore({
  sceneProgress: 0,
  sceneReady: false,
  /** Set once every part of the current 3D world has mounted (they mount over several frames). */
  worldMounted: false,
  fontsReady: false,
  /** Set once the loader has wiped away and the hero can animate in. */
  revealed: false,
});

/** Mutable scroll data read by the 3D scene every frame (no React re-renders). */
export const scroll = {
  y: 0,
  /** Scroll position where each home section starts to drive the 3D scene. */
  anchors: [] as number[],
  /** Case study pages: page scroll progress in viewports. */
  viewport: 0,
};

export const route = createStore<{ kind: 'home' | 'case' | 'other'; accent: string; accent2: string }>({
  kind: 'home',
  accent: '#4F46E5',
  accent2: '#06B6D4',
});
