import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { ScatterChartEffect } from '../ScatterChart.types';

import { getComponent } from './__registry__';
import type { ScatterChartResolvedConfig } from './ScatterChartEngine.types';

export const resolveScatterChartEffect = (
  effect: ScatterChartEffect | undefined,
): ScatterChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};