import type { EChartsEffectStyleModule } from '../../../common-effects/EChartsEffect.types';
import type { BarChartEffect } from '../BarChart.types';

import { getComponent } from './__registry__';
import type { BarChartResolvedConfig } from './BarChartEngine.types';

export const resolveBarChartEffect = (
  effect: BarChartEffect | undefined,
): BarChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(effect) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};
