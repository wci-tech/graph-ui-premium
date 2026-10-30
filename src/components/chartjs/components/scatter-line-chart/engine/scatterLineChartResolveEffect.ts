import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { ScatterLineChartEffect } from '../ScatterLineChart.types';

import { getComponent } from './__registry__';
import type { ScatterLineChartResolvedConfig } from './ScatterLineChartEngine.types';

export const resolveScatterLineChartEffect = (
  effect: ScatterLineChartEffect | undefined,
): ScatterLineChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as ScatterLineChartResolvedConfig | undefined;
};