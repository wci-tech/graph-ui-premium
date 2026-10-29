import { createRegistry } from '@/registry';

import type { BarChartEffect } from '../BarChart.types';

import type {
  BarChartRegistryEntry,
  BarChartRegistryKey,
} from './BarChartEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<BarChartEffect, 'none'>,
    () => Promise<BarChartRegistryEntry>
  >
> = {
  bounce: () =>
    import(
      '@/components/chartjs/common-effects/BounceChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),

  wobble: () =>
    import(
      '@/components/chartjs/common-effects/WobbleChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),

  elastic: () =>
    import(
      '@/components/chartjs/common-effects/ElasticChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),

  'progressive-trace': () =>
    import(
      '@/components/chartjs/common-effects/ProgressiveTraceChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),

  'elastic-glide': () =>
    import(
      '@/components/chartjs/common-effects/ElasticGlideChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),

  'staggered-reveal': () =>
    import(
      '@/components/chartjs/common-effects/StaggeredRevealChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),
};

export const getComponent =
  createRegistry<
    BarChartRegistryKey,
    BarChartRegistryEntry
  >({
    eager: {},

    lazy: {
      ...effectLoaders,
    },
  });