import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { DoughnutChartEffect } from '../DoughnutChart.types';

import { getComponent } from './__registry__';
import type { DoughnutChartResolvedConfig } from './DoughnutChartEngine.types';

export const resolveDoughnutChartEffect = (
  effect:
    | DoughnutChartEffect
    | undefined,
): DoughnutChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module =
    getComponent(
      effect,
    ) as ChartJSEffectStyleModule;

  return module.resolve() as
    | DoughnutChartResolvedConfig
    | undefined;
};