import type { ComponentType } from 'react';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  LineChartCustomStyles,
  LineChartEffect,
  LineChartOptions,
  LineChartProps,
} from '../LineChart.types';

export type LineChartRegistryKey =
  Exclude<LineChartEffect, 'none'>;

export type LineChartResolvedConfig = {
  readonly customStyles?: LineChartCustomStyles;
  readonly options?: Partial<LineChartOptions>;
};

export type LineChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<LineChartProps>;