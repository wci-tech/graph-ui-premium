/** @jsxImportSource @emotion/react */

import HeatmapChartEngine from './engine/HeatmapChartEngine';
import type { HeatmapChartProps } from './HeatmapChart.types';

export const HeatmapChart = (props: HeatmapChartProps) => {
  return <HeatmapChartEngine {...props} />;
};

export default HeatmapChart;
