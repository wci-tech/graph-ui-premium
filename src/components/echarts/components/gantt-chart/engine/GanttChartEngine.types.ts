import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  GanttChartCustomStyles,
  GanttChartEffect,
  GanttChartProps,
} from '../GanttChart.types';

export type GanttChartRegistryKey =
  Exclude<GanttChartEffect, 'none'>;

export type GanttChartResolvedConfig = {
  readonly customStyles?: GanttChartCustomStyles;
  readonly options?: EChartsOption;
};

export type GanttChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<GanttChartProps>;