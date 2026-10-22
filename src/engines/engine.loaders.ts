import type { EngineModule, ResolvedChartEngine } from './engine.types';

export const ENGINE_LOADERS: Record<ResolvedChartEngine, () => Promise<EngineModule>> = {
  chartjs: async () => import('../components/chartjs/engine-layer/ChartJSEngine.module'),
  echarts: async () => import('../components/echarts/engine-layer/EChartsEngine.module'),
  uplot: async () => import('../components/uplot/engineLayer/UPlotEngine.module'),
};
