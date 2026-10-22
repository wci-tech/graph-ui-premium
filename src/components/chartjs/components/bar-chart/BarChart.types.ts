import type { ReactNode } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

import type { ChartColors, ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { ChartJSOptions } from '../../ChartJS.types';
import type { ChartJSEffect } from '../../common-effects';

export type BarChartEffect = ChartJSEffect;

export interface BarChartDataset {
  readonly label: string;
  readonly data: number[];

  /**
   * Dataset-level color override.
   *
   * Precedence:
   * root graph palette
   * -> colors.series[index]
   * -> dataset.color
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

  readonly colors?: ChartColors;

  readonly effect?: BarChartEffect;

  readonly options?: BarChartOptions;

  /**
   * Bar-chart-specific styles.
   */
  readonly customStyles?: BarChartCustomStyles;

  /**
   * Shared Chart renderer controls.
   */
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly rendererCustomStyles?: ChartCustomStyles;

  readonly className?: string;
  readonly testId?: string;

  readonly children?: ReactNode;
}
