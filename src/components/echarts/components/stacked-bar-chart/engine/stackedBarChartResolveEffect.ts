import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { StackedBarChartEffect } from '../StackedBarChart.types';

import { getComponent } from './__registry__';
import type { StackedBarChartResolvedConfig } from './StackedBarChartEngine.types';

export const resolveStackedBarChartEffect = (
  effect: StackedBarChartEffect | undefined,
): StackedBarChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};