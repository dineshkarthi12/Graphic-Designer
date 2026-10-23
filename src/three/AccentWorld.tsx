import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { Color, Group, MathUtils, Vector3 } from 'three';
import { Particles } from './Particles';
import { loading } from '../lib/state';

/**
 * Case-study pages: a small floating glass knot tinted with the project's colour, instead of
 * the full scene. It starts beside the title and drifts to the side as you read.
 */
export function AccentWorld({ accent, accent2, mobile, lite }: { accent: string; accent2: string; mobile: boolean; lite: boolean }) {
  const ref = useRef<Group>(null);
  const { camera, size } = useThree();
  const target = useMemo(() => new Vector3(), []);
  const palette = useMemo(() => [new Color(accent), new Color(accent2), new Color('#C4B5FD')], [accent, accent2]);
  const tint = useMemo(() => new Color(accent).lerp(new Color('#ffffff'), 0.55), [accent]);
  useEffect(() => {
    loading.set({ worldMounted: true });
    return () => loading.set({ worldMounted: false });
  }, []);

  useFrame((state, dt) => {
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
    const vh = window.innerHeight;
    const p = MathUtils.clamp(window.scrollY / (vh * 1.1), 0, 1);
    const e = p * p * (3 - 2 * p);
    // Screen position in normalised device coordinates.
    const nx = MathUtils.lerp(0.74, 0.86, e);
    const ny = MathUtils.lerp(-0.8, 0.05, e);
    target.set(nx, ny, 0.5).unproject(camera);
    const dir = target.sub(camera.position).normalize();
    const dist = (0 - camera.position.z) / dir.z;
    const world = camera.position.clone().add(dir.multiplyScalar(dist));
    if (ref.current) {
      ref.current.position.x = MathUtils.damp(ref.current.position.x, world.x, 4, dt);
      ref.current.position.y = MathUtils.damp(ref.current.position.y, world.y, 4, dt);
      const s = MathUtils.lerp(0.5, 0.4, e) * Math.min(1, size.width / 1100 + 0.35);
      ref.current.scale.setScalar(MathUtils.damp(ref.current.scale.x, s, 4, dt));
      ref.current.rotation.y = state.clock.elapsedTime * 0.3 + p * 2.5;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3 + p;
    }
  });

  // Phones have no free space beside the text, so the accent is a light drift of particles in the project's colours.
  if (mobile) {
    return <Particles shape="box" count={140} size={16} opacity={0.6} palette={palette} box={[6, 11, 3]} boxCenter={[0, 0, -1]} />;
  }

  return (
    <group ref={ref}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[0.62, 0.21, lite ? 120 : 220, lite ? 20 : 36]} />
          {lite ? (
            <meshPhysicalMaterial
              color={tint}
              roughness={0.1}
              clearcoat={1}
              iridescence={1}
              iridescenceIOR={1.3}
              metalness={0.1}
            />
          ) : (
            <MeshTransmissionMaterial
              samples={4}
              resolution={256}
              thickness={0.7}
              roughness={0.05}
              ior={1.35}
              chromaticAberration={0.06}
              distortion={0.2}
              distortionScale={0.3}
              iridescence={1}
              iridescenceIOR={1.3}
              iridescenceThicknessRange={[100, 600]}
              attenuationDistance={0.9}
              attenuationColor={accent}
              color={tint}
              background={new Color('#F5F5F7')}
            />
          )}
        </mesh>
        <mesh scale={0.28}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      </Float>
      <Particles count={320} size={18} opacity={0.7} palette={palette} />
    </group>
  );
}
