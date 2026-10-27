import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  DoughnutChartCustomStyles,
  DoughnutChartEffect,
  DoughnutChartOptions,
  DoughnutChartProps,
} from '../DoughnutChart.types';

export type DoughnutChartRegistryKey =
  Exclude<DoughnutChartEffect, 'none'>;

export type DoughnutChartResolvedConfig = {
  readonly customStyles?:
  DoughnutChartCustomStyles;
  readonly options?:
  Partial<DoughnutChartOptions>;
};

export type DoughnutChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<DoughnutChartProps>;