import { createRegistry } from '@/registry';

import type { DoughnutChartEffect } from '../DoughnutChart.types';

import type {
  DoughnutChartRegistryEntry,
  DoughnutChartRegistryKey,
} from './DoughnutChartEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<DoughnutChartEffect, 'none'>,
    () => Promise<DoughnutChartRegistryEntry>
  >
> = {
  bounce: () =>
    import('../../../common-effects/BounceEChartsEffect.styles').then(
      (module) => module.default,
    ),
  wobble: () =>
    import('../../../common-effects/WobbleEChartsEffect.styles').then(
      (module) => module.default,
    ),
  elastic: () =>
    import('../../../common-effects/ElasticEChartsEffect.styles').then(
      (module) => module.default,
    ),
  'progressive-trace': () =>
    import('../../../common-effects/ProgressiveTraceEChartsEffect.styles').then(
      (module) => module.default,
    ),
  'elastic-glide': () =>
    import('../../../common-effects/ElasticGlideEChartsEffect.styles').then(
      (module) => module.default,
    ),
  'staggered-reveal': () =>
    import('../../../common-effects/StaggeredRevealEChartsEffect.styles').then(
      (module) => module.default,
    ),
};

export const getComponent = createRegistry<
  DoughnutChartRegistryKey,
  DoughnutChartRegistryEntry
>({
  eager: {},
  lazy: effectLoaders,
});