import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { LineChartEffect } from '../LineChart.types';

import { getComponent } from './__registry__';
import type { LineChartResolvedConfig } from './LineChartEngine.types';

export const resolveLineChartEffect = (
  effect: LineChartEffect | undefined,
): LineChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as ChartJSEffectStyleModule;

  return module.resolve() as LineChartResolvedConfig | undefined;
};