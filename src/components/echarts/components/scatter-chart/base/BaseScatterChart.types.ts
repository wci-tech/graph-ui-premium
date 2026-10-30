import type { ScatterChartProps } from '../ScatterChart.types';

export type BaseScatterChartProps = ScatterChartProps & {
  readonly 'data-testid'?: string;
};