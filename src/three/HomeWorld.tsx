import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, DoubleSide, Group, MathUtils, Mesh, ShaderMaterial, Vector3 } from 'three';
import { loading } from '../lib/state';
import { Core } from './Core';
import { Particles } from './Particles';
import { Network } from './Network';
import { Gallery } from './Gallery';
import { Timeline } from './Timeline';
import { CORE_A, CORE_C, CORE_S, RING_R, band, desktopPath, mobilePath, sceneT, smooth, story } from './timeline';

/** Small glass spheres orbiting the core. */
function Orbiters() {
  const ref = useRef<Group>(null);
  const items = useMemo(
    () => [
      { r: 1.75, s: 0.16, speed: 0.32, tilt: 0.5, phase: 0, color: '#C4B5FD' },
      { r: 2.1, s: 0.11, speed: -0.24, tilt: -0.7, phase: 2, color: '#A5F3FC' },
      { r: 1.95, s: 0.09, speed: 0.42, tilt: 1.1, phase: 4, color: '#FDBA9A' },
      { r: 2.45, s: 0.13, speed: -0.18, tilt: 0.2, phase: 1, color: '#DDD6FE' },
      { r: 2.3, s: 0.07, speed: 0.36, tilt: -1.2, phase: 5, color: '#F0ABFC' },
    ],
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current?.children.forEach((m, i) => {
      const it = items[i];
      const a = t * it.speed + it.phase;
      m.position.set(Math.cos(a) * it.r, Math.sin(a) * it.r * Math.sin(it.tilt) * 0.6, Math.sin(a) * it.r * Math.cos(it.tilt));
    });
  });
  return (
    <group ref={ref}>
      {items.map((it, i) => (
        <mesh key={i} scale={it.s}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color={it.color}
            roughness={0.05}
            transmission={1}
            thickness={0.6}
            ior={1.4}
            iridescence={1}
            iridescenceIOR={1.3}
            clearcoat={1}
          />
        </mesh>
      ))}
    </group>
  );
}

