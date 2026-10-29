import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { PieChartCustomStyles, PieChartEffect, PieChartProps } from '../PieChart.types';

export type PieChartRegistryKey = Exclude<PieChartEffect, 'none'>;

export type PieChartResolvedConfig = {
  readonly customStyles?: PieChartCustomStyles;
  readonly options?: EChartsOption;
};

export type PieChartRegistryEntry = EChartsEffectStyleModule | ComponentType<PieChartProps>;