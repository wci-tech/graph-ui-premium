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

export type FunnelChartEffect = ChartJSEffect;
export type FunnelChartAlignment = 'center' | 'left' | 'right';

export interface FunnelChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type FunnelChartResolvedColors = Required<FunnelChartColors>;

export interface FunnelChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type FunnelChartOptions = ChartJSOptions & {
  readonly align?: FunnelChartAlignment;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly showLegend?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
  readonly onClick?: (event: ChartEvent, elements: ActiveElement[]) => void;
};

export interface FunnelChartProps {
  readonly labels: string[];
  readonly data: number[];
  readonly colors?: FunnelChartColors;
  readonly effect?: FunnelChartEffect;
  readonly options?: FunnelChartOptions;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly customStyles?: FunnelChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type FunnelChartHookProps = Pick<
  FunnelChartProps,
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

export interface FunnelChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface FunnelChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly funnelOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: FunnelChartWrapperProps;
  readonly isReady: boolean;
}