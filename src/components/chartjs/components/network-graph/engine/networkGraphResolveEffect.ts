import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { NetworkGraphEffect } from '../NetworkGraph.types';

import { getComponent } from './__registry__';
import type { NetworkGraphResolvedConfig } from './NetworkGraphEngine.types';

export const resolveNetworkGraphEffect = (
  effect: NetworkGraphEffect | undefined,
): NetworkGraphResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }
  const module = getComponent(effect) as ChartJSEffectStyleModule;
  return module.resolve() as NetworkGraphResolvedConfig | undefined;
};