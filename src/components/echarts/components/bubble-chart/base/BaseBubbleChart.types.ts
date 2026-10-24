import type { BubbleChartProps } from '../BubbleChart.types';

export type BaseBubbleChartProps = BubbleChartProps & {
  readonly 'data-testid'?: string;
};