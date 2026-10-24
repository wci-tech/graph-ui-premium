import type { ComponentType } from 'react';

import type { ITheme, StyleModule } from '@wci-tech/core-ui-premium';

import type {
  LineChartCustomStyles,
  LineChartEffect,
  LineChartProps,
  LineChartVariant,
} from '../LineChart.types';

export type LineChartRegistryKey = LineChartVariant | Exclude<LineChartEffect, 'none'>;

export type LineChartResolvedConfig = {
  readonly customStyles?: LineChartCustomStyles;
  readonly colors?: string[];
  readonly options?: Record<string, unknown>;
};

export type LineChartStateResolution = Readonly<{
  theme: ITheme;
  variant: LineChartVariant;
  effect?: LineChartEffect;
}>;

export type LineChartStyleModule = StyleModule<LineChartStateResolution, LineChartResolvedConfig>;

export type LineChartRegistryEntry = LineChartStyleModule | ComponentType<LineChartProps>;
