import type { ComponentType } from 'react';

import type { StyleModule } from '@wci-tech/core-ui-premium';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  BarChartCustomStyles,
  BarChartEffect,
  BarChartOptions,
  BarChartProps,
} from '../BarChart.types';

export type BarChartRegistryKey = Exclude<BarChartEffect, 'none'>;

export type BarChartResolvedConfig = {
  readonly customStyles?: BarChartCustomStyles;

  readonly options?: Partial<BarChartOptions>;
};

export type BarChartStyleModule = StyleModule<Record<string, never>, BarChartResolvedConfig>;

export type BarChartRegistryEntry =
  | BarChartStyleModule
  | ChartJSEffectStyleModule
  | ComponentType<BarChartProps>;
