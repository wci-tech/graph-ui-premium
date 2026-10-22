import type { ChartType, ResolvedChartEngine } from './engine.types';

export const DEFAULT_ENGINE: ResolvedChartEngine = 'chartjs';

export const AUTO_ENGINE_PRIORITY: readonly ResolvedChartEngine[] = ['chartjs', 'echarts', 'uplot'];

export const ENGINE_SUPPORTED_TYPES: Record<ResolvedChartEngine, readonly ChartType[]> = {
  chartjs: [
    'area',
    'bar',
    'bar-line',
    'line',
    'bubble',
    'candlestick',
    'doughnut',
    'funnel',
    'gantt',
    'heatmap',
    'pie',
    'radar',
    'scatter',
    'network',
    'stacked-area',
    'stacked-bar',
    'waterfall',
    'treemap',
    'gauge',
    'scatter-line',
  ],

  echarts: [
    'area',
    'bar',
    'bar-line',
    'line',
    'bubble',
    'sunburst',
    'candlestick',
    'doughnut',
    'funnel',
    'gantt',
    'heatmap',
    'pie',
    'radar',
    'scatter',
    'network',
    'stacked-area',
    'stacked-bar',
    'waterfall',
    'treemap',
    'gauge',
    'scatter-line',
  ],

  uplot: ['line'],
};

export const supportsChartType = (engine: ResolvedChartEngine, type: ChartType): boolean =>
  ENGINE_SUPPORTED_TYPES[engine].includes(type);
