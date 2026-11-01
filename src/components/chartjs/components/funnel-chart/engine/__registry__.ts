import { createRegistry } from '@/registry';

import type { FunnelChartEffect } from '../FunnelChart.types';

import type {
  FunnelChartRegistryEntry,
  FunnelChartRegistryKey,
} from './FunnelChartEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<FunnelChartEffect, 'none'>,
    () => Promise<FunnelChartRegistryEntry>
  >
> = {
  bounce: () =>
    import('@/components/chartjs/common-effects/BounceChartJSEffect.styles').then(
      (module) => module.default,
    ),
  wobble: () =>
    import('@/components/chartjs/common-effects/WobbleChartJSEffect.styles').then(
      (module) => module.default,
    ),
  elastic: () =>
    import('@/components/chartjs/common-effects/ElasticChartJSEffect.styles').then(
      (module) => module.default,
    ),
  'progressive-trace': () =>
    import('@/components/chartjs/common-effects/ProgressiveTraceChartJSEffect.styles').then(
      (module) => module.default,
    ),
  'elastic-glide': () =>
    import('@/components/chartjs/common-effects/ElasticGlideChartJSEffect.styles').then(
      (module) => module.default,
    ),
  'staggered-reveal': () =>
    import('@/components/chartjs/common-effects/StaggeredRevealChartJSEffect.styles').then(
      (module) => module.default,
    ),
};

export const getComponent = createRegistry<
  FunnelChartRegistryKey,
  FunnelChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});