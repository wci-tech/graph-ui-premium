import type {
  StackedAreaChartRegistryEntry,
  StackedAreaChartRegistryKey,
} from '@/components/echarts/components/stacked-area-chart/engine/StackedAreaChartEngine.types';
import type { StackedAreaChartEffect } from '@/components/echarts/components/stacked-area-chart/StackedAreaChart.types';
import { createRegistry } from '@/registry';

const effectLoaders: Partial<
  Record<
    Exclude<StackedAreaChartEffect, 'none'>,
    () => Promise<StackedAreaChartRegistryEntry>
  >
> = {
  bounce: () =>
    import('@/components/echarts/common-effects/BounceEChartsEffect.styles').then(
      (module) => module.default,
    ),
  wobble: () =>
    import('@/components/echarts/common-effects/WobbleEChartsEffect.styles').then(
      (module) => module.default,
    ),
  elastic: () =>
    import('@/components/echarts/common-effects/ElasticEChartsEffect.styles').then(
      (module) => module.default,
    ),
  'progressive-trace': () =>
    import('@/components/echarts/common-effects/ProgressiveTraceEChartsEffect.styles').then(
      (module) => module.default,
    ),
  'elastic-glide': () =>
    import('@/components/echarts/common-effects/ElasticGlideEChartsEffect.styles').then(
      (module) => module.default,
    ),
  'staggered-reveal': () =>
    import('@/components/echarts/common-effects/StaggeredRevealEChartsEffect.styles').then(
      (module) => module.default,
    ),
};

export const getComponent = createRegistry<
  StackedAreaChartRegistryKey,
  StackedAreaChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});