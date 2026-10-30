import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  RadarChartCustomStyles,
  RadarChartEffect,
  RadarChartOptions,
  RadarChartProps,
} from '../RadarChart.types';

export type RadarChartRegistryKey = Exclude<RadarChartEffect, 'none'>;

export type RadarChartResolvedConfig = {
  readonly customStyles?: RadarChartCustomStyles;
  readonly options?: Partial<RadarChartOptions>;
};

export type RadarChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<RadarChartProps>;