import FunnelChartEngine from './engine/FunnelChartEngine';
import type { FunnelChartProps } from './FunnelChart.types';

const FunnelChart = (props: FunnelChartProps) => {
  return <FunnelChartEngine {...props} />;
};

export default FunnelChart;
