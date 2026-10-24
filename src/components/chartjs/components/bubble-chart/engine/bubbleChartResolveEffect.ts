import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { BubbleChartEffect } from '../BubbleChart.types';

import { getComponent } from './__registry__';
import type { BubbleChartResolvedConfig } from './BubbleChartEngine.types';

export const resolveBubbleChartEffect = (
  effect: BubbleChartEffect | undefined,
): BubbleChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as BubbleChartResolvedConfig | undefined;
};