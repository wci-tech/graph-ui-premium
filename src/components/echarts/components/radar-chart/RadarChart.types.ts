import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { RadarChartDefinition } from './base/BaseRadarChart.utils';

export type RadarChartEffect = EChartsEffect;

export interface RadarChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
}

export interface RadarChartData {
  readonly labels: string[];
  readonly series: RadarChartSeries[];
}

export interface RadarChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type RadarChartResolvedColors = Required<RadarChartColors>;

export interface RadarChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type RadarChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface RadarChartProps {
  readonly data: RadarChartData;
  readonly colors?: RadarChartColors;
  readonly options?: RadarChartOptions;
  readonly chartId?: string;
  readonly effect?: RadarChartEffect;
  readonly customStyles?: RadarChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type RadarChartHookProps = Pick<
  RadarChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface RadarChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface RadarChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: RadarChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: RadarChartWrapperProps;
  readonly isReady: boolean;
}