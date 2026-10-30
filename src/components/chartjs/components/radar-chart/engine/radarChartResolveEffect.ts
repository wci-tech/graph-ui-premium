import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { RadarChartEffect } from '../RadarChart.types';

import { getComponent } from './__registry__';
import type { RadarChartResolvedConfig } from './RadarChartEngine.types';

export const resolveRadarChartEffect = (
  effect: RadarChartEffect | undefined,
): RadarChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as RadarChartResolvedConfig | undefined;
};