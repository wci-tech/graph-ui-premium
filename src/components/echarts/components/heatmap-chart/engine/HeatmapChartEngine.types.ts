import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  HeatmapChartCustomStyles,
  HeatmapChartEffect,
  HeatmapChartProps,
} from '../HeatmapChart.types';

export type HeatmapChartRegistryKey = Exclude<HeatmapChartEffect, 'none'>;

export type HeatmapChartResolvedConfig = {
  readonly customStyles?: HeatmapChartCustomStyles;
  readonly options?: EChartsOption;
};

export type HeatmapChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<HeatmapChartProps>;
