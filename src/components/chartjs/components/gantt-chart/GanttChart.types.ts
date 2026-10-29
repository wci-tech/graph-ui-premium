import type {
  ReactNode,
  RefObject,
} from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type {
  ActiveElement,
  ChartEvent,
} from 'chart.js';

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

export type GanttChartEffect = ChartJSEffect;

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
  ChartJSOptions & {
    readonly timeUnit?: GanttChartTimeUnit;
    readonly boldLabels?: boolean;
    readonly boldLegends?: boolean;
    readonly isBoxVisible?: boolean;
    readonly chartBackground?: string;
    readonly onClick?: (
      event: ChartEvent,
      elements: ActiveElement[],
    ) => void;
  };

export interface GanttChartProps {
  readonly data: GanttChartTask[];
  readonly colors?: GanttChartColors;
  readonly effect?: GanttChartEffect;
  readonly options?: GanttChartOptions;
  readonly customStyles?: GanttChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type GanttChartRange = [
  number,
  number,
];

export type GanttChartHookProps = Pick<
  GanttChartProps,
  | 'data'
  | 'colors'
  | 'effect'
  | 'options'
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
  readonly processedData: ChartJSData;
  readonly ganttOptions:
  | ChartjsProps['options']
  | undefined;
  readonly wrapperProps: GanttChartWrapperProps;
  readonly isReady: boolean;
}