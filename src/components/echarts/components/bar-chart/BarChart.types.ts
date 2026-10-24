import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { BarChartDefinition } from './base/BaseBarChart.utils';

export type BarChartEffect = EChartsEffect;

export interface BarChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly stack?: string;
  readonly borderRadius?: number;
  readonly barWidth?: number;
}

export interface BarChartData {
  readonly labels: string[];
  readonly series: BarChartSeries[];
}

export interface BarChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

/**
 * Internal resolved colors.
 *
 * CSS variables and consumer overrides have already
 * been converted to values that can be used by ECharts.
 */
export type BarChartResolvedColors = Required<BarChartColors>;

export interface BarChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type BarChartOptions = EChartsOption & {
  readonly horizontal?: boolean;
  readonly barWidth?: number;
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface BarChartProps {
  readonly data: BarChartData;
  readonly colors?: BarChartColors;
  readonly options?: BarChartOptions;
  readonly chartId?: string;
  readonly effect?: BarChartEffect;
  readonly customStyles?: BarChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

/* -------------------------------------------------------------------------- */
/* Hook Types                                                                  */
/* -------------------------------------------------------------------------- */

export type BarChartHookProps = Pick<
  BarChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface BarChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-orientation'?: string;
}

export interface BarChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: BarChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: BarChartWrapperProps;
  readonly isReady: boolean;
}