import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  BarChartCustomStyles,
  BarChartEffect,
  BarChartOptions,
  BarChartProps,
} from '../BarChart.types';

export type BarChartRegistryKey =
  Exclude<BarChartEffect, 'none'>;

export type BarChartResolvedConfig = {
  readonly customStyles?: BarChartCustomStyles;

  readonly options?: Partial<BarChartOptions>;
};

export type BarChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<BarChartProps>;