/** @jsxImportSource @emotion/react */
import WaterfallChartEngine from './engine/WaterfallChartEngine';
import type { WaterfallChartProps } from './WaterfallChart.types';

export const WaterfallChart = (props: WaterfallChartProps) => {
  return <WaterfallChartEngine {...props} />;
};

export default WaterfallChart;
