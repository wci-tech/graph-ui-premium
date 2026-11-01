import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  StackedBarChartCustomStyles,
  StackedBarChartEffect,
  StackedBarChartProps,
} from '../StackedBarChart.types';

export type StackedBarChartRegistryKey = Exclude<
  StackedBarChartEffect,
  'none'
>;

export interface StackedBarChartResolvedConfig {
  readonly customStyles?: StackedBarChartCustomStyles;
  readonly options?: EChartsOption;
}

export type StackedBarChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<StackedBarChartProps>;