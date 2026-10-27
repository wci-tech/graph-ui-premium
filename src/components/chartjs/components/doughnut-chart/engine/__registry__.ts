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
    import(
      '../../../common-effects/BounceChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),
  wobble: () =>
    import(
      '../../../common-effects/WobbleChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),
  elastic: () =>
    import(
      '../../../common-effects/ElasticChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),
  'progressive-trace': () =>
    import(
      '../../../common-effects/ProgressiveTraceChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),
  'elastic-glide': () =>
    import(
      '../../../common-effects/ElasticGlideChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),
  'staggered-reveal': () =>
    import(
      '../../../common-effects/StaggeredRevealChartJSEffect.styles'
    ).then(
      (module) => module.default,
    ),
};

export const getComponent =
  createRegistry<
    DoughnutChartRegistryKey,
    DoughnutChartRegistryEntry
  >({
    eager: {},
    lazy: {
      ...effectLoaders,
    },
  });