import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { BufferAttribute, Color, Group, IcosahedronGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

const noise = new SimplexNoise();

/** Living blob geometry: an icosphere whose vertices drift on 3D simplex noise. */
function useBlob(detail: number) {
  return useMemo(() => {
    const geo = mergeVertices(new IcosahedronGeometry(1, detail));
    const base = Float32Array.from(geo.attributes.position.array as Float32Array);
    return { geo, base };
  }, [detail]);
}

const innerVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const innerFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    float f = 0.5 + 0.5 * sin(vPos.y * 3.0 + uTime * 0.8 + vPos.x * 2.0);
    float g = 0.5 + 0.5 * sin(vPos.z * 4.0 - uTime * 0.6);
    vec3 col = mix(uA, uB, f);
    col = mix(col, uC, g * 0.35);
    float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    gl_FragColor = vec4(col * (1.15 + rim * 0.9), 1.0);
    #include <colorspace_fragment>
  }
`;

/**
 * The AI core: an iridescent glass blob around a glowing gradient heart.
 * `lite` swaps the transmission material for a cheaper physical material (mobile, low GPU).
 */
export function Core({ lite = false, accent = '#4F46E5', accent2 = '#06B6D4' }: { lite?: boolean; accent?: string; accent2?: string }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const { geo, base } = useBlob(lite ? 10 : 18);
  const v = useMemo(() => new Vector3(), []);

  const inner = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: innerVertex,
        fragmentShader: innerFragment,
        uniforms: {
          uTime: { value: 0 },
          uA: { value: new Color(accent) },
          uB: { value: new Color(accent2) },
          uC: { value: new Color('#F0ABFC') },
        },
        toneMapped: false,
      }),
    [accent, accent2],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    inner.uniforms.uTime.value = t;
    // Breathe: displace each vertex along its direction with slowly moving noise.
    const pos = geo.attributes.position as BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      v.set(base[i], base[i + 1], base[i + 2]);
      const n = noise.noise4d(v.x * 1.1, v.y * 1.1, v.z * 1.1, t * 0.22);
      const k = 1 + n * 0.14;
      arr[i] = v.x * k;
      arr[i + 1] = v.y * k;
      arr[i + 2] = v.z * k;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.12;
      mesh.current.rotation.z = Math.sin(t * 0.2) * 0.15;
    }
    if (group.current) group.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.025);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geo}>
        {lite ? (
          <meshPhysicalMaterial
            color="#EEF0FF"
            roughness={0.12}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={1}
            iridescenceIOR={1.35}
            iridescenceThicknessRange={[120, 680]}
            transparent
            opacity={0.72}
            depthWrite={false}
          />
        ) : (
          <MeshTransmissionMaterial
            samples={6}
            resolution={512}
            thickness={0.9}
            roughness={0.06}
            transmission={1}
            ior={1.35}
            chromaticAberration={0.08}
            anisotropy={0.25}
            distortion={0.35}
            distortionScale={0.4}
            temporalDistortion={0.12}
            iridescence={1}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 700]}
            clearcoat={1}
            attenuationDistance={1.6}
            attenuationColor="#E9E3FF"
            color="#FFFFFF"
            background={new Color('#F5F5F7')}
          />
        )}
      </mesh>
      <mesh scale={0.46} material={inner}>
        <icosahedronGeometry args={[1, 6]} />
      </mesh>
    </group>
  );
}
