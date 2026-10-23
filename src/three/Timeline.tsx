import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import { CatmullRomCurve3, Color, Group, MathUtils, Mesh, ShaderMaterial, TubeGeometry, Vector3 } from 'three';
import { education, experience } from '../data/content';
import { TIMELINE_TOP, story } from './timeline';

const FONT = '/fonts/space-grotesk-500.woff';
const LENGTH = 11;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragment = /* glsl */ `
  uniform float uProg;
  uniform vec3 uA;
  uniform vec3 uB;
  varying vec2 vUv;
  void main() {
    float lit = smoothstep(uProg + 0.004, uProg - 0.004, vUv.x);
    vec3 grad = mix(uA, uB, vUv.x);
    vec3 base = vec3(0.78, 0.78, 0.84);
    float head = smoothstep(0.035, 0.0, abs(vUv.x - uProg));
    vec3 col = mix(base, grad, lit) + head * 0.6;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

/** Experience as a glowing path the camera follows; each milestone lights up as you pass it. */
export function Timeline() {
  const root = useRef<Group>(null);
  const markers = useRef<(Mesh | null)[]>([]);
  const halos = useRef<(Mesh | null)[]>([]);

  const { curve, geo, stops } = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const f = i / 12;
      pts.push(new Vector3(2.05 + Math.sin(f * Math.PI * 2.2) * 0.45, TIMELINE_TOP + 0.8 - f * LENGTH, -0.4 + Math.cos(f * Math.PI * 1.6) * 0.5));
    }
    const curve = new CatmullRomCurve3(pts);
    const geo = new TubeGeometry(curve, 320, 0.022, 10, false);
    const items = [
      ...experience.map((r) => ({ title: r.company, period: r.period })),
      { title: education.degree, period: education.period },
    ];
    const stops = items.map((it, i) => ({ ...it, u: 0.12 + i * 0.34 }));
    return { curve, geo, stops };
  }, []);

  const mat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: { uProg: { value: 0 }, uA: { value: new Color('#4F46E5') }, uB: { value: new Color('#06B6D4') } },
      }),
    [],
  );
  const lit = useMemo(() => new Color('#4F46E5'), []);
  const dim = useMemo(() => new Color('#C9C9D3'), []);

  useFrame((_, dt) => {
    const t = story.t;
    if (root.current) root.current.visible = t > 3.55 && t < 5.2;
    const prog = MathUtils.clamp((t - 3.9) / 0.95, 0, 1);
    mat.uniforms.uProg.value = MathUtils.damp(mat.uniforms.uProg.value, prog, 5, dt);
    stops.forEach((s, i) => {
      const on = mat.uniforms.uProg.value >= s.u - 0.01 ? 1 : 0;
      const m = markers.current[i];
      if (m) {
        const target = 1 + on * 0.35;
        m.scale.setScalar(MathUtils.damp(m.scale.x, target, 6, dt));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (m.material as any).color.lerpColors(dim, lit, MathUtils.damp(m.userData.k ?? 0, on, 5, dt));
        m.userData.k = MathUtils.damp(m.userData.k ?? 0, on, 5, dt);
      }
      const h = halos.current[i];
      if (h) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (h.material as any).opacity = (m?.userData.k ?? 0) * 0.35;
        h.scale.setScalar(1 + Math.sin(performance.now() / 500 + i) * 0.08);
      }
    });
  });

  return (
    <group ref={root}>
      <mesh geometry={geo} material={mat} />
      {stops.map((s, i) => {
        const p = curve.getPointAt(s.u);
        return (
          <group key={s.title} position={p}>
            <mesh ref={(el) => (markers.current[i] = el)}>
              <sphereGeometry args={[0.075, 32, 32]} />
              <meshBasicMaterial color="#C9C9D3" toneMapped={false} />
            </mesh>
            <Billboard>
              <mesh ref={(el) => (halos.current[i] = el)}>
                <ringGeometry args={[0.11, 0.2, 48]} />
                <meshBasicMaterial color="#6366F1" transparent opacity={0} depthWrite={false} />
              </mesh>
              <Text font={FONT} fontSize={0.135} color="#0B0B12" anchorX="left" anchorY="bottom" position={[0.28, 0.01, 0]} letterSpacing={-0.02}>
                {s.title}
              </Text>
              <Text font={FONT} fontSize={0.095} color="#5A5A6C" anchorX="left" anchorY="top" position={[0.28, -0.03, 0]}>
                {s.period}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}
