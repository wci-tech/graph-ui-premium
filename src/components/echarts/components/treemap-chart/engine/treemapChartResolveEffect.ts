import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { TreemapChartEffect } from '../TreemapChart.types';

import { getComponent } from './__registry__';
import type { TreemapChartResolvedConfig } from './TreemapChartEngine.types';

export const resolveTreemapChartEffect = (
  effect: TreemapChartEffect | undefined,
): TreemapChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;
  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;
  return module?.resolve();
};