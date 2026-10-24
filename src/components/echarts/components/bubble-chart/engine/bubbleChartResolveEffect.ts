import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { BubbleChartEffect } from '../BubbleChart.types';

import { getComponent } from './__registry__';
import type { BubbleChartResolvedConfig } from './BubbleChartEngine.types';

export const resolveBubbleChartEffect = (
  effect: BubbleChartEffect | undefined,
): BubbleChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(
    effect,
  ) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};