import DoughnutChartEngine from './engine/DoughnutChartEngine';
import type { DoughnutChartProps } from './DoughnutChart.types';

const DoughnutChart = (props: DoughnutChartProps) => {
  return <DoughnutChartEngine {...props} />;
};

export default DoughnutChart;
