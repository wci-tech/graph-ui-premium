import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  TreemapChartCustomStyles,
  TreemapChartEffect,
  TreemapChartProps,
} from '../TreemapChart.types';

export type TreemapChartRegistryKey = Exclude<TreemapChartEffect, 'none'>;

export type TreemapChartResolvedConfig = {
  readonly customStyles?: TreemapChartCustomStyles;
  readonly options?: EChartsOption;
};

export type TreemapChartRegistryEntry = EChartsEffectStyleModule | ComponentType<TreemapChartProps>;