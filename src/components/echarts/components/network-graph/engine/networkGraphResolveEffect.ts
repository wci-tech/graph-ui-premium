import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { NetworkGraphEffect } from '../NetworkGraph.types';

import { getComponent } from './__registry__';
import type { NetworkGraphResolvedConfig } from './NetworkGraphEngine.types';

export const resolveNetworkGraphEffect = (
  effect: NetworkGraphEffect | undefined,
): NetworkGraphResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;
  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;
  return module?.resolve();
};