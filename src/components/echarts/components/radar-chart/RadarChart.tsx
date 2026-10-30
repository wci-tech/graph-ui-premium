import RadarChartEngine from './engine/RadarChartEngine';
import type { RadarChartProps } from './RadarChart.types';

export const RadarChart = (props: RadarChartProps) => {
  return <RadarChartEngine {...props} />;
};

export default RadarChart;
