import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const bloom = <Bloom mipmapBlur intensity={0.45} luminanceThreshold={1} luminanceSmoothing={0.3} />;
const grain = <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.35} />;
const vignette = <Vignette offset={0.32} darkness={0.32} />;

/** Gentle bloom, subtle depth of field, light film grain and a soft vignette. Desktop only. */
export function Effects({ dof }: { dof: boolean }) {
  return dof ? (
    <EffectComposer multisampling={4}>
      {bloom}
      <DepthOfField worldFocusDistance={6.2} worldFocusRange={5} bokehScale={1.6} />
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
