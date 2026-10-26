import type { EChartsEffectStyleModule } from '../../../common-effects';
import type {
  DoughnutChartCustomStyles,
  DoughnutChartEffect,
  DoughnutChartOptions,
} from '../DoughnutChart.types';

export type DoughnutChartRegistryKey = Exclude<DoughnutChartEffect, 'none'>;

export type DoughnutChartResolvedConfig = {
  readonly customStyles?: DoughnutChartCustomStyles;
  readonly options?: Partial<DoughnutChartOptions>;
};

export type DoughnutChartRegistryEntry = EChartsEffectStyleModule;