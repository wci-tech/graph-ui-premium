import type { EChartsOption } from 'echarts';

import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';
import type {
  StackedAreaChartCustomStyles,
  StackedAreaChartEffect,
} from '@/components/echarts/components/stacked-area-chart/StackedAreaChart.types';

export type StackedAreaChartRegistryKey = Exclude<StackedAreaChartEffect, 'none'>;

export interface StackedAreaChartResolvedConfig {
  readonly customStyles?: StackedAreaChartCustomStyles;
  readonly options?: EChartsOption;
}

export type StackedAreaChartRegistryEntry = EChartsEffectStyleModule;