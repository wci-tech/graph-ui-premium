import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { ScatterLineChartDefinition } from './base/BaseScatterLineChart.utils';

export type ScatterLineChartAppearance = 'basic' | 'smooth';

export type ScatterLineChartEffect = EChartsEffect;

export type ScatterLineChartPoint = readonly [number, number];

export interface ScatterLineChartSeries {
  readonly label: string;
  readonly data: ScatterLineChartPoint[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly borderWidth?: number;
}

export interface ScatterLineChartData {
  readonly series: ScatterLineChartSeries[];
}

export interface ScatterLineChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type ScatterLineChartResolvedColors = Required<ScatterLineChartColors>;

export interface ScatterLineChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type ScatterLineChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface ScatterLineChartProps {
  readonly data: ScatterLineChartData;
  readonly colors?: ScatterLineChartColors;
  readonly options?: ScatterLineChartOptions;
  readonly chartId?: string;
  readonly appearance?: ScatterLineChartAppearance;
  readonly effect?: ScatterLineChartEffect;
  readonly customStyles?: ScatterLineChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type ScatterLineChartHookProps = Pick<
  ScatterLineChartProps,
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

export interface ScatterLineChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
}

export interface ScatterLineChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: ScatterLineChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: ScatterLineChartWrapperProps;
  readonly isReady: boolean;
}

export type ScatterLineChartStyleProps = OptionalWithUndefined<
  Pick<ScatterLineChartProps, 'appearance'>
>;