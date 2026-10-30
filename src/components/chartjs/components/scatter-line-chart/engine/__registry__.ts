import { createRegistry } from '@/registry';

import type { ScatterLineChartEffect } from '../ScatterLineChart.types';

import type {
  ScatterLineChartRegistryEntry,
  ScatterLineChartRegistryKey,
} from './ScatterLineChartEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<ScatterLineChartEffect, 'none'>,
    () => Promise<ScatterLineChartRegistryEntry>
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
  ScatterLineChartRegistryKey,
  ScatterLineChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});