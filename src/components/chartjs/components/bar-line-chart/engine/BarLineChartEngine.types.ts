import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  BarLineChartCustomStyles,
  BarLineChartEffect,
  BarLineChartOptions,
  BarLineChartProps,
} from '../BarLineChart.types';

export type BarLineChartRegistryKey =
  Exclude<
    BarLineChartEffect,
    'none'
  >;

export type BarLineChartResolvedConfig = {
  readonly customStyles?:
  BarLineChartCustomStyles;

  readonly options?:
  Partial<BarLineChartOptions>;
};

export type BarLineChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<BarLineChartProps>;