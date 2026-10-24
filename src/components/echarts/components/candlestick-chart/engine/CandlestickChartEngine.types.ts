import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  CandlestickChartCustomStyles,
  CandlestickChartEffect,
  CandlestickChartProps,
} from '../CandlestickChart.types';

export type CandlestickChartRegistryKey =
  Exclude<CandlestickChartEffect, 'none'>;

export type CandlestickChartResolvedConfig = {
  readonly customStyles?: CandlestickChartCustomStyles;
  readonly options?: EChartsOption;
};

export type CandlestickChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<CandlestickChartProps>;