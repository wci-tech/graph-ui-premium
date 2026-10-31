import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { StackedAreaChartEffect } from '../StackedAreaChart.types';

import { getComponent } from './__registry__';
import type { StackedAreaChartResolvedConfig } from './StackedAreaChartEngine.types';


export const resolveStackedAreaChartEffect = (
  effect: StackedAreaChartEffect | undefined,
): StackedAreaChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(
    effect,
  ) as ChartJSEffectStyleModule;

  return module.resolve() as
    | StackedAreaChartResolvedConfig
    | undefined;
};