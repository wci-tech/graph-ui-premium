import type { RefObject } from 'react';

import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { TreemapChartDefinition } from './base/BaseTreemapChart.utils';

export type TreemapChartEffect = EChartsEffect;

export interface TreemapChartItemStyle {
  readonly color?: string;
  readonly borderColor?: string;
  readonly borderWidth?: number;
  readonly gapWidth?: number;
  readonly borderRadius?: number | number[];
}

export interface TreemapChartDataItem {
  readonly name: string;
  readonly value: number;
  readonly children?: TreemapChartDataItem[];
  readonly color?: string;
  readonly itemStyle?: TreemapChartItemStyle;
}

export interface TreemapChartSeries {
  readonly label: string;
  readonly data: TreemapChartDataItem[];
  readonly color?: string;
}

export interface TreemapChartData {
  readonly series: TreemapChartSeries[];
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

export type TreemapChartOptions = EChartsOption & {
  readonly showLabels?: boolean;
  readonly boldLabels?: boolean;
  readonly showUpperLabels?: boolean;
  readonly showBreadcrumb?: boolean;
  readonly leafDepth?: number | null;
  readonly visibleMin?: number;
  readonly roam?: boolean | 'scale' | 'move';
  readonly nodeClick?: false | 'zoomToNode' | 'link';
  readonly drillDownIcon?: string;
  readonly valueSuffix?: string;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
};

export interface TreemapChartProps {
  readonly data: TreemapChartData;
  readonly colors?: TreemapChartColors;
  readonly options?: TreemapChartOptions;
  readonly chartId?: string;
  readonly effect?: TreemapChartEffect;
  readonly customStyles?: TreemapChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
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
  readonly definition: TreemapChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: TreemapChartWrapperProps;
  readonly isReady: boolean;
}

export type TreemapChartStyleProps = OptionalWithUndefined<Pick<TreemapChartProps, 'effect'>>;