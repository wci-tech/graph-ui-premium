import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { BarLineChartEffect } from '../BarLineChart.types';

import { getComponent } from './__registry__';
import type { BarLineChartResolvedConfig } from './BarLineChartEngine.types';

export const resolveBarLineChartEffect = (
  effect:
    | BarLineChartEffect
    | undefined,
):
  | BarLineChartResolvedConfig
  | undefined => {
  if (
    !effect ||
    effect === 'none'
  ) {
    return undefined;
  }

  const module =
    getComponent(
      effect,
    ) as ChartJSEffectStyleModule;

  return module.resolve() as
    | BarLineChartResolvedConfig
    | undefined;
};