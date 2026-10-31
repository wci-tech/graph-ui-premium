import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { StackedAreaChartEffect } from '../StackedAreaChart.types';

import { getComponent } from './__registry__';
import type { StackedAreaChartResolvedConfig } from './StackedAreaChartEngine.types';


export const resolveStackedAreaChartEffect = (
  effect: StackedAreaChartEffect | undefined,
): StackedAreaChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};