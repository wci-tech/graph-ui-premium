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
      '@/components/chartjs/common-effects/BounceChartJSEffect.styles'
    ).then((module) => module.default),
  wobble: () =>
    import(
      '@/components/chartjs/common-effects/WobbleChartJSEffect.styles'
    ).then((module) => module.default),
  elastic: () =>
    import(
      '@/components/chartjs/common-effects/ElasticChartJSEffect.styles'
    ).then((module) => module.default),
  'progressive-trace': () =>
    import(
      '@/components/chartjs/common-effects/ProgressiveTraceChartJSEffect.styles'
    ).then((module) => module.default),
  'elastic-glide': () =>
    import(
      '@/components/chartjs/common-effects/ElasticGlideChartJSEffect.styles'
    ).then((module) => module.default),
  'staggered-reveal': () =>
    import(
      '@/components/chartjs/common-effects/StaggeredRevealChartJSEffect.styles'
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