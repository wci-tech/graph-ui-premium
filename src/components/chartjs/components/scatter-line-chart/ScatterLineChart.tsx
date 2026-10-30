/** @jsxImportSource @emotion/react */

import ScatterLineChartEngine from './engine/ScatterLineChartEngine';
import type { ScatterLineChartProps } from './ScatterLineChart.types';

export const ScatterLineChart = (props: ScatterLineChartProps) => {
  return <ScatterLineChartEngine {...props} />;
};

export default ScatterLineChart;
