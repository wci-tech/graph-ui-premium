import type {
  FunnelChartRegistryEntry,
  FunnelChartRegistryKey,
} from '@/components/echarts/components/funnel-chart/engine/FunnelChartEngine.types';
import type { FunnelChartEffect } from '@/components/echarts/components/funnel-chart/FunnelChart.types';
import { createRegistry } from '@/registry';

const effectLoaders: Partial<
  Record<
    Exclude<FunnelChartEffect, 'none'>,
    () => Promise<FunnelChartRegistryEntry>
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
  FunnelChartRegistryKey,
  FunnelChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});