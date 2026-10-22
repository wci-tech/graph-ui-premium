import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { AreaChartEffect } from '../AreaChart.types';

import { getComponent } from './__registry__';
import type { AreaChartResolvedConfig } from './AreaChartEngine.types';

export const resolveAreaChartEffect = (
  effect: AreaChartEffect | undefined,
): AreaChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as AreaChartResolvedConfig | undefined;
};
