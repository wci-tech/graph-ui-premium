import type {
  StackedBarChartRegistryEntry,
  StackedBarChartRegistryKey,
} from '@/components/chartjs/components/stacked-bar-chart/engine/StackedBarChartEngine.types';
import type { StackedBarChartEffect } from '@/components/chartjs/components/stacked-bar-chart/StackedBarChart.types';
import { createRegistry } from '@/registry';

const effectLoaders: Partial<
  Record<Exclude<StackedBarChartEffect, 'none'>, () => Promise<StackedBarChartRegistryEntry>>
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
  StackedBarChartRegistryKey,
  StackedBarChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});