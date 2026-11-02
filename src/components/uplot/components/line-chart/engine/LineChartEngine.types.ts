import type { ComponentType } from 'react';

import type { StyleModule } from '@wci-tech/core-ui-premium';

import type {
  LineChartCustomStyles,
  LineChartEffect,
  LineChartProps,
} from '../LineChart.types';

export type LineChartRegistryKey = Exclude<LineChartEffect, 'none'>;

export type LineChartResolvedConfig = {
  readonly customStyles?: LineChartCustomStyles;
  readonly options?: Record<string, unknown>;
};

export type LineChartStateResolution = Readonly<{
  effect?: LineChartEffect;
}>;

export type LineChartStyleModule = StyleModule<LineChartStateResolution, LineChartResolvedConfig>;

export type LineChartRegistryEntry = LineChartStyleModule | ComponentType<LineChartProps>;