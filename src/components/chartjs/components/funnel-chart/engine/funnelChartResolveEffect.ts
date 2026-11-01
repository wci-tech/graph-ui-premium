import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { FunnelChartEffect } from '../FunnelChart.types';

import { getComponent } from './__registry__';
import type { FunnelChartResolvedConfig } from './FunnelChartEngine.types';

export const resolveFunnelChartEffect = (
  effect: FunnelChartEffect | undefined,
): FunnelChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module =
    getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as
    | FunnelChartResolvedConfig
    | undefined;
};