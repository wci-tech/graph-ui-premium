/** @jsxImportSource @emotion/react */

import CandlestickChartEngine from './engine/CandlestickChartEngine';
import type { CandlestickChartProps } from './CandlestickChart.types';

export const CandlestickChart = (props: CandlestickChartProps) => {
  return <CandlestickChartEngine {...props} />;
};

export default CandlestickChart;
