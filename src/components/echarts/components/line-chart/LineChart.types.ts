import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { LineChartDefinition } from './base/BaseLineChart.utils';

export type LineChartAppearance = 'solid' | 'smooth' | 'dashed' | 'dotted' | 'stepped';
export type LineChartEffect = EChartsEffect;

export interface LineChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly borderWidth?: number;
}

export interface LineChartData {
  readonly labels: string[];
  readonly series: LineChartSeries[];
}

export interface LineChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type LineChartResolvedColors = Required<LineChartColors>;

export interface LineChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type LineChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface LineChartProps {
  readonly data: LineChartData;
  readonly colors?: LineChartColors;
  readonly options?: LineChartOptions;
  readonly chartId?: string;
  readonly appearance?: LineChartAppearance;
  readonly effect?: LineChartEffect;
  readonly customStyles?: LineChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type LineChartHookProps = Pick<
  LineChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'appearance'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface LineChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface LineChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: LineChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: LineChartWrapperProps;
  readonly isReady: boolean;
}