import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  BarChartCustomStyles,
  BarChartEffect,
  BarChartProps,
} from '../BarChart.types';

export type BarChartRegistryKey =
  Exclude<BarChartEffect, 'none'>;

export type BarChartResolvedConfig = {
  readonly customStyles?: BarChartCustomStyles;
  readonly options?: EChartsOption;
};

export type BarChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<BarChartProps>;