import type { GanttChartProps } from '../GanttChart.types';

export type BaseGanttChartProps =
  GanttChartProps & {
    'data-testid'?: string;
  };