import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { WaterfallChartDefinition } from './base/BaseWaterfallChart.utils';

export type WaterfallChartEffect = EChartsEffect;

export interface WaterfallChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type WaterfallChartResolvedColors = Required<WaterfallChartColors>;

export interface WaterfallChartData {
  readonly labels: string[];
  readonly data: number[];
}

export interface WaterfallChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type WaterfallChartOptions = EChartsOption & {
  readonly totalIndices?: number[];
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly showDataLabels?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly barWidth?: number;
  readonly barMaxWidth?: number;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
};

export interface WaterfallChartProps {
  readonly data: WaterfallChartData;
  readonly colors?: WaterfallChartColors;
  readonly options?: WaterfallChartOptions;
  readonly chartId?: string;
  readonly effect?: WaterfallChartEffect;
  readonly customStyles?: WaterfallChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type WaterfallChartHookProps = Pick<
  WaterfallChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface WaterfallChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface WaterfallChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: WaterfallChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: WaterfallChartWrapperProps;
  readonly isReady: boolean;
}

export type WaterfallChartStyleProps = OptionalWithUndefined<
  Pick<WaterfallChartProps, 'effect'>
>;