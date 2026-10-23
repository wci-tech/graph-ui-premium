import type { ComponentType } from 'react';

import type { ITheme, StyleModule } from '@wci-tech/core-ui';

import type { EChartsEffectStyleModule } from '../../../common-effects/EChartsEffect.types';
import type {
  BarChartCustomStyles,
  BarChartEffect,
  BarChartProps,
  BarChartVariant,
} from '../BarChart.types';

export type BarChartRegistryKey = BarChartVariant | Exclude<BarChartEffect, 'none'>;

export type BarChartResolvedConfig = {
  readonly customStyles?: BarChartCustomStyles;

  readonly colors?: string[];

  readonly options?: Record<string, unknown>;
};

export type BarChartStateResolution = Readonly<{
  theme: ITheme;

  variant: BarChartVariant;

  effect?: BarChartEffect;
}>;

export type BarChartStyleModule = StyleModule<BarChartStateResolution, BarChartResolvedConfig>;

export type BarChartRegistryEntry =
  | BarChartStyleModule
  | EChartsEffectStyleModule
  | ComponentType<BarChartProps>;
