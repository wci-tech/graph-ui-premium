import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { PieChartEffect } from '../PieChart.types';

import { getComponent } from './__registry__';
import type { PieChartResolvedConfig } from './PieChartEngine.types';

export const resolvePieChartEffect = (
  effect: PieChartEffect | undefined,
): PieChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as PieChartResolvedConfig | undefined;
};