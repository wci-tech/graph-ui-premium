import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  ScatterLineChartCustomStyles,
  ScatterLineChartEffect,
  ScatterLineChartProps,
} from '../ScatterLineChart.types';

export type ScatterLineChartRegistryKey = Exclude<
  ScatterLineChartEffect,
  'none'
>;

export type ScatterLineChartResolvedConfig = {
  readonly customStyles?: ScatterLineChartCustomStyles;
  readonly options?: EChartsOption;
};

export type ScatterLineChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<ScatterLineChartProps>;