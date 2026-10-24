import { createRegistry } from '@/registry';

import type {
  BarLineChartEffect,
} from '../BarLineChart.types';

import type {
  BarLineChartRegistryEntry,
  BarLineChartRegistryKey,
} from './BarLineChartEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<BarLineChartEffect, 'none'>,
    () => Promise<BarLineChartRegistryEntry>
  >
> = {
  bounce: () =>
    import(
      '../../../common-effects/BounceEChartsEffect.styles'
    ).then((module) => module.default),

  wobble: () =>
    import(
      '../../../common-effects/WobbleEChartsEffect.styles'
    ).then((module) => module.default),

  elastic: () =>
    import(
      '../../../common-effects/ElasticEChartsEffect.styles'
    ).then((module) => module.default),

  'progressive-trace': () =>
    import(
      '../../../common-effects/ProgressiveTraceEChartsEffect.styles'
    ).then((module) => module.default),

  'elastic-glide': () =>
    import(
      '../../../common-effects/ElasticGlideEChartsEffect.styles'
    ).then((module) => module.default),

  'staggered-reveal': () =>
    import(
      '../../../common-effects/StaggeredRevealEChartsEffect.styles'
    ).then((module) => module.default),
};

export const getComponent = createRegistry<
  BarLineChartRegistryKey,
  BarLineChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});