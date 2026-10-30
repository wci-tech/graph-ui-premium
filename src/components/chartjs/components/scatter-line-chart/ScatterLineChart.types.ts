import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { PointStyle } from 'chart.js';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type ScatterLineChartEffect = ChartJSEffect;
export type ScatterLineChartAppearance = 'basic' | 'smooth';

export interface ScatterLineChartPoint {
  readonly x: number;
  readonly y: number;
}

export interface ScatterLineChartDataset {
  readonly label: string;
  readonly data: ScatterLineChartPoint[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly pointStyle?: PointStyle;
  readonly borderWidth?: number;
  readonly tension?: number;
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

export type ScatterLineChartOptions = ChartJSOptions & {
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly pointStyle?: PointStyle;
  readonly borderWidth?: number;
};

export interface ScatterLineChartProps {
  readonly data: ScatterLineChartDataset[];
  readonly colors?: ScatterLineChartColors;
  readonly effect?: ScatterLineChartEffect;
  readonly appearance?: ScatterLineChartAppearance;
  readonly options?: ScatterLineChartOptions;
  readonly customStyles?: ScatterLineChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type ScatterLineChartHookProps = Pick<
  ScatterLineChartProps,
  | 'data'
  | 'colors'
  | 'effect'
  | 'appearance'
  | 'options'
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
  readonly 'data-crosshair'?: boolean;
}

export interface ScatterLineChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly scatterLineOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: ScatterLineChartWrapperProps;
  readonly isReady: boolean;
}