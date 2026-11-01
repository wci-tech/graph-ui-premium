import StackedBarChartEngine from './engine/StackedBarChartEngine';
import type { StackedBarChartProps } from './StackedBarChart.types';

const StackedBarChart = (props: StackedBarChartProps) => {
  return <StackedBarChartEngine {...props} />;
};

export default StackedBarChart;
