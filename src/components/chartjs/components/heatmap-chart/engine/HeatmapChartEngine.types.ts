import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  HeatmapChartCustomStyles,
  HeatmapChartEffect,
  HeatmapChartOptions,
  HeatmapChartProps,
} from '../HeatmapChart.types';

export type HeatmapChartRegistryKey =
  Exclude<HeatmapChartEffect, 'none'>;

export interface HeatmapChartResolvedConfig {
  readonly customStyles?: HeatmapChartCustomStyles;
  readonly options?: Partial<HeatmapChartOptions>;
}

export type HeatmapChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<HeatmapChartProps>;