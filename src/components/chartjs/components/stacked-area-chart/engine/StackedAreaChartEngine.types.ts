import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  StackedAreaChartCustomStyles,
  StackedAreaChartEffect,
  StackedAreaChartOptions,
  StackedAreaChartProps,
} from '../StackedAreaChart.types';

export type StackedAreaChartRegistryKey =
  Exclude<StackedAreaChartEffect, 'none'>;

export interface StackedAreaChartResolvedConfig {
  readonly customStyles?: StackedAreaChartCustomStyles;
  readonly options?: Partial<StackedAreaChartOptions>;
}

export type StackedAreaChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<StackedAreaChartProps>;