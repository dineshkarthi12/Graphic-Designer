import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
  Color, LinearFilter, MathUtils, Mesh, NoColorSpace, PlaneGeometry, ShaderMaterial, SRGBColorSpace, Vector2, Vector3, Vector4,
} from 'three';
import { ATLAS, IMG, ISLANDS, PORTALS, VANISH, hero, heroView, PORTAL_CENTER } from './heroLayout';
import { smooth, story } from './timeline';

const URLS = ['/hero/bg.webp', '/hero/data.png', '/hero/islands.png'];
useTexture.preload(URLS);
const QUAD = new PlaneGeometry(2, 2);

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // A full-screen quad in clip space, drawn behind everything.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uBg;
  uniform sampler2D uData;
  uniform sampler2D uAtlas;
  uniform vec2 uView;
  uniform vec2 uImg;
  uniform vec2 uAtlasSize;
  uniform float uScale;
  uniform vec2 uAnchor;
  uniform vec2 uFocus;
  uniform vec2 uPar;
  uniform float uTime;
  uniform float uFade;
  uniform float uMobile;
  uniform vec3 uBgCol;
  uniform vec4 uIsl[${ISLANDS.length}];
  uniform vec3 uIslB[${ISLANDS.length}];
  uniform vec4 uPortal[${PORTALS.length}];
  uniform vec2 uVanish;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.03 + 17.1;
      a *= 0.5;
    }
    return v;
  }
  vec2 imgUv(vec2 p) { return clamp(p / uImg, 0.0, 1.0); }

  void main() {
    // Screen position in CSS pixels from the top-left, mapped into image pixels.
    vec2 sp = vec2(vUv.x, 1.0 - vUv.y) * uView;
    vec2 p0 = uFocus + (sp - uAnchor) / uScale;

    // 2.5D parallax: near layers (road, cliffs, portal frame) shift more than the sky.
    float depth = texture2D(uData, imgUv(p0)).r;
    vec2 p = p0 + uPar * (depth - 0.25);

    // Portal openings ripple like a heat haze.
    float inPortal = 0.0;
    for (int i = 0; i < ${PORTALS.length}; i++) {
      vec4 r = uPortal[i];
      vec2 q = smoothstep(r.xy, r.xy + 10.0, p) * (1.0 - smoothstep(r.zw - 10.0, r.zw, p));
      inPortal = max(inPortal, q.x * q.y);
    }
    p += inPortal * vec2(sin(p.y * 0.09 + uTime * 2.1), cos(p.x * 0.08 + uTime * 1.7)) * 0.9;

    // Clouds slowly boil: warp the image inside bright, unsaturated areas.
    vec3 c0 = texture2D(uBg, imgUv(p)).rgb;
    float lum = dot(c0, vec3(0.299, 0.587, 0.114));
    float sat = max(c0.r, max(c0.g, c0.b)) - min(c0.r, min(c0.g, c0.b));
    float cloud = smoothstep(0.5, 0.78, lum) * (1.0 - smoothstep(0.06, 0.22, sat)) * smoothstep(290.0, 420.0, p.y) * (1.0 - inPortal);
    vec2 flow = vec2(fbm(p * 0.011 + vec2(uTime * 0.07, 0.0)), fbm(p * 0.011 + vec2(4.7, uTime * 0.05))) - 0.5;
    vec2 pc = p + cloud * flow * 16.0;

    vec3 data = texture2D(uData, imgUv(pc)).rgb;
    vec3 col = texture2D(uBg, imgUv(pc)).rgb;

    // Waterfalls flow downwards.
    float streak = noise(vec2(pc.x * 0.45, pc.y * 0.05 - uTime * 2.6)) * 0.6 + noise(vec2(pc.x * 0.9, pc.y * 0.11 - uTime * 3.4)) * 0.4;
    col = mix(col, col * (0.78 + 0.5 * streak) + 0.03, data.b);

    // Light pulses run along the rails and portal frames towards the portal.
    float d = length((pc - uVanish) / uImg.y);
    float ph = fract(d * 3.2 + uTime * 0.42);
    float pulse = pow(smoothstep(0.72, 1.0, ph), 3.0);
    float breathe = 0.5 + 0.5 * sin(uTime * 1.4);
    col += data.g * vec3(1.0, 0.7, 0.42) * (0.05 + 0.08 * breathe + 0.6 * pulse);

    // Iridescent light sweeps across the portal openings.
    float sweep = smoothstep(0.07, 0.0, abs(fract((p.x - p.y) * 0.0016 + uTime * 0.09) - 0.5));
    col += inPortal * (vec3(0.55, 0.5, 1.0) * 0.14 * sweep + vec3(0.55, 0.8, 1.0) * 0.06 * fbm(p * 0.03 + uTime * 0.4));

    // Floating islands bob in the air, each at its own depth.
    for (int i = 0; i < ${ISLANDS.length}; i++) {
      vec4 r = uIsl[i];
      vec3 b = uIslB[i];
      vec2 bob = vec2(sin(uTime * 0.35 + b.z) * 1.5, sin(uTime * 0.6 + b.z) * 5.0);
      vec2 l = (p0 + uPar * (b.y - 0.25) - bob - r.xy) / r.zw;
      if (l.x > 0.0 && l.y > 0.0 && l.x < 1.0 && l.y < 1.0) {
        vec4 s = texture2D(uAtlas, vec2((b.x + l.x * r.z) / uAtlasSize.x, (l.y * r.w) / uAtlasSize.y));
        col = mix(col, s.rgb, s.a);
      }
    }

    // A thin sea of mist drifts across the cloud layer.
    float band = smoothstep(380.0, 520.0, p0.y) * (1.0 - smoothstep(700.0, 880.0, p0.y));
    float mist = fbm(sp * vec2(0.0024, 0.006) + vec2(uTime * 0.025, 0.0));
    col = mix(col, vec3(1.0), band * smoothstep(0.45, 0.85, mist) * 0.35);

    // Light mode: a soft white haze, stronger where the text sits, fading into the page at the bottom.
    vec2 s = sp / uView;
    float haze = 0.14;
    if (uMobile > 0.5) haze += 0.8 * smoothstep(0.4, 0.62, s.y);
    else haze += 0.7 * pow(1.0 - smoothstep(0.08, 0.66, s.x), 1.2);
    haze += 0.95 * smoothstep(0.78, 1.0, s.y);
    col = mix(col, uBgCol, clamp(haze, 0.0, 1.0));
    col = mix(uBgCol, col, uFade);

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

/**
 * The hero's sky world: one image, animated in a full-screen shader (parallax depth, boiling clouds,
 * bobbing islands, flowing waterfalls, light pulses, portal shimmer), washed light for the theme.
 * It fades out as the page scrolls past the hero.
 */
export function HeroBackdrop({ mobile }: { mobile: boolean }) {
  const [bg, data, atlas] = useTexture(URLS);
  const mesh = useRef<Mesh>(null);
  const size = useThree((s) => s.size);
  const par = useRef(new Vector2());

  const mat = useMemo(() => {
    for (const t of [bg, data, atlas]) {
      t.flipY = false;
      t.generateMipmaps = false;
      t.minFilter = LinearFilter;
      t.magFilter = LinearFilter;
      t.needsUpdate = true;
    }
    bg.colorSpace = SRGBColorSpace;
    atlas.colorSpace = SRGBColorSpace;
    data.colorSpace = NoColorSpace;
    return new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uBg: { value: bg },
        uData: { value: data },
        uAtlas: { value: atlas },
        uView: { value: new Vector2() },
        uImg: { value: new Vector2(IMG.w, IMG.h) },
        uAtlasSize: { value: new Vector2(ATLAS.w, ATLAS.h) },
        uScale: { value: 1 },
        uAnchor: { value: new Vector2() },
        uFocus: { value: new Vector2(PORTAL_CENTER.x, PORTAL_CENTER.y) },
        uPar: { value: new Vector2() },
        uTime: { value: 0 },
        uFade: { value: 1 },
        uMobile: { value: 0 },
        uBgCol: { value: new Color('#F5F5F7') },
        uIsl: { value: ISLANDS.map((i) => new Vector4(i.x, i.y, i.w, i.h)) },
        uIslB: { value: ISLANDS.map((i, k) => new Vector3(i.ax, i.depth, k * 1.7)) },
        uPortal: { value: PORTALS.map((r) => new Vector4(...r)) },
        uVanish: { value: new Vector2(VANISH.x, VANISH.y) },
      },
    });
  }, [bg, data, atlas]);

  useFrame((state, dt) => {
    const t = story.t;
    const fade = 1 - smooth(0.2, 0.85, t);
    hero.visible = fade;
    if (mesh.current) mesh.current.visible = fade > 0.002;
    // Scrolling out of the hero dollies into the portal.
    const zoom = 1 + 0.5 * smooth(0, 0.9, t);
    const view = heroView(size.width, size.height, mobile, zoom);
    hero.view = view;
    if (fade <= 0.002) return;
    const u = mat.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uFade.value = fade;
    u.uMobile.value = mobile ? 1 : 0;
    u.uView.value.set(size.width, size.height);
    u.uScale.value = view.scale;
    u.uAnchor.value.set(view.anchorX, view.anchorY);
    // Pointer and scroll parallax, in image pixels per unit of depth.
    const d = Math.min(dt, 0.1);
    par.current.x = MathUtils.damp(par.current.x, state.pointer.x * 34, 2.5, d);
    par.current.y = MathUtils.damp(par.current.y, -state.pointer.y * 20 + t * 70, 2.5, d);
    u.uPar.value.copy(par.current);
  });

  return <mesh ref={mesh} material={mat} frustumCulled={false} renderOrder={-1000} geometry={QUAD} />;
}
