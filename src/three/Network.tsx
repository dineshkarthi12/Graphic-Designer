import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import {
  BufferGeometry, Color, Euler, Float32BufferAttribute, Group, InstancedBufferAttribute, InstancedMesh, LineSegments,
  Matrix4, NormalBlending, Object3D, PlaneGeometry, Points, ShaderMaterial, Vector3,
} from 'three';
import { skills } from '../data/content';
import { RING_R, band, smooth, story } from './timeline';

const LAYERS = [16, 24, 32, 32, 24, 16];
const COUNT = LAYERS.reduce((a, b) => a + b, 0); // 144
const RINGS = skills.length; // 6
const PER_RING = COUNT / RINGS; // 24
const FONT = '/fonts/space-grotesk-500.woff';

const COLORS = ['#4F46E5', '#06B6D4', '#7C3AED', '#0EA5E9', '#8B5CF6', '#14B8A6'].map((c) => new Color(c));

/** Deterministic pseudo-random so the network looks the same on every visit. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function layouts() {
  const rand = rng(7);
  const net: Vector3[] = [];
  const layerOf: number[] = [];
  const span = 3.6;
  LAYERS.forEach((n, li) => {
    const x = -span / 2 + (li / (LAYERS.length - 1)) * span;
    const R = 0.55 + n * 0.021;
    for (let j = 0; j < n; j++) {
      // Sunflower disc in the y–z plane.
      const r = R * Math.sqrt((j + 0.5) / n);
      const a = j * 2.39996 + li;
      net.push(new Vector3(x + (rand() - 0.5) * 0.18, r * Math.cos(a), r * Math.sin(a)));
      layerOf.push(li);
    }
  });

  // Edges between neighbouring layers.
  const edges: [number, number][] = [];
  let start = 0;
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const next = start + LAYERS[li];
    for (let j = 0; j < LAYERS[li]; j++) {
      for (let k = 0; k < 3; k++) {
        const to = next + Math.floor(rand() * LAYERS[li + 1]);
        edges.push([start + j, to]);
      }
    }
    start = next;
  }

  // One tilted orbit ring per skill group.
  const ringMats = Array.from({ length: RINGS }, (_, k) =>
    new Matrix4().makeRotationFromEuler(new Euler((k % 2 ? 1 : -1) * (0.38 + k * 0.1), k * 0.55, (k % 3) * 0.22)),
  );
  const ringRadius = (k: number) => 1.2 + k * 0.21;

  return { net, layerOf, edges, ringMats, ringRadius, rand };
}

const nodeVertex = /* glsl */ `
  attribute vec3 aColor;
  varying vec2 vUv;
  varying vec3 vColor;
  void main() {
    vec4 center = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float s = length(instanceMatrix[0].xyz);
    center.xy += position.xy * s;
    gl_Position = projectionMatrix * center;
    vUv = uv;
    vColor = aColor;
  }
`;

const nodeFragment = /* glsl */ `
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vColor;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float core = smoothstep(0.34, 0.24, d);
    float halo = exp(-d * d * 5.0) * 0.42;
    float a = max(core, halo) * uOpacity;
    if (a < 0.01) discard;
    vec3 col = mix(vColor, vec3(1.0), core * 0.12);
    gl_FragColor = vec4(col, a);
    #include <colorspace_fragment>
  }
`;

const lineVertex = /* glsl */ `
  varying float vY;
  void main() {
    vY = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const lineFragment = /* glsl */ `
  uniform float uOpacity;
  varying float vY;
  void main() {
    vec3 col = mix(vec3(0.31, 0.27, 0.9), vec3(0.02, 0.71, 0.83), smoothstep(-1.2, 1.2, vY));
    gl_FragColor = vec4(col, 0.22 * uOpacity);
  }
`;

const pulseVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute vec3 aEnd;
  attribute float aSeed;
  varying float vFade;
  void main() {
    float f = fract(uTime * (0.25 + aSeed * 0.3) + aSeed * 7.0);
    vec3 p = mix(position, aEnd, f);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 34.0 * uPixelRatio / -mv.z;
    vFade = sin(f * 3.14159);
  }
`;
const pulseFragment = /* glsl */ `
  uniform float uOpacity;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = (smoothstep(0.45, 0.0, d) + exp(-d * d * 4.0) * 0.4) * vFade * uOpacity;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(vec3(0.02, 0.71, 0.83), vec3(0.31, 0.27, 0.9), d), a);
  }
`;

/**
 * 144 glowing nodes (one InstancedMesh) that live inside the core, open into a neural
 * network (About), reorganise into six skill orbits with labels (Skills), and settle into
 * a calm ring of light (Contact).
 */
