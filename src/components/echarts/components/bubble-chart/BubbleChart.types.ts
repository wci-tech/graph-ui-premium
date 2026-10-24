import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { BubblePoint } from '@/components/echarts/ECharts.types';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { BubbleChartDefinition } from './base/BaseBubbleChart.utils';

export type BubbleChartEffect = EChartsEffect;

export interface BubbleSeriesDefinition {
  readonly label?: string;
  readonly name?: string;
  readonly data: BubblePoint[];
  readonly color?: string;
}

export interface BubbleChartData {
  readonly series?: BubbleSeriesDefinition[];
  readonly datasets?: BubbleSeriesDefinition[];
  readonly sizeMultiplier?: number;
}

export interface BubbleChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type BubbleChartResolvedColors = Required<BubbleChartColors>;

export interface BubbleChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type BubbleChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly xAxisTitle?: string;
  readonly yAxisTitle?: string;
  readonly isBoxVisible?: boolean;
};

export interface BubbleChartProps {
  readonly data?: BubbleChartData;
  readonly series?: BubbleSeriesDefinition[];
  readonly colors?: BubbleChartColors;
  readonly options?: BubbleChartOptions;
  readonly chartId?: string;
  readonly effect?: BubbleChartEffect;
  readonly sizeMultiplier?: number;
  readonly customStyles?: BubbleChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type BubbleChartHookProps = Pick<
  BubbleChartProps,
  | 'data'
  | 'series'
  | 'colors'
  | 'options'
  | 'effect'
  | 'sizeMultiplier'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface BubbleChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface BubbleChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: BubbleChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: BubbleChartWrapperProps;
  readonly isReady: boolean;
}