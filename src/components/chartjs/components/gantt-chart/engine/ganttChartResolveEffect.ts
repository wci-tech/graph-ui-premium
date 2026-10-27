import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { GanttChartEffect } from '../GanttChart.types';

import { getComponent } from './__registry__';
import type { GanttChartResolvedConfig } from './GanttChartEngine.types';

export const resolveGanttChartEffect = (
  effect: GanttChartEffect | undefined,
): GanttChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(
    effect,
  ) as ChartJSEffectStyleModule;

  return module.resolve() as
    | GanttChartResolvedConfig
    | undefined;
};