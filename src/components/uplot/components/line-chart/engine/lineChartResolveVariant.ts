import type { LineChartVariant } from '../LineChart.types';

import { getComponent } from './__registry__';
import type {
  LineChartResolvedConfig,
  LineChartStateResolution,
  LineChartStyleModule,
} from './LineChartEngine.types';

export const resolveLineChartVariant = (
  variant: LineChartVariant | undefined,
  resolution: LineChartStateResolution,
): LineChartResolvedConfig => {
  const resolvedVariant: LineChartVariant = variant ?? 'primary';

  const module = getComponent(resolvedVariant) as LineChartStyleModule;

  const resolved = module.resolve({
    ...resolution,
    variant: resolvedVariant,
  });

  return resolved ?? {};
};
