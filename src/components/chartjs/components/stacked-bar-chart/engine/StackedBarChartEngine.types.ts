import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  StackedBarChartCustomStyles,
  StackedBarChartEffect,
  StackedBarChartOptions,
  StackedBarChartProps,
} from '../StackedBarChart.types';

export type StackedBarChartRegistryKey = Exclude<StackedBarChartEffect, 'none'>;

export interface StackedBarChartResolvedConfig {
  readonly customStyles?: StackedBarChartCustomStyles;
  readonly options?: Partial<StackedBarChartOptions>;
}

export type StackedBarChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<StackedBarChartProps>;