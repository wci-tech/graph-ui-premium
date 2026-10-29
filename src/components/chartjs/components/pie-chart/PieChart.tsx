/** @jsxImportSource @emotion/react */

import PieChartEngine from './engine/PieChartEngine';
import type { PieChartProps } from './PieChart.types';

export const PieChart = (props: PieChartProps) => {
  return <PieChartEngine {...props} />;
};

export default PieChart;
