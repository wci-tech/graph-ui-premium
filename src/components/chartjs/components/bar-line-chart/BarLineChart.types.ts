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

export type BarLineChartEffect = ChartJSEffect;

export type BarLineChartAppearance =
  | 'basic'
  | 'smooth';

export type BarLineChartDatasetType =
  | 'bar'
  | 'line';

export interface BarLineChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly type: BarLineChartDatasetType;

  readonly color?: string;

  readonly borderRadius?: number;
  readonly borderWidth?: number;

  readonly yAxisID?: 'y' | 'y1';

  readonly barWidth?: number;

  /**
   * Allows an individual line dataset to override
   * the tension resolved from the chart appearance.
   */
  readonly tension?: number;

  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
}

export interface BarLineChartColors {
  readonly series?: readonly string[];

  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;

  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;

  readonly trendUp?: string;
  readonly trendDown?: string;
  readonly trendNeutral?: string;
}

/**
 * Internal resolved colors.
 *
 * CSS variables and consumer overrides have already
 * been converted to values that can be used by Canvas.
 */
export type BarLineChartResolvedColors =
  Required<BarLineChartColors>;

export interface BarLineChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type BarLineChartOptions =
  ChartJSOptions & {
    readonly showLegend?: boolean;

    readonly boldLabels?: boolean;

    readonly boldLegends?: boolean;

    readonly isBoxVisible?: boolean;

    readonly crosshair?: boolean;

    readonly barWidth?: number;

    readonly alignLineToBars?: boolean;
  };

export interface BarLineChartProps {
  readonly labels: string[];

  readonly data: BarLineChartDataset[];

  readonly effect?: BarLineChartEffect;

  /**
   * basic  -> straight line segments
   * smooth -> curved line segments
   */
  readonly appearance?: BarLineChartAppearance;

  /**
   * Convenient color overrides.
   * Unspecified colors fall back to WCI chart tokens.
   */
  readonly colors?: BarLineChartColors;

  /**
   * Shows semantic trend colors on line points.
   */
  readonly showTrendPoints?: boolean;

  readonly options?: BarLineChartOptions;

  /**
   * BarLineChart-specific structural styles.
   */
  readonly customStyles?: BarLineChartCustomStyles;

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

export type BarLineChartHookProps = Pick<
  BarLineChartProps,
  | 'data'
  | 'labels'
  | 'colors'
  | 'options'
  | 'appearance'
  | 'effect'
  | 'showTrendPoints'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

export interface BarLineChartWrapperProps {
  readonly className?: string;

  readonly 'data-testid'?: string;

  readonly 'data-appearance'?: string;

  readonly 'data-effect'?: string;
}

export interface BarLineChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;

  readonly processedData: ChartJSData;

  readonly barLineOptions:
  | ChartjsProps['options']
  | undefined;

  readonly plugins: NonNullable<
    ChartjsProps['plugins']
  >;

  readonly wrapperProps:
  BarLineChartWrapperProps;

  readonly isReady: boolean;
}