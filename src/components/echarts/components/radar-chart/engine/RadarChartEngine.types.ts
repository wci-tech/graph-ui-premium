import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  RadarChartCustomStyles,
  RadarChartEffect,
  RadarChartProps,
} from '../RadarChart.types';

export type RadarChartRegistryKey =
  Exclude<RadarChartEffect, 'none'>;

export type RadarChartResolvedConfig = {
  readonly customStyles?: RadarChartCustomStyles;
  readonly options?: EChartsOption;
};

export type RadarChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<RadarChartProps>;