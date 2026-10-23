import { createRegistry } from '@/registry';

import type { BarChartEffect, BarChartVariant } from '../BarChart.types';
import PrimaryBarChartStyles from '../variants/PrimaryBarChart.styles';

import type {
  BarChartRegistryEntry,
  BarChartRegistryKey,
  BarChartStyleModule,
} from './BarChartEngine.types';

const variantLoaders: Partial<Record<BarChartVariant, () => Promise<BarChartStyleModule>>> = {
  secondary: () => import('../variants/SecondaryBarChart.styles').then((m) => m.default),
};

const effectLoaders: Partial<
  Record<Exclude<BarChartEffect, 'none'>, () => Promise<BarChartRegistryEntry>>
> = {
  bounce: () => import('../../../common-effects/BounceEChartsEffect.styles').then((m) => m.default),

  wobble: () => import('../../../common-effects/WobbleEChartsEffect.styles').then((m) => m.default),

  elastic: () =>
    import('../../../common-effects/ElasticEChartsEffect.styles').then((m) => m.default),

  'progressive-trace': () =>
    import('../../../common-effects/ProgressiveTraceEChartsEffect.styles').then((m) => m.default),

  'elastic-glide': () =>
    import('../../../common-effects/ElasticGlideEChartsEffect.styles').then((m) => m.default),

  'staggered-reveal': () =>
    import('../../../common-effects/StaggeredRevealEChartsEffect.styles').then((m) => m.default),
};

export const getComponent = createRegistry<BarChartRegistryKey, BarChartRegistryEntry>({
  eager: {
    primary: PrimaryBarChartStyles,
  },

  lazy: {
    ...variantLoaders,
    ...effectLoaders,
  },
});
