import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { StackedBarChartDefinition } from './base/BaseStackedBarChart.utils';

export type StackedBarChartEffect = EChartsEffect;

export interface StackedBarChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly borderRadius?: number;
}

export interface StackedBarChartData {
  readonly labels: string[];
  readonly series: StackedBarChartSeries[];
}

export interface StackedBarChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type StackedBarChartResolvedColors = Required<StackedBarChartColors>;

export interface StackedBarChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type StackedBarChartOptions = EChartsOption & {
  readonly horizontal?: boolean;
  readonly stackId?: string;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly barWidth?: number;
  readonly maxBarWidth?: number;
  readonly crosshair?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface StackedBarChartProps {
  readonly data: StackedBarChartData;
  readonly colors?: StackedBarChartColors;
  readonly options?: StackedBarChartOptions;
  readonly chartId?: string;
  readonly effect?: StackedBarChartEffect;
  readonly customStyles?: StackedBarChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type StackedBarChartHookProps = Pick<
  StackedBarChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface StackedBarChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface StackedBarChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: StackedBarChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: StackedBarChartWrapperProps;
  readonly isReady: boolean;
}

export type StackedBarChartStyleProps = OptionalWithUndefined<
  Pick<StackedBarChartProps, 'effect'>
>;