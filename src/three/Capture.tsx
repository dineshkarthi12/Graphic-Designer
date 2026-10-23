import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { Core } from './Core';
import { Particles } from './Particles';
import { person } from '../data/content';
import { Suspense } from 'react';
import { HomeWorld } from './HomeWorld';
import { Studio } from './Scene';

/**
 * Dev-only pages used to render static assets with Playwright:
 *   /__capture/core  transparent render of the core (no-WebGL / reduced-motion hero image)
 *   /__capture/og    1200×630 Open Graph image
 *   /__capture/hero  the animated hero at rest, at the current viewport size (still fallback)
 */
export default function Capture() {
  const { pathname } = useLocation();
  if (pathname.endsWith('/hero')) {
    const mobile = window.innerWidth < 768;
    return (
      <div id="capture" style={{ position: 'fixed', inset: 0 }}>
        <Canvas flat dpr={2} gl={{ preserveDrawingBuffer: true }} camera={{ fov: 35, near: 0.1, far: 120, position: [0, 0, 7.6] }}>
          <color attach="background" args={['#F5F5F7']} />
          <Studio />
          <Suspense fallback={null}>
            <HomeWorld mobile={mobile} lite={mobile} />
          </Suspense>
        </Canvas>
      </div>
    );
  }
  const og = pathname.endsWith('/og');
  const scene = (
    <Canvas
      flat
      dpr={og ? 2 : 1}
      gl={{ alpha: true, preserveDrawingBuffer: true, antialias: true }}
      camera={{ fov: 35, position: [0, 0, 7.2] }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#DCDCE6']} />
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="ring" color="#C4B5FD" intensity={3} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={4} />
          <Lightformer form="rect" color="#FDBA9A" intensity={2.2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 10, 1]} />
          <Lightformer form="rect" color="#A5F3FC" intensity={2.2} position={[0, 0, -10]} scale={[10, 3, 1]} />
        </group>
      </Environment>
      <group scale={og ? 1.15 : 1.2}>
        <Core />
        <Particles count={1500} opacity={0.75} />
      </group>
    </Canvas>
  );

  if (!og) {
    return (
      <div id="capture" style={{ width: 1200, height: 1200, background: 'transparent' }}>
        {scene}
      </div>
    );
  }
  return (
    <div
      id="capture"
      style={{
        width: 1200,
        height: 630,
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(1200px 600px at 80% 40%, #ECEAFE 0%, #F5F5F7 55%)',
        fontFamily: 'var(--font-display)',
      }}
    >
      <div style={{ position: 'absolute', right: -90, top: -60, width: 760, height: 760 }}>{scene}</div>
      <div style={{ position: 'absolute', left: 72, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="logo-mark" style={{ width: 52, height: 52, fontSize: 20, borderRadius: 15 }}>
            {person.initials}
          </span>
          <span style={{ fontSize: 22, fontWeight: 600, color: '#5A5A6C', letterSpacing: '0.02em' }}>Portfolio</span>
        </div>
        <h1 style={{ fontSize: 112, lineHeight: 0.9, letterSpacing: '-0.055em', marginTop: 34 }}>
          Dinesh
          <br />
          Kumar
        </h1>
        <p style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28, fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em' }}>
          <span style={{ width: 56, height: 4, borderRadius: 4, background: 'linear-gradient(100deg,#4F46E5,#06B6D4)' }} />
          <span className="grad-text">{person.role}</span>
        </p>
        <p style={{ marginTop: 18, fontSize: 21, color: '#2E2E3C', fontFamily: 'var(--font-body)', maxWidth: 520, lineHeight: 1.45 }}>
          ML models and LLM-powered features for HR-tech, recruitment, fintech and healthcare.
        </p>
      </div>
    </div>
  );
}
