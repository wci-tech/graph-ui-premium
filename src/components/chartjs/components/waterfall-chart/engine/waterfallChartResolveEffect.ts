import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { WaterfallChartEffect } from '../WaterfallChart.types';

import { getComponent } from './__registry__';
import type { WaterfallChartResolvedConfig } from './WaterfallChartEngine.types';

export const resolveWaterfallChartEffect = (
  effect: WaterfallChartEffect | undefined,
): WaterfallChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as WaterfallChartResolvedConfig | undefined;
};