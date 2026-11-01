import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  FunnelChartCustomStyles,
  FunnelChartEffect,
  FunnelChartOptions,
} from '../FunnelChart.types';

export type FunnelChartRegistryKey = Exclude<FunnelChartEffect, 'none'>;

export interface FunnelChartResolvedConfig {
  readonly customStyles?: FunnelChartCustomStyles;
  readonly options?: Partial<FunnelChartOptions>;
}

export type FunnelChartRegistryEntry = EChartsEffectStyleModule;