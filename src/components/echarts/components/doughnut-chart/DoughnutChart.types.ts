import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { DoughnutChartDefinition } from './base/BaseDoughnutChart.utils';

export type DoughnutChartEffect = EChartsEffect;

export interface DoughnutChartSeries {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
}

export interface DoughnutChartData {
  readonly labels: string[];
  readonly series: DoughnutChartSeries[];
}

export interface DoughnutChartColors {
  readonly series?: string[];
  readonly legendText?: string;
  readonly border?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type DoughnutChartResolvedColors = Required<DoughnutChartColors>;

export interface DoughnutChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type DoughnutChartOptions = EChartsOption & {
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly isBoxVisible?: boolean;
  readonly innerRadius?: string | number;
  readonly outerRadius?: string | number;
};

export interface DoughnutChartProps {
  readonly data: DoughnutChartData;
  readonly colors?: DoughnutChartColors;
  readonly options?: DoughnutChartOptions;
  readonly chartId?: string;
  readonly effect?: DoughnutChartEffect;
  readonly customStyles?: DoughnutChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type DoughnutChartHookProps = Pick<
  DoughnutChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface DoughnutChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface DoughnutChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: DoughnutChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: DoughnutChartWrapperProps;
  readonly isReady: boolean;
}