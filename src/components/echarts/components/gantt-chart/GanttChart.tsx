import GanttChartEngine from './engine/GanttChartEngine';
import type { GanttChartProps } from './GanttChart.types';

export const GanttChart = (props: GanttChartProps) => {
  return <GanttChartEngine {...props} />;
};

export default GanttChart;
