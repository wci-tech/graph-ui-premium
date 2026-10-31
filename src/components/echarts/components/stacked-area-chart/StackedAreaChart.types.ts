import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { StackedAreaChartDefinition } from '@/components/echarts/components/stacked-area-chart/base/BaseStackedAreaChart.utils';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type StackedAreaChartAppearance = 'basic' | 'smooth';
export type StackedAreaChartEffect = EChartsEffect;

export interface StackedAreaChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly borderWidth?: number;
}

export interface StackedAreaChartData {
  readonly labels: string[];
  readonly series: StackedAreaChartSeries[];
}

export interface StackedAreaChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type StackedAreaChartResolvedColors = Required<StackedAreaChartColors>;

export interface StackedAreaChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type StackedAreaChartOptions = EChartsOption & {
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface StackedAreaChartProps {
  readonly data: StackedAreaChartData;
  readonly colors?: StackedAreaChartColors;
  readonly options?: StackedAreaChartOptions;
  readonly chartId?: string;
  readonly appearance?: StackedAreaChartAppearance;
  readonly effect?: StackedAreaChartEffect;
  readonly customStyles?: StackedAreaChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type StackedAreaChartHookProps = Pick<
  StackedAreaChartProps,
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

export interface StackedAreaChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
}

export interface StackedAreaChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: StackedAreaChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: StackedAreaChartWrapperProps;
  readonly isReady: boolean;
}

export type StackedAreaChartStyleProps = OptionalWithUndefined<
  Pick<StackedAreaChartProps, 'appearance'>
>;