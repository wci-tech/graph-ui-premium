import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { PieChartEffect } from '../PieChart.types';

import { getComponent } from './__registry__';
import type { PieChartResolvedConfig } from './PieChartEngine.types';

export const resolvePieChartEffect = (
  effect: PieChartEffect | undefined,
): PieChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};