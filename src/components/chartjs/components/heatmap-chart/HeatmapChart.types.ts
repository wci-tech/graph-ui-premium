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

export type HeatmapChartEffect = ChartJSEffect;

export type HeatmapCellSizeMode = 'equal' | 'value';

export interface HeatmapPoint {
  readonly x: string;
  readonly y: string;
  readonly v: number;
  readonly color?: string;
}

export interface HeatmapChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type HeatmapChartResolvedColors = Required<HeatmapChartColors>;

export interface HeatmapChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type HeatmapChartOptions = ChartJSOptions & {
  readonly enableHover?: boolean;
  readonly showLabels?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
  readonly cellSizeMode?: HeatmapCellSizeMode;
  readonly cellMinSizeRatio?: number;
  readonly cellGap?: number;
  readonly cellBorderRadius?: number;
  readonly usePalette?: boolean;
  readonly onClick?: (event: ChartEvent, elements: ActiveElement[]) => void;
};

export interface HeatmapChartProps {
  readonly xLabels: string[];
  readonly yLabels: string[];
  readonly data: HeatmapPoint[];
  readonly colors?: HeatmapChartColors;
  readonly effect?: HeatmapChartEffect;
  readonly options?: HeatmapChartOptions;
  readonly customStyles?: HeatmapChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type HeatmapChartHookProps = Pick<
  HeatmapChartProps,
  | 'xLabels'
  | 'yLabels'
  | 'data'
  | 'colors'
  | 'effect'
  | 'options'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface HeatmapChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
  readonly 'data-crosshair'?: boolean;
}

export interface HeatmapChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly heatmapOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: HeatmapChartWrapperProps;
  readonly isReady: boolean;
}