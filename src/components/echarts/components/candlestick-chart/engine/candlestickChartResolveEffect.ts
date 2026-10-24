import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { CandlestickChartEffect } from '../CandlestickChart.types';

import { getComponent } from './__registry__';
import type { CandlestickChartResolvedConfig } from './CandlestickChartEngine.types';

export const resolveCandlestickChartEffect = (
  effect: CandlestickChartEffect | undefined,
): CandlestickChartResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(effect) as
    | EChartsEffectStyleModule
    | undefined;

  return module?.resolve();
};