import BarChartEngine from './engine/BarChartEngine';
import type { BarChartProps } from './BarChart.types';

const BarChart = (props: BarChartProps) => {
  return <BarChartEngine {...props} />;
};

export default BarChart;
