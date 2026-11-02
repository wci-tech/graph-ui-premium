import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  LineChartCustomStyles,
  LineChartEffect,
  LineChartOptions,
  LineChartProps,
} from '../LineChart.types';

export type LineChartRegistryKey = Exclude<LineChartEffect, 'none'>;

export type LineChartResolvedConfig = {
  readonly customStyles?: LineChartCustomStyles;
  readonly options?: Partial<LineChartOptions>;
};

export type LineChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<LineChartProps>;