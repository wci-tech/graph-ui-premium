import type { EChartsEffectStyleModule } from '@/components/echarts/common-effects';

import type { GaugeMeterEffect } from '../GaugeMeter.types';

import { getComponent } from './__registry__';
import type { GaugeMeterResolvedConfig } from './GaugeMeterEngine.types';

export const resolveGaugeMeterEffect = (
  effect: GaugeMeterEffect | undefined,
): GaugeMeterResolvedConfig | undefined => {
  if (!effect || effect === 'none') {
    return undefined;
  }

  const module = getComponent(effect) as
    | EChartsEffectStyleModule
    | undefined;

  return module?.resolve();
};