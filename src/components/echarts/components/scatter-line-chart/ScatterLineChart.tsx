import ScatterLineChartEngine from './engine/ScatterLineChartEngine';
import type { ScatterLineChartProps } from './ScatterLineChart.types';

const ScatterLineChart = (props: ScatterLineChartProps) => {
  return <ScatterLineChartEngine {...props} />;
};

export default ScatterLineChart;
