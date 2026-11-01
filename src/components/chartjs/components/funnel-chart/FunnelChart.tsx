/** @jsxImportSource @emotion/react */

import FunnelChartEngine from './engine/FunnelChartEngine';
import type { FunnelChartProps } from './FunnelChart.types';

export const FunnelChart = (props: FunnelChartProps) => {
  return <FunnelChartEngine {...props} />;
};

export default FunnelChart;
