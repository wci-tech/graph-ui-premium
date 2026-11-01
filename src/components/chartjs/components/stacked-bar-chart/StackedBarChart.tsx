/** @jsxImportSource @emotion/react */
import StackedBarChartEngine from './engine/StackedBarChartEngine';
import type { StackedBarChartProps } from './StackedBarChart.types';

export const StackedBarChart = (props: StackedBarChartProps) => {
  return <StackedBarChartEngine {...props} />;
};

export default StackedBarChart;
