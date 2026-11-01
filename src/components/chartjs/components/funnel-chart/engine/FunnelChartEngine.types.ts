import type {
  ITheme,
  StyleModule,
} from '@wci-tech/core-ui-premium';

import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type {
  FunnelChartCustomStyles,
  FunnelChartEffect,
  FunnelChartOptions,
} from '../FunnelChart.types';

export type FunnelChartRegistryKey =
  Exclude<FunnelChartEffect, 'none'>;

export interface FunnelChartResolvedConfig {
  readonly customStyles?: FunnelChartCustomStyles;
  readonly options?: Partial<FunnelChartOptions>;
}

export interface FunnelChartStateResolution {
  readonly theme: ITheme;
  readonly effect?: FunnelChartEffect;
}

export type FunnelChartStyleModule =
  StyleModule<
    FunnelChartStateResolution,
    FunnelChartResolvedConfig
  >;

export type FunnelChartRegistryEntry =
  | FunnelChartStyleModule
  | ChartJSEffectStyleModule;