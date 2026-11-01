import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { StackedBarChartEffect } from '../StackedBarChart.types';

import { getComponent } from './__registry__';
import type { StackedBarChartResolvedConfig } from './StackedBarChartEngine.types';

export const resolveStackedBarChartEffect = (
  effect: StackedBarChartEffect | undefined,
): StackedBarChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as StackedBarChartResolvedConfig | undefined;
};