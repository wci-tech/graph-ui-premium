import type { ComponentType } from 'react';

import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { AreaChartCustomStyles, AreaChartEffect, AreaChartProps } from '../AreaChart.types';

export type AreaChartRegistryKey = Exclude<AreaChartEffect, 'none'>;

export type AreaChartResolvedConfig = {
  readonly customStyles?: AreaChartCustomStyles;
  readonly options?: EChartsOption;
};

export type AreaChartRegistryEntry = EChartsEffectStyleModule | ComponentType<AreaChartProps>;
