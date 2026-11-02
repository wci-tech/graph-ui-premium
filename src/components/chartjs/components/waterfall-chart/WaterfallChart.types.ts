import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type WaterfallChartEffect = ChartJSEffect;

export interface WaterfallChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type WaterfallChartResolvedColors = Required<WaterfallChartColors>;

export interface WaterfallChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type WaterfallChartOptions = ChartJSOptions & {
  readonly totalIndices?: number[];
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly showLegend?: boolean;
  readonly showDataLabels?: boolean;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
  readonly crosshair?: boolean;
  readonly barWidth?: number;
  readonly barMaxWidth?: number;
  readonly onClick?: (event: ChartEvent, elements: ActiveElement[]) => void;
};

export interface WaterfallChartProps {
  readonly labels: string[];
  readonly data: number[];
  readonly colors?: WaterfallChartColors;
  readonly effect?: WaterfallChartEffect;
  readonly options?: WaterfallChartOptions;
  readonly customStyles?: WaterfallChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type WaterfallChartHookProps = Pick<
  WaterfallChartProps,
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

export interface WaterfallChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface WaterfallChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly waterfallOptions: ChartjsProps['options'] | undefined;
  readonly wrapperProps: WaterfallChartWrapperProps;
  readonly isReady: boolean;
}