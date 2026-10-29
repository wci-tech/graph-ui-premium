import type { RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
  ChartCustomStyles,
  DownloadPlacement,
} from '@/engines/engine.types';

import type { GanttChartDefinition } from './base/BaseGanttChart.utils';

export type GanttChartEffect = EChartsEffect;

export type GanttChartTimeUnit =
  | 'day'
  | 'week'
  | 'month';

export interface GanttChartTask {
  readonly label: string;
  readonly start: string | number | Date;
  readonly end: string | number | Date;
  readonly color?: string;
}

export interface GanttChartColors {
  readonly series?: string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type GanttChartResolvedColors =
  Required<GanttChartColors>;

export interface GanttChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type GanttChartOptions =
  EChartsOption & {
    readonly timeUnit?: GanttChartTimeUnit;
    readonly boldLabels?: boolean;
    readonly isBoxVisible?: boolean;
  };

export interface GanttChartProps {
  readonly data: GanttChartTask[];
  readonly colors?: GanttChartColors;
  readonly options?: GanttChartOptions;
  readonly chartId?: string;
  readonly effect?: GanttChartEffect;
  readonly customStyles?: GanttChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
}

export type GanttChartHookProps = Pick<
  GanttChartProps,
  | 'data'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface GanttChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface GanttChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly definition: GanttChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: GanttChartWrapperProps;
  readonly isReady: boolean;
}