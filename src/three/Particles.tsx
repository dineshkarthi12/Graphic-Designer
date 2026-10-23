import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, NormalBlending, Points, ShaderMaterial } from 'three';

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.6 + position.x * 2.0) * 0.04;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
    vColor = aColor;
    vAlpha = 0.55 + 0.45 * sin(uTime * 1.3 + position.z * 5.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

const PALETTE = ['#4F46E5', '#06B6D4', '#8B5CF6', '#C4B5FD', '#F0ABFC', '#FDBA9A'].map((c) => new Color(c));

/**
 * Fine particle halo around the core (shell) or a sparse dust field through the whole
 * scene (box). Soft round points in indigo, cyan and pastel tints.
 */
export function Particles({
  count = 1600,
  shape = 'shell',
  size = 26,
  opacity = 0.8,
  box = [12, 50, 8],
  boxCenter = [0, -20, -2],
  palette = PALETTE,
  fade,
}: {
  count?: number;
  shape?: 'shell' | 'box';
  size?: number;
  opacity?: number;
  box?: [number, number, number];
  boxCenter?: [number, number, number];
  palette?: Color[];
  /** Optional per-frame opacity multiplier (0–1). */
  fade?: () => number;
}) {
  const ref = useRef<Points>(null);
  const { positions, scales, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      if (shape === 'shell') {
        const r = 1.55 + Math.pow(Math.random(), 1.6) * 2.2;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
        positions[i * 3 + 1] = r * Math.cos(ph) * 0.8;
        positions[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      } else {
        positions[i * 3] = boxCenter[0] + (Math.random() - 0.5) * box[0];
        positions[i * 3 + 1] = boxCenter[1] + (Math.random() - 0.5) * box[1];
        positions[i * 3 + 2] = boxCenter[2] + (Math.random() - 0.5) * box[2];
      }
      scales[i] = 0.35 + Math.random() * 0.9;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, scales, colors };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, shape]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: size },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
          uOpacity: { value: opacity },
        },
      }),
    [shape, size, opacity],
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    const f = fade ? fade() : 1;
    material.uniforms.uOpacity.value = opacity * f;
    if (ref.current) ref.current.visible = f > 0.01;
    if (ref.current && shape === 'shell') ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref} material={material} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
    </points>
  );
}
