import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { HeatmapChartDefinition } from './base/BaseHeatmapChart.utils';

export type HeatmapChartEffect = EChartsEffect;

export type HeatmapCellSizeMode = 'equal' | 'value';

export type HeatmapChartPoint = readonly [number, number, number];

export interface HeatmapChartSeries {
  readonly label?: string;
  readonly name?: string;
  readonly color?: string;
  readonly data: readonly HeatmapChartPoint[];
}

export interface HeatmapChartData {
  readonly xLabels: readonly string[];
  readonly yLabels: readonly string[];
  readonly series: readonly HeatmapChartSeries[];
}

export interface HeatmapChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type HeatmapChartResolvedColors = Required<HeatmapChartColors>;

export interface HeatmapChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type HeatmapChartOptions = EChartsOption & {
  readonly showLabels?: boolean;
  readonly boldLabels?: boolean;
  readonly cellSizeMode?: HeatmapCellSizeMode;
  readonly cellMinSizeRatio?: number;
  readonly cellGap?: number;
  readonly cellBorderRadius?: number;
  readonly crosshair?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface HeatmapChartProps {
  readonly data: HeatmapChartData;
  readonly colors?: HeatmapChartColors;
  readonly options?: HeatmapChartOptions;
  readonly chartId?: string;
  readonly effect?: HeatmapChartEffect;
  readonly customStyles?: HeatmapChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

/* -------------------------------------------------------------------------- */
/* Hook Types                                                                 */
/* -------------------------------------------------------------------------- */

export type HeatmapChartHookProps = Pick<
  HeatmapChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface HeatmapChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface HeatmapChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: HeatmapChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: HeatmapChartWrapperProps;
  readonly isReady: boolean;
}

/* -------------------------------------------------------------------------- */
/* Style Types                                                                */
/* -------------------------------------------------------------------------- */

export type HeatmapChartStyleProps = OptionalWithUndefined<
  Pick<HeatmapChartProps, 'effect'>
>;