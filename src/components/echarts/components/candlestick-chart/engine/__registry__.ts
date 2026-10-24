import { createRegistry } from '@/registry';

import type { CandlestickChartEffect } from '../CandlestickChart.types';

import type {
  CandlestickChartRegistryEntry,
  CandlestickChartRegistryKey,
} from './CandlestickChartEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<CandlestickChartEffect, 'none'>,
    () => Promise<CandlestickChartRegistryEntry>
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
  CandlestickChartRegistryKey,
  CandlestickChartRegistryEntry
>({
  eager: {},
  lazy: effectLoaders,
});