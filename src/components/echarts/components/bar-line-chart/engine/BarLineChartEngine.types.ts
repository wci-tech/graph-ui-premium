import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  BarLineChartCustomStyles,
  BarLineChartEffect,
  BarLineChartProps,
} from '../BarLineChart.types';

export type BarLineChartRegistryKey =
  Exclude<BarLineChartEffect, 'none'>;

export type BarLineChartResolvedConfig = {
  readonly customStyles?: BarLineChartCustomStyles;
  readonly options?: EChartsOption;
};

export type BarLineChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<BarLineChartProps>;