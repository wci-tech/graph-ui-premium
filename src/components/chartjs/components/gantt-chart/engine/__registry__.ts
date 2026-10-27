import { createRegistry } from '@/registry';

import type { GanttChartEffect } from '../GanttChart.types';

import type {
  GanttChartRegistryEntry,
  GanttChartRegistryKey,
} from './GanttChartEngine.types';

const effectLoaders: Partial<
  Record<
    Exclude<GanttChartEffect, 'none'>,
    () => Promise<GanttChartRegistryEntry>
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

export const getComponent = createRegistry<
  GanttChartRegistryKey,
  GanttChartRegistryEntry
>({
  eager: {},
  lazy: {
    ...effectLoaders,
  },
});