import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '../../ChartJS.types';

export type RadarChartEffect = ChartJSEffect;

export interface RadarChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly borderWidth?: number;
}

export interface RadarChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type RadarChartResolvedColors = Required<RadarChartColors>;

export interface RadarChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type RadarChartOptions = ChartJSOptions & {
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
  readonly chartBackground?: string;
  readonly onClick?: (event: ChartEvent, elements: ActiveElement[]) => void;
};

export interface RadarChartProps {
  readonly labels: string[];
  readonly data: RadarChartDataset[];
  readonly colors?: RadarChartColors;
  readonly effect?: RadarChartEffect;
  readonly options?: RadarChartOptions;
  readonly customStyles?: RadarChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type RadarChartHookProps = Pick<
  RadarChartProps,
  | 'data'
  | 'labels'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface RadarChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface RadarChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly radarOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: RadarChartWrapperProps;
  readonly isReady: boolean;
}