import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type TreemapChartEffect = ChartJSEffect;

export interface TreemapChartItem {
  readonly label: string;
  readonly value: number;
  readonly group?: string;
  readonly color?: string;
}

export interface TreemapChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type TreemapChartResolvedColors = Required<TreemapChartColors>;

export interface TreemapChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type TreemapChartOptions = ChartJSOptions & {
  readonly spacing?: number;
  readonly borderWidth?: number;
  readonly borderRadius?: number;
  readonly showLabels?: boolean;
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly showTooltipValue?: boolean;
  readonly minimumLabelValue?: number;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
  readonly valueFormatter?: (value: number) => string;
  readonly onClick?: (event: ChartEvent, elements: ActiveElement[]) => void;
};

export interface TreemapChartProps {
  readonly data: TreemapChartItem[];
  readonly colors?: TreemapChartColors;
  readonly effect?: TreemapChartEffect;
  readonly options?: TreemapChartOptions;
  readonly customStyles?: TreemapChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type TreemapChartHookProps = Pick<
  TreemapChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface TreemapChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface TreemapChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly treemapOptions: ChartjsProps['options'] | undefined;
  readonly wrapperProps: TreemapChartWrapperProps;
  readonly isReady: boolean;
}