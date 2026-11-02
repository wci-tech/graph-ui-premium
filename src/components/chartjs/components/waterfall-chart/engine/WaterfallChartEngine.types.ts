import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  WaterfallChartCustomStyles,
  WaterfallChartEffect,
  WaterfallChartOptions,
  WaterfallChartProps,
} from '../WaterfallChart.types';

export type WaterfallChartRegistryKey = Exclude<WaterfallChartEffect, 'none'>;

export type WaterfallChartResolvedConfig = {
  readonly customStyles?: WaterfallChartCustomStyles;
  readonly options?: Partial<WaterfallChartOptions>;
};

export type WaterfallChartRegistryEntry =
  | ChartJSEffectStyleModule
  | ComponentType<WaterfallChartProps>;