import type { StackedBarChartProps } from '../StackedBarChart.types';

export type BaseStackedBarChartProps = StackedBarChartProps & {
  readonly 'data-testid'?: string;
};