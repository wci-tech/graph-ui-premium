import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
  ChartCustomStyles,
  DownloadPlacement,
} from '@/engines/engine.types';

import type {
  ChartJSData,
  ChartJSOptions,
  ChartjsProps,
} from '../../ChartJS.types';

export type DoughnutChartEffect = ChartJSEffect;

export interface DoughnutChartColors {
  readonly series?: string[];
  readonly border?: string;
  readonly legendText?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type DoughnutChartResolvedColors =
  Required<DoughnutChartColors>;

export interface DoughnutChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type DoughnutChartOptions =
  ChartJSOptions & {
    readonly boldLegends?: boolean;
    readonly isBoxVisible?: boolean;
    readonly chartBackground?: string;
    readonly innerRadius?: string | number;
    readonly onClick?: (
      event: ChartEvent,
      elements: ActiveElement[],
    ) => void;
  };

export interface DoughnutChartProps {
  readonly labels: string[];
  readonly data: number[];
  readonly effect?: DoughnutChartEffect;
  readonly colors?: DoughnutChartColors;
  readonly options?: DoughnutChartOptions;
  readonly customStyles?: DoughnutChartCustomStyles;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type DoughnutChartHookProps = Pick<
  DoughnutChartProps,
  | 'labels'
  | 'data'
  | 'effect'
  | 'colors'
  | 'options'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface DoughnutChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface DoughnutChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly doughnutOptions:
  | ChartjsProps['options']
  | undefined;
  readonly wrapperProps: DoughnutChartWrapperProps;
  readonly isReady: boolean;
}