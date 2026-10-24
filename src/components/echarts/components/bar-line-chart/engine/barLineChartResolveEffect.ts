import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type {
  BarLineChartEffect,
} from '../BarLineChart.types';

import { getComponent } from './__registry__';
import type {
  BarLineChartResolvedConfig,
} from './BarLineChartEngine.types';

export const resolveBarLineChartEffect = (
  effect: BarLineChartEffect | undefined,
): BarLineChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(
    effect,
  ) as EChartsEffectStyleModule | undefined;

  return module?.resolve();
};