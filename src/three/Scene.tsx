import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Lightformer, PerformanceMonitor, useProgress } from '@react-three/drei';
import { loading, route } from '../lib/state';
import { useStore } from '../lib/useStore';
import { useIsMobile } from '../lib/env';
import { HomeWorld } from './HomeWorld';
import { AccentWorld } from './AccentWorld';
import { Effects } from './Effects';

/** Studio lighting built from light formers: no HDRI download needed. */
export function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#DCDCE6']} />
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
        <Lightformer form="ring" color="#C4B5FD" intensity={3} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={4} />
        <Lightformer form="rect" color="#FDBA9A" intensity={2.2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 10, 1]} />
        <Lightformer form="rect" color="#A5F3FC" intensity={2.2} position={[0, 0, -10]} scale={[10, 3, 1]} />
        <Lightformer form="rect" color="#FFFFFF" intensity={1.5} position={[0, -4, 6]} scale={[12, 2, 1]} />
      </group>
    </Environment>
  );
}

/** Reports texture/font loading to the HTML loader, and readiness after the first rendered frames. */
function Progress() {
  // Subscribe outside React rendering, so loading updates never re-render another component mid-render.
  useEffect(
    () =>
      useProgress.subscribe(({ progress, active }) => {
        loading.set({ sceneProgress: active ? progress : Math.max(loading.get().sceneProgress, 90) });
      }),
    [],
  );
  return null;
}

function Ready() {
  const frames = useRef(0);
  useFrame(() => {
    if (!loading.get().worldMounted) return;
    frames.current++;
    if (frames.current === 3) loading.set({ sceneReady: true, sceneProgress: 100 });
  });
  return null;
}

export default function Scene() {
  const r = useStore(route);
  const { worldMounted } = useStore(loading);
  const mobile = useIsMobile();
  const [visible, setVisible] = useState(!document.hidden);
  const [quality, setQuality] = useState<'high' | 'low'>('high');

  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);

  const lite = mobile || quality === 'low';

  return (
    <Canvas
      className="webgl"
      aria-hidden="true"
      dpr={[1, mobile ? 1.5 : 1.75]}
      flat
      frameloop={visible ? 'always' : 'never'}
      gl={{ antialias: mobile, powerPreference: 'high-performance', alpha: false, stencil: false }}
      camera={{ fov: 35, near: 0.1, far: 120, position: [0, 0, 7.6] }}
      eventSource={document.getElementById('root') ?? undefined}
      eventPrefix="client"
    >
      <color attach="background" args={['#F5F5F7']} />
      <Studio />
      <Progress />
      <PerformanceMonitor onDecline={() => setQuality('low')} onIncline={() => setQuality('high')} flipflops={3} />
      <AdaptiveDpr pixelated={false} />
      <Suspense fallback={null}>
        {r.kind === 'home' ? (
          <HomeWorld mobile={mobile} lite={lite} />
        ) : (
          <AccentWorld accent={r.accent} accent2={r.accent2} mobile={mobile} lite={lite} />
        )}
        <Ready />
      </Suspense>
      {!mobile && worldMounted && <Effects dof={quality === 'high' && r.kind === 'home'} />}
    </Canvas>
  );
}
