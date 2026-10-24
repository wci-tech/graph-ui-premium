import type { ReactNode, RefObject } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { ChartJSData, ChartJSOptions, ChartjsProps } from '../../ChartJS.types';

export type AreaChartEffect = ChartJSEffect;

export type AreaChartAppearance = 'basic' | 'smooth';

export interface AreaChartDataset {
  readonly label: string;
  readonly data: number[];
  readonly color?: string;
  readonly pointColor?: string;
  readonly pointRadius?: number;
  readonly pointHoverRadius?: number;
  readonly borderWidth?: number;
  readonly tension?: number;
}

export interface AreaChartColors {
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
export type AreaChartResolvedColors = Required<AreaChartColors>;

export interface AreaChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type AreaChartOptions = ChartJSOptions & {
  readonly showLegend?: boolean;
  readonly boldLabels?: boolean;
  readonly isBoxVisible?: boolean;
  readonly crosshair?: boolean;
};

export interface AreaChartProps {
  readonly labels: string[];
  readonly data: AreaChartDataset[];
  readonly effect?: AreaChartEffect;
  readonly appearance?: AreaChartAppearance;

  /**
   * Convenient color overrides.
   * Unspecified colors fall back to WCI chart tokens.
   */
  readonly colors?: AreaChartColors;

  readonly options?: AreaChartOptions;

  /**
   * AreaChart-specific structural styles.
   */
  readonly customStyles?: AreaChartCustomStyles;

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

export type AreaChartHookProps = Pick<
  AreaChartProps,
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

export interface AreaChartWrapperProps {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
}

export interface AreaChartHookReturn {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly areaOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: AreaChartWrapperProps;
  readonly isReady: boolean;
}
