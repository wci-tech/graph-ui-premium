import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { GanttChartEffect } from '../GanttChart.types';

import { getComponent } from './__registry__';
import type { GanttChartResolvedConfig } from './GanttChartEngine.types';

export const resolveGanttChartEffect = (
  effect: GanttChartEffect | undefined,
): GanttChartResolvedConfig | undefined => {
  if (
    !effect ||
    effect === 'none'
  ) {
    return undefined;
  }

  const module = getComponent(
    effect,
  ) as
    | EChartsEffectStyleModule
    | undefined;

  return module?.resolve();
};