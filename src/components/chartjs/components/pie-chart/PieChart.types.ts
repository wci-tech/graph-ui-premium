import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';
import type { ActiveElement, ChartEvent } from 'chart.js';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

export type PieChartEffect = ChartJSEffect;

export interface PieChartColors {
  readonly series?: readonly string[];
  readonly label?: string;
  readonly border?: string;
  readonly crosshair?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

export type PieChartResolvedColors = Required<PieChartColors>;

export interface PieChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type PieChartOptions = ChartJSOptions & {
  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;
  readonly isBoxVisible?: boolean;
  readonly chartBackground?: string;
  readonly crosshair?: boolean;
  readonly onClick?: (event: ChartEvent, elements: ActiveElement[]) => void;
};

export interface PieChartProps {
  readonly labels: string[];
  readonly data: number[];

  /**
   * Convenient Pie Chart color overrides.
   * Unspecified colors fall back to WCI chart tokens.
   */
  readonly colors?: PieChartColors;

  readonly effect?: PieChartEffect;
  readonly options?: PieChartOptions;

  /**
   * Pie Chart-specific structural styles.
   */
  readonly customStyles?: PieChartCustomStyles;

  /**
   * Shared renderer controls passed to Chartjs.
   */
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;

  readonly className?: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

export type PieChartHookProps = Pick<
  PieChartProps,
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

export interface PieChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface PieChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly pieOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: PieChartWrapperProps;
  readonly isReady: boolean;
}