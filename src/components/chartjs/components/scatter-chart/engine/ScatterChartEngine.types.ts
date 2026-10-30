import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  ScatterChartCustomStyles,
  ScatterChartEffect,
  ScatterChartOptions,
  ScatterChartProps,
} from '../ScatterChart.types';

export type ScatterChartRegistryKey =
  Exclude<ScatterChartEffect, 'none'>;

export type ScatterChartResolvedConfig = {
  readonly customStyles?: ScatterChartCustomStyles;
  readonly options?: Partial<ScatterChartOptions>;
};

export type ScatterChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<ScatterChartProps>;