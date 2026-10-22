import LineChartEngine from './engine/LineChartEngine';
import type { LineChartProps } from './LineChart.types';

export const LineChart = (props: LineChartProps) => {
  return <LineChartEngine {...props} />;
};

export default LineChart;
