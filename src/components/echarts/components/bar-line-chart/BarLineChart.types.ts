import type { RefObject } from 'react';

import type {
  OptionalWithUndefined,
  StyleType,
} from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
  ChartCustomStyles,
  DownloadPlacement,
} from '@/engines/engine.types';

import type { BarLineChartDefinition } from './base/BaseBarLineChart.utils';

export type BarLineChartAppearance = 'basic' | 'smooth';
export type BarLineChartEffect = EChartsEffect;
export type BarLineChartSeriesType = 'bar' | 'line';

export interface BarLineChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly type: BarLineChartSeriesType;
  readonly color?: string;
  readonly yAxisIndex?: number;
  readonly borderWidth?: number;
  readonly pointRadius?: number;
  readonly barWidth?: number;
  readonly fill?: boolean;
}

export interface BarLineChartData {
  readonly labels: string[];
  readonly series: BarLineChartSeries[];
}

export interface BarLineChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
  readonly trendUp?: string;
  readonly trendDown?: string;
  readonly trendNeutral?: string;
}

export type BarLineChartResolvedColors = Required<BarLineChartColors>;

export interface BarLineChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type BarLineChartOptions = EChartsOption & {
  readonly barWidth?: number;
  readonly touchBarTop?: boolean;
  readonly crosshair?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface BarLineChartProps {
  readonly data: BarLineChartData;
  readonly colors?: BarLineChartColors;
  readonly options?: BarLineChartOptions;
  readonly chartId?: string;
  readonly appearance?: BarLineChartAppearance;
  readonly effect?: BarLineChartEffect;
  readonly showTrendPoints?: boolean;
  readonly customStyles?: BarLineChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type BarLineChartHookProps = Pick<
  BarLineChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'appearance'
  | 'effect'
  | 'showTrendPoints'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface BarLineChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
}

export interface BarLineChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: BarLineChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: BarLineChartWrapperProps;
  readonly isReady: boolean;
}

export type BarLineChartStyleProps = OptionalWithUndefined<
  Pick<BarLineChartProps, 'appearance'>
>;