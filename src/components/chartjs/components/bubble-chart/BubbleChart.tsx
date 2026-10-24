/** @jsxImportSource @emotion/react */

import BubbleChartEngine from './engine/BubbleChartEngine';
import type { BubbleChartProps } from './BubbleChart.types';

export const BubbleChart = (props: BubbleChartProps) => {
  return <BubbleChartEngine {...props} />;
};

export default BubbleChart;
