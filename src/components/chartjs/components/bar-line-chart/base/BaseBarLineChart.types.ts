import type { BarLineChartProps } from '../BarLineChart.types';

export type BaseBarLineChartProps = BarLineChartProps & {
  readonly 'data-testid'?: string;
};