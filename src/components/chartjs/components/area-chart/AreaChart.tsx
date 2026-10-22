/** @jsxImportSource @emotion/react */

import AreaChartEngine from './engine/AreaChartEngine';
import type { AreaChartProps } from './AreaChart.types';

export const AreaChart = (props: AreaChartProps) => {
  return <AreaChartEngine {...props} />;
};

export default AreaChart;
