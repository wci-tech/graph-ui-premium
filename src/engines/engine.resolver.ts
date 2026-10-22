import { resolveEngineAlias } from './engine.aliases';
import { AUTO_ENGINE_PRIORITY, DEFAULT_ENGINE, supportsChartType } from './engine.matrix';
import type { ChartEngine, ChartType, ResolvedChartEngine } from './engine.types';

export type ResolveChartEngineParams = {
  readonly engine?: ChartEngine;
  readonly type: ChartType;
};

export const resolveChartEngine = ({
  engine = 'auto',
  type,
}: ResolveChartEngineParams): ResolvedChartEngine | null => {
  if (engine !== 'auto') {
    const resolvedEngine = resolveEngineAlias(engine);

    return supportsChartType(resolvedEngine, type) ? resolvedEngine : null;
  }

  if (supportsChartType(DEFAULT_ENGINE, type)) {
    return DEFAULT_ENGINE;
  }

  return AUTO_ENGINE_PRIORITY.find((engineId) => supportsChartType(engineId, type)) ?? null;
};
