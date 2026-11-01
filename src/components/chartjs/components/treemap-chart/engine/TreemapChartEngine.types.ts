import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  TreemapChartCustomStyles,
  TreemapChartEffect,
  TreemapChartOptions,
  TreemapChartProps,
} from '../TreemapChart.types';

export type TreemapChartRegistryKey = Exclude<TreemapChartEffect, 'none'>;

export type TreemapChartResolvedConfig = {
  readonly customStyles?: TreemapChartCustomStyles;
  readonly options?: Partial<TreemapChartOptions>;
};

export type TreemapChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<TreemapChartProps>;