import TreemapChartEngine from './engine/TreemapChartEngine';
import type { TreemapChartProps } from './TreemapChart.types';

const TreemapChart = (props: TreemapChartProps) => {
  return <TreemapChartEngine {...props} />;
};

export default TreemapChart;
