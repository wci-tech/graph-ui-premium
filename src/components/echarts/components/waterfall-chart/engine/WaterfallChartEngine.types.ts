import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  WaterfallChartCustomStyles,
  WaterfallChartEffect,
  WaterfallChartProps,
} from '../WaterfallChart.types';

export type WaterfallChartRegistryKey = Exclude<WaterfallChartEffect, 'none'>;

export type WaterfallChartResolvedConfig = {
  readonly customStyles?: WaterfallChartCustomStyles;
  readonly options?: EChartsOption;
};

export type WaterfallChartRegistryEntry =
  | EChartsEffectStyleModule
  | ComponentType<WaterfallChartProps>;