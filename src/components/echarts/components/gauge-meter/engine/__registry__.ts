import { createRegistry } from '@/registry';

import type { GaugeMeterEffect } from '../GaugeMeter.types';

import type {
  GaugeMeterRegistryEntry,
  GaugeMeterRegistryKey,
} from './GaugeMeterEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<GaugeMeterEffect, 'none'>,
    () => Promise<GaugeMeterRegistryEntry>
  >
> = {
  bounce: () =>
    import('@/components/echarts/common-effects/BounceEChartsEffect.styles').then(
      (module) => module.default,
    ),

  wobble: () =>
    import('@/components/echarts/common-effects/WobbleEChartsEffect.styles').then(
      (module) => module.default,
    ),

  elastic: () =>
    import('@/components/echarts/common-effects/ElasticEChartsEffect.styles').then(
      (module) => module.default,
    ),

  'progressive-trace': () =>
    import('@/components/echarts/common-effects/ProgressiveTraceEChartsEffect.styles').then(
      (module) => module.default,
    ),

  'elastic-glide': () =>
    import('@/components/echarts/common-effects/ElasticGlideEChartsEffect.styles').then(
      (module) => module.default,
    ),

  'staggered-reveal': () =>
    import('@/components/echarts/common-effects/StaggeredRevealEChartsEffect.styles').then(
      (module) => module.default,
    ),
};

export const getComponent = createRegistry<
  GaugeMeterRegistryKey,
  GaugeMeterRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});