import type { PieChartProps } from '../PieChart.types';

export type BasePieChartProps = PieChartProps & {
  readonly 'data-testid'?: string;
};