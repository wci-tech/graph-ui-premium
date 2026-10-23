import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type {
  ChartJSData,
  ChartJSOptions,
  ChartjsProps,
} from '../../ChartJS.types';
import type { ChartJSEffect } from '../../common-effects';

export type BarChartEffect = ChartJSEffect;

export interface BarChartDataset {
  readonly label: string;
  readonly data: number[];

  /**
   * Overrides the automatically assigned series color.
   */
  readonly color?: string;

  readonly borderRadius?: number;
  readonly borderWidth?: number;

  /**
   * Width of this specific dataset's bars.
   * Overrides options.barWidth.
   */
  readonly barWidth?: number;

  /**
   * Maximum responsive width for this dataset.
   */
  readonly maxBarWidth?: number;

  /**
   * Dataset-specific spacing overrides.
   */
  readonly categoryPercentage?: number;
  readonly barPercentage?: number;
}

export interface BarChartColors {
  /**
   * Overrides the automatic series palette.
   */
  readonly series?: readonly string[];

  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;

  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
}

/**
 * Internal resolved colors.
 *
 * CSS variables and consumer overrides have already
 * been converted to values that can be used by Canvas.
 */
export interface BarChartResolvedColors {
  readonly series: readonly string[];

  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;

  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

export interface BarChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type BarChartOptions = ChartJSOptions & {
  readonly horizontal?: boolean;

  readonly boldLabels?: boolean;
  readonly boldLegends?: boolean;

  readonly showLegend?: boolean;
  readonly isBoxVisible?: boolean;

  readonly chartBackground?: string;

  readonly barWidth?: number;
  readonly categoryPercentage?: number;
  readonly barPercentage?: number;

  readonly crosshair?: boolean;
};

export interface BarChartProps {
  readonly labels: string[];
  readonly data: BarChartDataset[];

  readonly effect?: BarChartEffect;

  /**
   * Convenient color overrides.
   * Unspecified colors fall back to WCI chart tokens.
   */
  readonly colors?: BarChartColors;

  readonly options?: BarChartOptions;

  /**
   * BarChart-specific structural styles.
   */
  readonly customStyles?: BarChartCustomStyles;

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

/* -------------------------------------------------------------------------- */
/* Hook Types                                                                  */
/* -------------------------------------------------------------------------- */

export type UseBarChartProps = Pick<
  BarChartProps,
  | 'data'
  | 'labels'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface BarChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
}

export interface UseBarChartReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;

  readonly processedData: ChartJSData;

  readonly barOptions: ChartjsProps['options'] | undefined;

  readonly wrapperProps: BarChartWrapperProps;

  readonly isReady: boolean;
}