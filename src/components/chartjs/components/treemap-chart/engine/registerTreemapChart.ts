import type { ChartComponentLike } from 'chart.js';
import ChartJS from 'chart.js/auto';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

let isTreemapRegistered = false;

const treemapController = TreemapController as unknown as ChartComponentLike;
const treemapElement = TreemapElement as unknown as ChartComponentLike;

export const registerTreemapChart = (): void => {
  if (isTreemapRegistered) return;
  ChartJS.register(treemapController, treemapElement);
  isTreemapRegistered = true;
};