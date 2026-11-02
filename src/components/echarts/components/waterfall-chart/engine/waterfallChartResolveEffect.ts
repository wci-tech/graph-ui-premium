import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { WaterfallChartEffect } from '../WaterfallChart.types';

import { getComponent } from './__registry__';
import type { WaterfallChartResolvedConfig } from './WaterfallChartEngine.types';

export const resolveWaterfallChartEffect = (
  effect: WaterfallChartEffect | undefined,
): WaterfallChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};