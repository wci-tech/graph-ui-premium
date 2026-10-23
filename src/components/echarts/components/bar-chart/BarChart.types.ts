import type { StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { EChartsEffect } from '../../common-effects';

export type BarChartEffect = EChartsEffect;

export interface BarChartSeries {
  readonly label: string;

  readonly data: number[];

  /**
   * Overrides the bar color for this individual series.
   *
   * Supports normal CSS colors and CSS custom properties.
   *
   * @example
   * color: '#F5456E'
   * color: 'var(--wci-chart-red)'
   */
  readonly color?: string;

  /**
   * Optional ECharts stack identifier.
   */
  readonly stack?: string;

  /**
   * Overrides the border width for this series.
   */
  readonly borderWidth?: number;
}

export interface BarChartData {
  readonly labels: string[];

  readonly series: BarChartSeries[];
}

export interface BarChartColors {
  /**
   * Optional chart-level series palette.
   *
   * When omitted, the WCI root chart palette is used.
   */
  readonly series?: readonly string[];

  readonly axisText?: string;

  readonly axisLine?: string;

  readonly grid?: string;

  readonly tooltipBackground?: string;

  readonly tooltipText?: string;

  readonly tooltipBorder?: string;
}

export interface BarChartCustomStyles {
  readonly wrapper?: StyleType;

  readonly chart?: StyleType;
}

export type BarChartOptions = EChartsOption & {
  readonly horizontal?: boolean;

  readonly barWidth?: number;

  readonly crosshair?: boolean;

  readonly showLegend?: boolean;

  readonly boldLabels?: boolean;

  readonly isBoxVisible?: boolean;
};

export interface BarChartProps {
  readonly data: BarChartData;

  readonly colors?: BarChartColors;

  readonly options?: BarChartOptions;

  readonly chartId?: string;

  readonly effect?: BarChartEffect;

  readonly customStyles?: BarChartCustomStyles;

  readonly showDownload?: boolean;

  readonly downloadPlacement?: DownloadPlacement;

  readonly rendererCustomStyles?: ChartCustomStyles;

  readonly className?: string;

  readonly testId?: string;
}