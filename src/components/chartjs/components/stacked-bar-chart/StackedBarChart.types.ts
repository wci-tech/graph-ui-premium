import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import type {
  ChartJSData,
  ChartJSOptions,
  ChartjsProps,
} from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type StackedBarChartEffect = ChartJSEffect;

export interface StackedBarChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly borderRadius?: number;
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

export type StackedBarChartOptions = ChartJSOptions & {
  readonly horizontal?: boolean;
  readonly barWidth?: number;
  readonly maxBarWidth?: number;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly showLegend?: boolean;
  readonly showDataLabels?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
  readonly onClick?: (event: ChartEvent, elements: ActiveElement[]) => void;
};

export interface StackedBarChartProps {
  readonly labels: string[];
  readonly data: StackedBarChartDataset[];
  readonly effect?: StackedBarChartEffect;
  readonly colors?: StackedBarChartColors;
  readonly options?: StackedBarChartOptions;
  readonly customStyles?: StackedBarChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type StackedBarChartHookProps = Pick<
  StackedBarChartProps,
  | 'labels'
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
  readonly processedData: ChartJSData;
  readonly stackedBarOptions: ChartjsProps['options'] | undefined;
  readonly wrapperProps: StackedBarChartWrapperProps;
  readonly isReady: boolean;
}