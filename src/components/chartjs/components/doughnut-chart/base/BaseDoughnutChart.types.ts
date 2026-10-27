import type { DoughnutChartProps } from '../DoughnutChart.types';

export type BaseDoughnutChartProps =
  DoughnutChartProps & {
    readonly 'data-testid'?: string;
  };