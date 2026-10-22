import { createRegistry } from '@/registry';

import type { AreaChartEffect } from '../AreaChart.types';

import type { AreaChartRegistryEntry, AreaChartRegistryKey } from './AreaChartEngine.types';

const effectLoaders: Partial<
  Record<Exclude<AreaChartEffect, 'none'>, () => Promise<AreaChartRegistryEntry>>
> = {
  bounce: () =>
    import('../../../common-effects/BounceEChartsEffect.styles').then((module) => module.default),

  wobble: () =>
    import('../../../common-effects/WobbleEChartsEffect.styles').then((module) => module.default),

  elastic: () =>
    import('../../../common-effects/ElasticEChartsEffect.styles').then((module) => module.default),

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

export const getComponent = createRegistry<AreaChartRegistryKey, AreaChartRegistryEntry>({
  eager: {},

  lazy: {
    ...effectLoaders,
  },
});
