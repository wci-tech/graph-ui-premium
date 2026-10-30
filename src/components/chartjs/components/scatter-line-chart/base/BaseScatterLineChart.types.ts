import type { ScatterLineChartProps } from '../ScatterLineChart.types';

export type BaseScatterLineChartProps = ScatterLineChartProps & {
  readonly 'data-testid'?: string;
};