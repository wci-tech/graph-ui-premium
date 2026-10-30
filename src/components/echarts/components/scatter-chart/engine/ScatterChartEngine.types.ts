import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  ScatterChartCustomStyles,
  ScatterChartEffect,
  ScatterChartProps,
} from '../ScatterChart.types';

export type ScatterChartRegistryKey = Exclude<ScatterChartEffect, 'none'>;

export type ScatterChartResolvedConfig = {
  readonly customStyles?: ScatterChartCustomStyles;
  readonly options?: EChartsOption;
};

export type ScatterChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<ScatterChartProps>;