import type { ComponentType } from 'react';

import type { ChartJSEffectStyleModule } from '../../../common-effects';
import type {
  AreaChartCustomStyles,
  AreaChartEffect,
  AreaChartOptions,
  AreaChartProps,
} from '../AreaChart.types';

export type AreaChartRegistryKey = Exclude<AreaChartEffect, 'none'>;

export type AreaChartResolvedConfig = {
  readonly customStyles?: AreaChartCustomStyles;

  readonly options?: Partial<AreaChartOptions>;
};

export type AreaChartRegistryEntry = ChartJSEffectStyleModule | ComponentType<AreaChartProps>;
