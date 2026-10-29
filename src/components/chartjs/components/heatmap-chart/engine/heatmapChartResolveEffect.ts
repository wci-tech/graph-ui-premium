import type { ChartJSEffectStyleModule } from '@/components/chartjs/common-effects';

import type { HeatmapChartEffect } from '../HeatmapChart.types';

import { getComponent } from './__registry__';
import type { HeatmapChartResolvedConfig } from './HeatmapChartEngine.types';

export const resolveHeatmapChartEffect = (
  effect: HeatmapChartEffect | undefined,
): HeatmapChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module =
    getComponent(
      effect,
    ) as ChartJSEffectStyleModule;

  return module.resolve() as
    | HeatmapChartResolvedConfig
    | undefined;
};