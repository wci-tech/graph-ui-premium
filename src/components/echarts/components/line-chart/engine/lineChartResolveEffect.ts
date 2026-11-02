import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { LineChartEffect } from '../LineChart.types';

import { getComponent } from './__registry__';
import type { LineChartResolvedConfig } from './LineChartEngine.types';

export const resolveLineChartEffect = (
  effect: LineChartEffect | undefined,
): LineChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module =
    getComponent(
      effect,
    ) as EChartsEffectStyleModule;

  return module.resolve() as
    | LineChartResolvedConfig
    | undefined;
};