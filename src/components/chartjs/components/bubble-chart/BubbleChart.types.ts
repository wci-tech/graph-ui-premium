import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type BubbleChartEffect = ChartJSEffect;

export interface BubblePoint {
  readonly x: number;
  readonly y: number;
  readonly r: number;
}

export interface BubbleChartDataset {
  readonly label: string;
  readonly data: BubblePoint[];
  readonly color?: string;
  readonly borderColor?: string;
  readonly borderWidth?: number;
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

export type BubbleChartOptions = ChartJSOptions & {
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly showLegend?: boolean;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
  readonly xAxisTitle?: string;
  readonly yAxisTitle?: string;
  readonly crosshair?: boolean;
};

export interface BubbleChartProps {
  readonly data: BubbleChartDataset[];
  readonly colors?: BubbleChartColors;
  readonly effect?: BubbleChartEffect;
  readonly options?: BubbleChartOptions;
  readonly customStyles?: BubbleChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type BubbleChartHookProps = Pick<
  BubbleChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface BubbleChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface BubbleChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly bubbleOptions: ChartjsProps['options'] | undefined;
  readonly wrapperProps: BubbleChartWrapperProps;
  readonly isReady: boolean;
}