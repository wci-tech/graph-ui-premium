import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type LineChartEffect = ChartJSEffect;

export type LineChartAppearance = 'solid' | 'smooth' | 'dashed' | 'dotted' | 'stepped';

export interface LineChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly appearance?: LineChartAppearance;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly borderWidth?: number;
  readonly tension?: number;
}

export interface LineChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type LineChartResolvedColors = Required<LineChartColors>;

export interface LineChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type LineChartOptions = ChartJSOptions & {
  readonly showLegend?: boolean;
  readonly isBoxVisible?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly crosshair?: boolean;
};

export interface LineChartProps {
  readonly labels: string[];
  readonly data: LineChartDataset[];
  readonly effect?: LineChartEffect;
  readonly appearance?: LineChartAppearance;
  readonly colors?: LineChartColors;
  readonly options?: LineChartOptions;
  readonly customStyles?: LineChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type LineChartHookProps = Pick<
  LineChartProps,
  | 'data'
  | 'labels'
  | 'colors'
  | 'options'
  | 'appearance'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface LineChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
}

export interface LineChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly lineOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: LineChartWrapperProps;
  readonly isReady: boolean;
}