import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  ScatterLineChartCustomStyles,
  ScatterLineChartEffect,
  ScatterLineChartOptions,
  ScatterLineChartProps,
} from '../ScatterLineChart.types';

export type ScatterLineChartRegistryKey = Exclude<
  ScatterLineChartEffect,
  'none'
>;

export type ScatterLineChartResolvedConfig = {
  readonly customStyles?: ScatterLineChartCustomStyles;
  readonly options?: Partial<ScatterLineChartOptions>;
};

export type ScatterLineChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<ScatterLineChartProps>;