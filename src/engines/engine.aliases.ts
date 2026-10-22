import type { ChartEngine, ResolvedChartEngine } from './engine.types';

export type ExplicitChartEngine = Exclude<ChartEngine, 'auto'>;

export const CHART_ENGINE_ALIASES: Record<ExplicitChartEngine, ResolvedChartEngine> = {
  'chart-1': 'chartjs',
  'chart-2': 'echarts',
  'chart-3': 'uplot',
};

export const resolveEngineAlias = (engine: ExplicitChartEngine): ResolvedChartEngine =>
  CHART_ENGINE_ALIASES[engine];
