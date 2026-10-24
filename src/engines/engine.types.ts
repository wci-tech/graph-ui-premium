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

export interface ChartBubblePoint {
  readonly x: number;
  readonly y: number;
  readonly r: number;
}

export type ChartBubbleTuple = readonly [
  x: number,
  y: number,
  value: number,
];

export interface ChartCandlestickPoint {
  readonly t: string | number | Date;
  readonly o: number | string;
  readonly h: number | string;
  readonly l: number | string;
  readonly c: number | string;
  readonly v: number | string;
}

export type ChartSeriesData =
  | readonly number[]
  | readonly ChartBubblePoint[]
  | readonly ChartBubbleTuple[]
  | readonly ChartCandlestickPoint[];

export interface ChartSeriesItem {
  readonly label: string;
  readonly data: ChartSeriesData;
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
  readonly series?: readonly string[];
  readonly axisText?: string;
  readonly axisLine?: string;
  readonly grid?: string;
  readonly tooltipBackground?: string;
  readonly tooltipText?: string;
  readonly tooltipBorder?: string;
};

export type ChartCandlestickColors = ChartColors & {
  readonly up?: string;
  readonly down?: string;
  readonly unchanged?: string;
  readonly volumeUp?: string;
  readonly volumeDown?: string;
  readonly crosshair?: string;
  readonly crosshairLabelBackground?: string;
  readonly crosshairLabelText?: string;
};

export type DownloadPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

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

export type ChartAppearance =
  | 'solid'
  | 'basic'
  | 'smooth'
  | 'dashed'
  | 'dotted'
  | 'stepped';

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

type BaseChartProps = {
  readonly engine?: ChartEngine;
  readonly data: ChartData;
  readonly options?: ChartOptions;
  readonly appearance?: ChartAppearance;
  readonly effect?: ChartEffect;
  readonly lazyLoadOnVisible?: boolean;
  readonly showDownload?: boolean;
  readonly downloadPlacement?: DownloadPlacement;
  readonly customStyles?: ChartCustomStyles;
  readonly className?: string;
  readonly testId?: string;
};

export type StandardChartProps = BaseChartProps & {
  readonly type: Exclude<ChartType, 'candlestick'>;
  readonly colors?: ChartColors;
};

export type CandlestickChartProps = BaseChartProps & {
  readonly type: 'candlestick';
  readonly colors?: ChartCandlestickColors;
};

export type ChartProps =
  | StandardChartProps
  | CandlestickChartProps;

export type EngineRendererProps = ChartProps & {
  readonly resolvedEngine: ResolvedChartEngine;
};

export type EngineModule = {
  readonly EngineRenderer: ComponentType<EngineRendererProps>;
};