/** @jsxImportSource @emotion/react */

import TreemapChartEngine from './engine/TreemapChartEngine';
import type { TreemapChartProps } from './TreemapChart.types';

export const TreemapChart = (props: TreemapChartProps) => {
  return <TreemapChartEngine {...props} />;
};

export default TreemapChart;
