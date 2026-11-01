import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { TreemapChartEffect } from '../TreemapChart.types';

import { getComponent } from './__registry__';
import type { TreemapChartResolvedConfig } from './TreemapChartEngine.types';

export const resolveTreemapChartEffect = (
  effect: TreemapChartEffect | undefined,
): TreemapChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;
  const module = getComponent(effect) as ChartJSEffectStyleModule;
  return module.resolve() as TreemapChartResolvedConfig | undefined;
};