import type { LineChartEffect } from '../LineChart.types';

import { getComponent } from './__registry__';
import type {
  LineChartResolvedConfig,
  LineChartStateResolution,
  LineChartStyleModule,
} from './LineChartEngine.types';

export const resolveLineChartEffect = (
  effect: LineChartEffect | undefined,
  resolution: LineChartStateResolution,
): LineChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') return undefined;

  const module = getComponent(effect) as LineChartStyleModule | undefined;

  return module?.resolve({
    ...resolution,
    effect,
  });
};
