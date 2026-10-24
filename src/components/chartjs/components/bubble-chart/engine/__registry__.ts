import { createRegistry } from '@/registry';

import type { BubbleChartEffect } from '../BubbleChart.types';

import type {
  BubbleChartRegistryEntry,
  BubbleChartRegistryKey,
} from './BubbleChartEngine.types';

const effectLoaders: Partial<
  Record<Exclude<BubbleChartEffect, 'none'>, () => Promise<BubbleChartRegistryEntry>>
> = {
  bounce: () =>
    import('../../../common-effects/BounceChartJSEffect.styles').then(
      (module) => module.default,
    ),
  wobble: () =>
    import('../../../common-effects/WobbleChartJSEffect.styles').then(
      (module) => module.default,
    ),
  elastic: () =>
    import('../../../common-effects/ElasticChartJSEffect.styles').then(
      (module) => module.default,
    ),
  'progressive-trace': () =>
    import('../../../common-effects/ProgressiveTraceChartJSEffect.styles').then(
      (module) => module.default,
    ),
  'elastic-glide': () =>
    import('../../../common-effects/ElasticGlideChartJSEffect.styles').then(
      (module) => module.default,
    ),
  'staggered-reveal': () =>
    import('../../../common-effects/StaggeredRevealChartJSEffect.styles').then(
      (module) => module.default,
    ),
};

export const getComponent = createRegistry<
  BubbleChartRegistryKey,
  BubbleChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});