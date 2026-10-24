/** @jsxImportSource @emotion/react */

import BarLineChartEngine from './engine/BarLineChartEngine';
import type { BarLineChartProps } from './BarLineChart.types';

export const BarLineChart = (props: BarLineChartProps) => {
  return <BarLineChartEngine {...props} />;
};

export default BarLineChart;
