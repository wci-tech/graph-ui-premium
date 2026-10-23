import type { ComponentType } from 'react';

import type { StyleType } from '@wci-tech/core-ui-premium';

export type ChartEngine = 'auto' | 'chart-1' | 'chart-2' | 'chart-3';

export type ResolvedChartEngine = 'chartjs' | 'echarts' | 'uplot';

export type ChartType =
  | 'line'
  | 'bar'
  | 'area'
  | 'pie'
  | 'donut'
  | 'scatter'
  | 'bar-line'
  | 'bubble'
  | 'candlestick'
  | 'doughnut'
  | 'funnel'
  | 'gantt'
  | 'gauge'
  | 'heatmap'
  | 'network'
  | 'radar'
  | 'scatter-line'
  | 'stacked-area'
  | 'stacked-bar'
  | 'waterfall'
  | 'treemap'
  | 'sunburst';

export interface ChartSeriesItem {
  readonly label: string;

  readonly data: readonly number[];

  readonly color?: string;

  readonly pointColor?: string;

  readonly pointRadius?: number;

  readonly borderWidth?: number;
}

export type ChartData = {
  readonly labels: string[];

  readonly series: readonly ChartSeriesItem[];

  readonly type?: string;
};

export type ChartColors = {
  /**
   * Shared series palette.
   *
   * Individual series.color values take precedence.
   */
  readonly series?: readonly string[];

  readonly axisText?: string;

  readonly axisLine?: string;

  readonly grid?: string;

  readonly tooltipBackground?: string;

  readonly tooltipText?: string;

  readonly tooltipBorder?: string;
};

export type DownloadPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type ChartCustomStyles = {
  readonly container?: StyleType;

  readonly chartWrapper?: StyleType;

  readonly chart?: StyleType;

  readonly downloadWrapper?: StyleType;

  readonly downloadTrigger?: StyleType;

  readonly downloadLabel?: StyleType;

  readonly downloadMenu?: StyleType;

  readonly downloadIcon?: StyleType;
};

export type ChartOptions = {
  readonly height?: number | string;

  readonly fileName?: string;

  readonly chartBackground?: string;
} & Record<string, unknown>;

export type ChartVariant = 'primary' | 'secondary' | 'palette' | 'soft' | 'executive';

export type ChartAppearance = 'solid' | 'basic' | 'smooth' | 'dashed' | 'dotted' | 'stepped';

export type ChartEffect =
  | 'none'
  | 'bounce'
  | 'wobble'
  | 'elastic'
  | 'progressive-trace'
  | 'elastic-glide'
  | 'staggered-reveal'
  | 'line-reveal'
  | 'line-elastic'
  | 'line-bounce'
  | 'line-stagger'
  | 'line-smooth-update'
  | 'fade-in';

export type ChartProps = {
  readonly type: ChartType;

  readonly engine?: ChartEngine;

  readonly data: ChartData;

  /**
   * Shared chart color overrides.
   *
   * Each chart adapter decides which color properties
   * are supported by the underlying chart implementation.
   */
  readonly colors?: ChartColors;

  readonly options?: ChartOptions;

  readonly variant?: ChartVariant;

  readonly appearance?: ChartAppearance;

  readonly effect?: ChartEffect;

  readonly lazyLoadOnVisible?: boolean;

  readonly showDownload?: boolean;

  readonly downloadPlacement?: DownloadPlacement;

  readonly customStyles?: ChartCustomStyles;

  readonly className?: string;

  readonly testId?: string;
};

export type EngineRendererProps = ChartProps & {
  readonly resolvedEngine: ResolvedChartEngine;
};

export type EngineModule = {
  readonly EngineRenderer: ComponentType<EngineRendererProps>;
};
