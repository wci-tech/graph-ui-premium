import WaterfallChartEngine from './engine/WaterfallChartEngine';
import type { WaterfallChartProps } from './WaterfallChart.types';

const WaterfallChart = (props: WaterfallChartProps) => {
  return <WaterfallChartEngine {...props} />;
};

export default WaterfallChart;
