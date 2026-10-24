import BarLineChartEngine from './engine/BarLineChartEngine';
import type { BarLineChartProps } from './BarLineChart.types';

const BarLineChart = (props: BarLineChartProps) => {
  return <BarLineChartEngine {...props} />;
};

export default BarLineChart;
