import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction, type DepthOfFieldEffect } from 'postprocessing';
import { smooth, story } from './timeline';

const bloom = <Bloom mipmapBlur intensity={0.45} luminanceThreshold={1} luminanceSmoothing={0.3} />;
const grain = <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.35} />;
const vignette = <Vignette offset={0.32} darkness={0.24} />;

/** Depth of field stays off over the hero backdrop (it has no depth), and eases in after it. */
function ScrollDof() {
  const ref = useRef<DepthOfFieldEffect>(null);
  useFrame(() => {
    if (ref.current) ref.current.bokehScale = 1.6 * smooth(0.6, 1.0, story.t);
  });
  return <DepthOfField ref={ref} worldFocusDistance={6.2} worldFocusRange={5} bokehScale={0} />;
}

/** Gentle bloom, subtle depth of field, light film grain and a soft vignette. Desktop only. */
export function Effects({ dof }: { dof: boolean }) {
  return dof ? (
    <EffectComposer multisampling={4}>
      {bloom}
      <ScrollDof />
      {grain}
      {vignette}
    </EffectComposer>
  ) : (
    <EffectComposer multisampling={4}>
      {bloom}
      {grain}
      {vignette}
    </EffectComposer>
  );
}
