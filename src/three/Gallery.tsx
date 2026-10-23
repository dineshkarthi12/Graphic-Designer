import { useMemo, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import { Color, Group, MathUtils, PlaneGeometry, ShaderMaterial, SRGBColorSpace, type Texture } from 'three';
import { projects, type Project } from '../data/content';
import { GALLERY_STEP, GALLERY_TOP, story } from './timeline';

const W = 2.35;
const H = W * (9 / 16);
const FONT = '/fonts/space-grotesk-500.woff';

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform float uCurve;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z -= uCurve * p.x * p.x;
    p.z += sin(p.x * 3.2 + uTime * 2.2) * 0.07 * uHover + sin(p.y * 4.0 + uTime * 1.7) * 0.05 * uHover;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uHover;
  uniform vec3 uAccent;
  uniform vec2 uSize;
  varying vec2 vUv;
  float sdRound(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    vec2 uv = (vUv - 0.5) * (1.0 - 0.05 * uHover) + 0.5;
    uv.x += sin(uv.y * 10.0) * 0.004 * uHover;
    vec4 tex = texture2D(uMap, uv);
    vec2 p = (vUv - 0.5) * uSize;
    float d = sdRound(p, uSize * 0.5, 0.14);
    float alpha = 1.0 - smoothstep(-0.008, 0.0, d);
    float rim = smoothstep(-0.06, -0.0, d) * alpha;
    float sheen = smoothstep(0.35, 0.0, abs(vUv.x - vUv.y * 0.6 - 0.15)) * 0.12;
    vec3 col = tex.rgb;
    col = mix(col, vec3(1.0), rim * 0.65 + sheen);
    col = mix(col, uAccent, rim * 0.25 * (0.4 + uHover));
    gl_FragColor = vec4(col, alpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

function Panel({ p, index, texture }: { p: Project; index: number; texture: Texture }) {
  const group = useRef<Group>(null);
  const [hover, setHover] = useState(false);
  const geo = useMemo(() => new PlaneGeometry(W, H, 48, 24), []);
  const mat = useMemo(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    return new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      uniforms: {
        uMap: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uCurve: { value: 0.07 },
        uOpacity: { value: 0 },
        uAccent: { value: new Color(p.accent) },
        uSize: { value: [W, H] },
      },
    });
  }, [texture, p.accent]);

  const side = index % 2 ? 1 : -1;
  const baseX = 2.95 + side * 0.2;
  const baseY = GALLERY_TOP - 1.3 - index * GALLERY_STEP;
  const baseZ = side > 0 ? -0.4 : 0.1;

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime;
    mat.uniforms.uTime.value = time;
    mat.uniforms.uHover.value = MathUtils.damp(mat.uniforms.uHover.value, hover ? 1 : 0, 6, dt);
    // Fade in as the camera approaches, out as it leaves.
    const dy = state.camera.position.y - baseY;
    const vis = (1 - MathUtils.smoothstep(Math.abs(dy), 2.6, 3.6)) * (story.t > 2.6 && story.t < 4.2 ? 1 : 0);
    mat.uniforms.uOpacity.value = vis;
    if (group.current) {
      group.current.visible = vis > 0.01;
      group.current.position.y = baseY + Math.sin(time * 0.7 + index) * 0.06;
      const tilt = MathUtils.clamp(dy / 3, -1, 1);
      group.current.rotation.set(-0.05 - tilt * 0.12, -0.24 - side * 0.05, side * 0.015);
      const s = 0.94 + 0.06 * mat.uniforms.uHover.value;
      group.current.scale.setScalar(s);
    }
  });

  const open = (e: ThreeEvent<MouseEvent>) => {
    const target = e.nativeEvent.target as HTMLElement | null;
    // Let real HTML controls on top of the panel win.
    if (target?.closest('a, button, input, textarea')) return;
    const card = document.querySelector<HTMLElement>(`[data-slug="${p.slug}"]`);
    card?.click();
  };

  return (
    <group ref={group} position={[baseX, baseY, baseZ]}>
      <mesh
        geometry={geo}
        material={mat}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.documentElement.dataset.webglHover = 'true';
        }}
        onPointerOut={() => {
          setHover(false);
          delete document.documentElement.dataset.webglHover;
        }}
        onClick={open}
      />
      <Text
        font={FONT}
        fontSize={0.12}
        color="#0B0B12"
        anchorX="left"
        anchorY="top"
        position={[-W / 2 + 0.04, -H / 2 - 0.1, 0]}
        letterSpacing={-0.02}
      >
        {`${String(index + 1).padStart(2, '0')}  ${p.name}`}
      </Text>
      <Text
        font={FONT}
        fontSize={0.12}
        color={p.accent}
        anchorX="right"
        anchorY="top"
        position={[W / 2 - 0.04, -H / 2 - 0.1, 0]}
      >
        {`${p.cardMetric.value} ${p.cardMetric.label.split(',')[0].toLowerCase()}`}
      </Text>
    </group>
  );
}

projects.forEach((p) => useTexture.preload(p.coverMd));

/** The project covers as floating, slightly curved glass panels the camera flies past. */
export function Gallery() {
  const textures = useTexture(projects.map((p) => p.coverMd));
  const root = useRef<Group>(null);
  useFrame(() => {
    if (root.current) root.current.visible = story.t > 2.3 && story.t < 4.25;
  });
  return (
    <group ref={root}>
      {projects.map((p, i) => (
        <Panel key={p.slug} p={p} index={i} texture={textures[i]} />
      ))}
    </group>
  );
}