export function Network() {
  const L = useMemo(layouts, []);
  const mesh = useRef<InstancedMesh>(null);
  const lines = useRef<LineSegments>(null);
  const pulses = useRef<Points>(null);
  const labels = useRef<Group>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const tmp = useMemo(() => new Vector3(), []);
  const acc = useMemo(() => new Vector3(), []);

  const nodeGeo = useMemo(() => {
    const g = new PlaneGeometry(1, 1);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const c = COLORS[i % COLORS.length];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute('aColor', new InstancedBufferAttribute(colors, 3));
    return g;
  }, []);

  const nodeMat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: nodeVertex,
        fragmentShader: nodeFragment,
        uniforms: { uOpacity: { value: 1 } },
        transparent: true,
        depthWrite: false,
        blending: NormalBlending,
      }),
    [],
  );

  const { lineGeo, lineMat, pulseGeo, pulseMat } = useMemo(() => {
    const lp: number[] = [];
    const ps: number[] = [];
    const pe: number[] = [];
    const seeds: number[] = [];
    L.edges.forEach(([a, b], i) => {
      lp.push(...L.net[a].toArray(), ...L.net[b].toArray());
      if (i % 2 === 0) {
        ps.push(...L.net[a].toArray());
        pe.push(...L.net[b].toArray());
        seeds.push(L.rand());
      }
    });
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute('position', new Float32BufferAttribute(lp, 3));
    const pulseGeo = new BufferGeometry();
    pulseGeo.setAttribute('position', new Float32BufferAttribute(ps, 3));
    pulseGeo.setAttribute('aEnd', new Float32BufferAttribute(pe, 3));
    pulseGeo.setAttribute('aSeed', new Float32BufferAttribute(seeds, 1));
    const lineMat = new ShaderMaterial({
      vertexShader: lineVertex,
      fragmentShader: lineFragment,
      uniforms: { uOpacity: { value: 0 } },
      transparent: true,
      depthWrite: false,
    });
    const pulseMat = new ShaderMaterial({
      vertexShader: pulseVertex,
      fragmentShader: pulseFragment,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uPixelRatio: { value: Math.min(devicePixelRatio, 1.75) } },
      transparent: true,
      depthWrite: false,
    });
    return { lineGeo, lineMat, pulseGeo, pulseMat };
  }, [L]);

  useFrame((state) => {
    const t = story.t;
    const time = state.clock.elapsedTime;
    const wNet = band(t, 0.2, 0.9, 1.3, 1.9);
    const wRing = band(t, 1.3, 1.9, 2.5, 2.9);
    const wContact = t > 3 ? smooth(4.4, 4.95, t) : 0;
    const W = wNet + wRing + wContact;
    const grow = Math.min(1, W);

    if (mesh.current) {
      mesh.current.visible = W > 0.002;
      if (mesh.current.visible) {
        for (let i = 0; i < COUNT; i++) {
          acc.set(0, 0, 0);
          if (wNet > 0) acc.addScaledVector(L.net[i], wNet);
          if (wRing > 0) {
            const k = i % RINGS;
            const j = Math.floor(i / RINGS);
            const a = (j / PER_RING) * Math.PI * 2 + time * (0.12 + k * 0.025) * (k % 2 ? -1 : 1);
            const r = L.ringRadius(k);
            tmp.set(Math.cos(a) * r, 0, Math.sin(a) * r).applyMatrix4(L.ringMats[k]);
            acc.addScaledVector(tmp, wRing);
          }
          if (wContact > 0) {
            const a = (i / COUNT) * Math.PI * 2 + time * 0.05;
            const r = RING_R + Math.sin(i * 1.7 + time * 0.8) * 0.04;
            tmp.set(Math.cos(a) * r, Math.sin(a) * r, 0);
            acc.addScaledVector(tmp, wContact);
          }
          acc.multiplyScalar((1 / Math.max(W, 1e-4)) * grow);
          dummy.position.copy(acc);
          const size = (wNet * 0.14 + wRing * 0.1 + wContact * 0.075) / Math.max(W, 1e-4);
          dummy.scale.setScalar(size * grow * (1 + 0.15 * Math.sin(time * 2 + i)));
          dummy.updateMatrix();
          mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
      }
    }

    const lineOpacity = wNet * (1 - wRing);
    lineMat.uniforms.uOpacity.value = lineOpacity;
    pulseMat.uniforms.uOpacity.value = lineOpacity;
    pulseMat.uniforms.uTime.value = time;
    if (lines.current) {
      lines.current.visible = lineOpacity > 0.01;
      lines.current.scale.setScalar(Math.max(0.001, wNet));
    }
    if (pulses.current) {
      pulses.current.visible = lineOpacity > 0.01;
      pulses.current.scale.setScalar(Math.max(0.001, wNet));
    }

    // Skill labels ride their rings.
    if (labels.current) {
      labels.current.visible = wRing > 0.02;
      labels.current.children.forEach((child, k) => {
        // Labels swing along the right-hand arc of the orbits, so they stay clear of the text on the left.
        const a = 1.15 - (k / (RINGS - 1)) * 2.3 + Math.sin(time * 0.35 + k) * 0.08;
        child.position.set(Math.cos(a) * 1.9, Math.sin(a) * 1.65, Math.sin(time * 0.3 + k) * 0.4).multiplyScalar(wRing);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const text = child.children[0] as any;
        if (text) {
          text.fillOpacity = wRing;
          text.outlineOpacity = wRing;
        }
      });
    }
  });

  return (
    <group>
      <instancedMesh ref={mesh} args={[nodeGeo, nodeMat, COUNT]} frustumCulled={false} />
      <lineSegments ref={lines} geometry={lineGeo} material={lineMat} frustumCulled={false} />
      <points ref={pulses} geometry={pulseGeo} material={pulseMat} frustumCulled={false} />
      <group ref={labels}>
        {skills.map((s) => (
          <Billboard key={s.id}>
            <Text
              font={FONT}
              fontSize={0.15}
              color="#0B0B12"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="#F5F5F7"
              letterSpacing={-0.02}
            >
              {s.short}
            </Text>
          </Billboard>
        ))}
      </group>
    </group>
  );
}
