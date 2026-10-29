import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  PieChartCustomStyles,
  PieChartEffect,
  PieChartOptions,
  PieChartProps,
} from '../PieChart.types';

export type PieChartRegistryKey = Exclude<PieChartEffect, 'none'>;

export type PieChartResolvedConfig = {
  readonly customStyles?: PieChartCustomStyles;
  readonly options?: Partial<PieChartOptions>;
};

export type PieChartRegistryEntry = ChartJSEffectStyleModule | ComponentType<PieChartProps>;