/** The calm ring of light that frames the core in the Contact section. */
function LightRing() {
  const ref = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uA: { value: new Color('#4F46E5') }, uB: { value: new Color('#06B6D4') } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          varying vec3 vPos;
          void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform float uOpacity; uniform vec3 uA; uniform vec3 uB;
          varying vec2 vUv; varying vec3 vPos;
          void main() {
            float ang = atan(vPos.y, vPos.x);
            float f = 0.5 + 0.5 * sin(ang * 2.0 + uTime * 0.6);
            float r = length(vPos.xy);
            float glow = exp(-pow((r - ${RING_R.toFixed(2)}) * 7.0, 2.0));
            vec3 col = mix(uA, uB, f);
            gl_FragColor = vec4(col, glow * 0.5 * uOpacity);
            #include <colorspace_fragment>
          }
        `,
      }),
    [],
  );
  useFrame((state) => {
    const t = story.t;
    const o = t > 3 ? smooth(4.45, 4.95, t) : 0;
    mat.uniforms.uOpacity.value = o;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.visible = o > 0.01;
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ref.current.material as any).opacity = o;
    }
    if (halo.current) halo.current.visible = o > 0.01;
  });
  return (
    <group>
      <mesh ref={ref}>
        <torusGeometry args={[RING_R, 0.008, 12, 256]} />
        <meshBasicMaterial color="#6366F1" transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh ref={halo} material={mat}>
        <ringGeometry args={[RING_R - 0.55, RING_R + 0.55, 128, 1]} />
      </mesh>
    </group>
  );
}

/** Everything that travels with the core: glass core, halo, orbiters, nodes and the light ring. */
function CoreRig({ mobile, lite }: { mobile: boolean; lite: boolean }) {
  const ref = useRef<Group>(null);
  const scaled = useRef<Group>(null);
  const tilt = useRef<Group>(null);
  const halo = useRef(1);

  useFrame((state, dt) => {
    const t = story.t;
    if (!ref.current || !tilt.current || !scaled.current) return;
    if (mobile) {
      // After the hero, the core tucks into the top-right corner so it never sits behind body text.
      const k = smooth(0.15, 0.8, t);
      ref.current.position.set(MathUtils.lerp(0, 1.25, k), MathUtils.lerp(1.25, 2.15, k), 0);
      scaled.current.scale.setScalar(MathUtils.lerp(0.9, 0.38, k));
    } else {
      if (t < 3.6) ref.current.position.lerpVectors(CORE_A, CORE_S, band(t, 1.3, 1.9, 2.6, 3.0));
      else ref.current.position.copy(CORE_C);
      let s: number;
      if (t < 1) s = MathUtils.lerp(1, 0.42, smooth(0.2, 0.9, t));
      else if (t < 2) s = MathUtils.lerp(0.42, 0.8, smooth(1.3, 1.9, t));
      else if (t < 3.6) s = MathUtils.lerp(0.8, 0, smooth(2.5, 2.9, t));
      else s = MathUtils.lerp(0, 0.62, smooth(4.35, 4.9, t));
      scaled.current.scale.setScalar(Math.max(s, 0.0001));
      scaled.current.visible = s > 0.002;
    }
    halo.current = mobile ? 1 : 1 - 0.65 * band(t, 0.2, 0.8, 1.3, 1.9);
    // Mouse parallax tilt.
    tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, state.pointer.x * 0.35, 3, dt);
    tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, -state.pointer.y * 0.25, 3, dt);
  });

  return (
    <group ref={ref}>
      <group ref={scaled}>
        <group ref={tilt}>
          <Core lite={lite || mobile} />
          <Particles count={mobile ? 700 : 1500} size={mobile ? 22 : 26} opacity={0.75} fade={() => halo.current} />
          {!mobile && <Orbiters />}
        </group>
      </group>
      {!mobile && (
        <Suspense fallback={null}>
          <DelayedNetwork />
        </Suspense>
      )}
      {!mobile && <LightRing />}
    </group>
  );
}

function DelayedNetwork() {
  const [on, setOn] = useState(false);
  useFrame(() => {
    if (!on) setOn(true);
  });
  return on ? <Network /> : null;
}

const tmpP = new Vector3();
const tmpL = new Vector3();

/** Scroll drives the camera along a spline through the storyboard; the pointer adds a little parallax. */
function CameraRig({ mobile }: { mobile: boolean }) {
  const look = useRef(new Vector3());
  const par = useRef({ x: 0, y: 0 });
  useFrame((state, dt) => {
    const d = Math.min(dt, 0.25);
    story.mobile = mobile;
    story.t = MathUtils.damp(story.t, sceneT(), 3.2, d);
    const path = mobile ? mobilePath : desktopPath;
    const u = path.u(story.t);
    path.pos.getPoint(u, tmpP);
    path.look.getPoint(u, tmpL);
    par.current.x = MathUtils.damp(par.current.x, state.pointer.x, 2, d);
    par.current.y = MathUtils.damp(par.current.y, state.pointer.y, 2, d);
    const cam = state.camera;
    cam.position.set(tmpP.x + par.current.x * 0.25, tmpP.y + par.current.y * 0.15, tmpP.z);
    look.current.copy(tmpL);
    cam.lookAt(look.current);
  }, -1);
  return null;
}

/**
 * Mount the world one part per frame, so shader compilation is spread over several
 * short tasks instead of one long one that blocks the main thread.
 */
export function useStaged(stages: number) {
  const [stage, setStage] = useState(0);
  useFrame(() => {
    if (stage < stages) setStage((s) => s + 1);
  });
  useEffect(() => {
    if (stage >= stages) loading.set({ worldMounted: true });
  }, [stage, stages]);
  useEffect(() => () => loading.set({ worldMounted: false }), []);
  return stage;
}

export function HomeWorld({ mobile, lite }: { mobile: boolean; lite: boolean }) {
  const stage = useStaged(mobile ? 2 : 5);
  return (
    <>
      <CameraRig mobile={mobile} />
      {stage >= 1 && <CoreRig mobile={mobile} lite={lite} />}
      {!mobile && stage >= 3 && (
        <Suspense fallback={null}>
          <Gallery />
        </Suspense>
      )}
      {!mobile && stage >= 4 && (
        <Suspense fallback={null}>
          <Timeline />
        </Suspense>
      )}
      <Particles
        shape="box"
        count={mobile ? 220 : 650}
        size={14}
        opacity={0.55}
        box={mobile ? [10, 14, 6] : [14, 56, 9]}
        boxCenter={mobile ? [0, 0, -2] : [1, -20, -2.5]}
      />
    </>
  );
}
