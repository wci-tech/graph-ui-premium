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
      '../../../common-effects/BounceChartJSEffect.styles'
    ).then((module) => module.default),
  wobble: () =>
    import(
      '../../../common-effects/WobbleChartJSEffect.styles'
    ).then((module) => module.default),
  elastic: () =>
    import(
      '../../../common-effects/ElasticChartJSEffect.styles'
    ).then((module) => module.default),
  'progressive-trace': () =>
    import(
      '../../../common-effects/ProgressiveTraceChartJSEffect.styles'
    ).then((module) => module.default),
  'elastic-glide': () =>
    import(
      '../../../common-effects/ElasticGlideChartJSEffect.styles'
    ).then((module) => module.default),
  'staggered-reveal': () =>
    import(
      '../../../common-effects/StaggeredRevealChartJSEffect.styles'
    ).then((module) => module.default),
};

export const getComponent = createRegistry<
  CandlestickChartRegistryKey,
  CandlestickChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});