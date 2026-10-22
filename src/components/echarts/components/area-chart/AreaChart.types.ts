import type { OptionalWithUndefined, StyleType } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { ChartCustomStyles, DownloadPlacement } from '@/engines/engine.types';

import type { EChartsEffect } from '../../common-effects';

export type AreaChartAppearance = 'basic' | 'smooth';

export type AreaChartEffect = EChartsEffect;

export interface AreaChartSeries {
  readonly label: string;
  readonly data: number[];

  /**
   * Overrides the line color for this individual series.
   *
   * Supports normal CSS colors and CSS custom properties.
   *
   * @example
   * color: '#F5456E'
   * color: 'var(--wci-chart-red)'
   */
  readonly color?: string;

  /**
   * Overrides the data-point color.
   *
   * Falls back to the resolved series line color.
   */
  readonly pointColor?: string;

  /**
   * Overrides the point size for this series.
   */
  readonly pointRadius?: number;

  /**
   * Overrides the line width for this series.
   */
  readonly borderWidth?: number;
}

export interface AreaChartData {
  readonly labels: string[];
  readonly series: AreaChartSeries[];
}

export interface AreaChartColors {
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

export interface AreaChartCustomStyles {
  readonly wrapper?: StyleType;
  readonly chart?: StyleType;
}

export type AreaChartOptions = EChartsOption & {
  readonly crosshair?: boolean;

  /**
   * Shared API equivalent to Chart.js showLegend.
   *
   * The existing ECharts legend configuration can still override
   * additional legend-specific properties.
   */
  readonly showLegend?: boolean;

  readonly boldLabels?: boolean;
  readonly isBoxVisible?: boolean;
};

export interface AreaChartProps {
  readonly data: AreaChartData;

  readonly colors?: AreaChartColors;

  readonly options?: AreaChartOptions;

  readonly chartId?: string;

  readonly appearance?: AreaChartAppearance;

  readonly effect?: AreaChartEffect;

  readonly customStyles?: AreaChartCustomStyles;

  readonly showDownload?: boolean;

  readonly downloadPlacement?: DownloadPlacement;

  readonly rendererCustomStyles?: ChartCustomStyles;

  readonly className?: string;

  readonly testId?: string;
}

export type AreaChartStyleProps = OptionalWithUndefined<Pick<AreaChartProps, 'appearance'>>;
