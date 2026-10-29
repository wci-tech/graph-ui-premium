import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  GanttChartCustomStyles,
  GanttChartEffect,
  GanttChartOptions,
  GanttChartProps,
} from '../GanttChart.types';

export type GanttChartRegistryKey =
  Exclude<GanttChartEffect, 'none'>;

export type GanttChartResolvedConfig = {
  readonly customStyles?: GanttChartCustomStyles;
  readonly options?: Partial<GanttChartOptions>;
};

export type GanttChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<GanttChartProps>;