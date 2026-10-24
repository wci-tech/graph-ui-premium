import type { BarChartProps } from '../BarChart.types';

export type BaseBarChartProps = BarChartProps & {
  readonly 'data-testid'?: string;
};
