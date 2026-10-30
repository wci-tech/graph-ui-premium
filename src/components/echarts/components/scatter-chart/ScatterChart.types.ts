import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { ScatterChartDefinition } from './base/BaseScatterChart.utils';

export type ScatterChartEffect = EChartsEffect;

export type ScatterChartPoint = readonly [number, number];

export interface ScatterChartSeries {
  readonly label: string;
  readonly data: ScatterChartPoint[];
  readonly color?: string;
  readonly pointRadius?: number;
}

export interface ScatterChartData {
  readonly series: ScatterChartSeries[];
}

export interface ScatterChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type ScatterChartResolvedColors = Required<ScatterChartColors>;

export interface ScatterChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type ScatterChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly pointRadius?: number;
};

export interface ScatterChartProps {
  readonly data: ScatterChartData;
  readonly colors?: ScatterChartColors;
  readonly options?: ScatterChartOptions;
  readonly chartId?: string;
  readonly effect?: ScatterChartEffect;
  readonly customStyles?: ScatterChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type ScatterChartHookProps = Pick<
  ScatterChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface ScatterChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface ScatterChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: ScatterChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: ScatterChartWrapperProps;
  readonly isReady: boolean;
}