import type { BarChartVariant } from '../BarChart.types';

import { getComponent } from './__registry__';
import type {
  BarChartResolvedConfig,
  BarChartStateResolution,
  BarChartStyleModule,
} from './BarChartEngine.types';

export const resolveBarChartVariant = (
  variant: BarChartVariant | undefined,
  resolution: BarChartStateResolution,
): BarChartResolvedConfig => {
  const resolvedVariant: BarChartVariant = variant ?? 'primary';

  const module = getComponent(resolvedVariant) as BarChartStyleModule;

  const resolved = module.resolve({
    ...resolution,
    variant: resolvedVariant,
  });

  return resolved ?? {};
};
