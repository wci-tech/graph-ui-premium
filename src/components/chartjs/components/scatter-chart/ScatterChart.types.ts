import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { PointStyle } from 'chart.js';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type ScatterChartEffect = ChartJSEffect;

export interface ScatterChartPoint {
  readonly x: number;
  readonly y: number;
}

export interface ScatterChartDataset {
  readonly label: string;
  readonly data: ScatterChartPoint[];
  readonly color?: string;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly pointStyle?: PointStyle;
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

export type ScatterChartOptions = ChartJSOptions & {
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly pointStyle?: PointStyle;
};

export interface ScatterChartProps {
  readonly data: ScatterChartDataset[];
  readonly colors?: ScatterChartColors;
  readonly effect?: ScatterChartEffect;
  readonly options?: ScatterChartOptions;
  readonly customStyles?: ScatterChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
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
  readonly processedData: ChartJSData;
  readonly scatterOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: ScatterChartWrapperProps;
  readonly isReady: boolean;
}