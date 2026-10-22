import { createRegistry } from '@/registry';

import FadeInLineChartStyles from '../effects/FadeInLineChart.styles';
import type { LineChartEffect, LineChartVariant } from '../LineChart.types';
import PrimaryLineChartStyles from '../variants/PrimaryLineChart.styles';

import type {
  LineChartRegistryEntry,
  LineChartRegistryKey,
  LineChartStyleModule,
} from './LineChartEngine.types';

const variantLoaders: Partial<Record<LineChartVariant, () => Promise<LineChartStyleModule>>> = {
  secondary: () => import('../variants/SecondaryLineChart.styles').then((m) => m.default),
};

const effectLoaders: Partial<
  Record<Exclude<LineChartEffect, 'none'>, () => Promise<LineChartStyleModule>>
> = {
  'fade-in': () => Promise.resolve(FadeInLineChartStyles),
};

export const getComponent = createRegistry<LineChartRegistryKey, LineChartRegistryEntry>({
  eager: {
    primary: PrimaryLineChartStyles,
  },
  lazy: {
    ...variantLoaders,
    ...effectLoaders,
  },
});
