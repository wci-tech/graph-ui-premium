import ScatterChartEngine from './engine/ScatterChartEngine';
import type { ScatterChartProps } from './ScatterChart.types';

const ScatterChart = (props: ScatterChartProps) => {
  return <ScatterChartEngine {...props} />;
};

export default ScatterChart;
