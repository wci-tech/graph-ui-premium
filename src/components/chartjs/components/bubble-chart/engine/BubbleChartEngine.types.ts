import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  BubbleChartCustomStyles,
  BubbleChartEffect,
  BubbleChartOptions,
  BubbleChartProps,
} from '../BubbleChart.types';

export type BubbleChartRegistryKey = Exclude<BubbleChartEffect, 'none'>;

export type BubbleChartResolvedConfig = {
  readonly customStyles?: BubbleChartCustomStyles;
  readonly options?: Partial<BubbleChartOptions>;
};

export type BubbleChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<BubbleChartProps>;