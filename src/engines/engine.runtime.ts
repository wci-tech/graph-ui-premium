import { ENGINE_LOADERS } from './engine.loaders';
import type { EngineModule, ResolvedChartEngine } from './engine.types';

const engineModuleCache = new Map<ResolvedChartEngine, Promise<EngineModule>>();

export const loadChartEngine = (engine: ResolvedChartEngine): Promise<EngineModule> => {
  const cachedModule = engineModuleCache.get(engine);

  if (cachedModule) {
    return cachedModule;
  }

  const modulePromise = ENGINE_LOADERS[engine]();

  engineModuleCache.set(engine, modulePromise);

  return modulePromise;
};
