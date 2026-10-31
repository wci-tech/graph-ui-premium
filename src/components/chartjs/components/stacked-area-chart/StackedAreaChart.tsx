/** @jsxImportSource @emotion/react */
import StackedAreaChartEngine from './engine/StackedAreaChartEngine';
import type { StackedAreaChartProps } from './StackedAreaChart.types';

export const StackedAreaChart = (props: StackedAreaChartProps) => {
  return <StackedAreaChartEngine {...props} />;
};

export default StackedAreaChart;
