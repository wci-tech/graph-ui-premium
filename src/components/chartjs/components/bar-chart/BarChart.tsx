/** @jsxImportSource @emotion/react */

import BarChartEngine from './engine/BarChartEngine';
import type { BarChartProps } from './BarChart.types';

export const BarChart = (props: BarChartProps) => {
  return <BarChartEngine {...props} />;
};

export default BarChart;
