import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

import type {
  ChartJSData,
  ChartJSOptions,
  ChartjsProps,
} from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
  ChartCustomStyles,
  DownloadPlacement,
} from '@/engines/engine.types';

export type StackedAreaChartEffect = ChartJSEffect;
export type StackedAreaChartAppearance = 'basic' | 'smooth';

export interface StackedAreaChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly borderWidth?: number;
  readonly tension?: number;
}

export interface StackedAreaChartColors {
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type StackedAreaChartResolvedColors = Required<StackedAreaChartColors>;

export interface StackedAreaChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type StackedAreaChartOptions = ChartJSOptions & {
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
  readonly fillOpacity?: number;
};

export interface StackedAreaChartProps {
  readonly labels: string[];
  readonly data: StackedAreaChartDataset[];
  readonly effect?: StackedAreaChartEffect;
  readonly appearance?: StackedAreaChartAppearance;
  readonly colors?: StackedAreaChartColors;
  readonly options?: StackedAreaChartOptions;
  readonly customStyles?: StackedAreaChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type StackedAreaChartHookProps = Pick<
  StackedAreaChartProps,
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

export interface StackedAreaChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
}

export interface StackedAreaChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly stackedAreaOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: StackedAreaChartWrapperProps;
  readonly isReady: boolean;
}