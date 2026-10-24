import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  BubbleChartCustomStyles,
  BubbleChartEffect,
  BubbleChartProps,
} from '../BubbleChart.types';

export type BubbleChartRegistryKey =
  Exclude<BubbleChartEffect, 'none'>;

export type BubbleChartResolvedConfig = {
  readonly customStyles?: BubbleChartCustomStyles;
  readonly options?: EChartsOption;
};

export type BubbleChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<BubbleChartProps>;