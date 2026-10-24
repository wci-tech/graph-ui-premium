import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  CandlestickChartCustomStyles,
  CandlestickChartEffect,
  CandlestickChartOptions,
  CandlestickChartProps,
} from '../CandlestickChart.types';

export type CandlestickChartRegistryKey =
  Exclude<CandlestickChartEffect, 'none'>;

export type CandlestickChartResolvedConfig = {
  readonly customStyles?: CandlestickChartCustomStyles;
  readonly options?: Partial<CandlestickChartOptions>;
};

export type CandlestickChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<CandlestickChartProps>;