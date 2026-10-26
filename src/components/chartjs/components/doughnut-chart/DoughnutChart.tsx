/** @jsxImportSource @emotion/react */

import DoughnutChartEngine from './engine/DoughnutChartEngine';
import type { DoughnutChartProps } from './DoughnutChart.types';

export const DoughnutChart = (props: DoughnutChartProps) => {
  return <DoughnutChartEngine {...props} />;
};

export default DoughnutChart;
