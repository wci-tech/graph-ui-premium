import { createRegistry } from '@/registry';

import type { LineChartEffect } from '../LineChart.types';

import type {
  LineChartRegistryEntry,
  LineChartRegistryKey,
  LineChartStyleModule,
} from './LineChartEngine.types';

const effectLoaders: Partial<
  Record<Exclude<LineChartEffect, 'none'>, () => Promise<LineChartStyleModule>>
> = {
  'fade-in': () => import('../effects/FadeInLineChart.styles').then((module) => module.default),
};

export const getComponent = createRegistry<LineChartRegistryKey, LineChartRegistryEntry>({
  eager: {},
  lazy: effectLoaders,
});