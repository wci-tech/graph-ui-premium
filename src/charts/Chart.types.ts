import type {
  ChartAppearance,
  ChartColors,
  ChartCustomStyles,
  ChartEffect,
  ChartEngine,
  ChartOptions,
  ChartProps as StandardChartProps,
  DownloadPlacement,
} from '@/engines/engine.types';

/* -------------------------------------------------------------------------- */
/* Shared specialized chart props                                              */
/* -------------------------------------------------------------------------- */

type SharedSpecialChartProps = {
  readonly engine?: ChartEngine;

  readonly chartId?: string;

  readonly appearance?: ChartAppearance;

  readonly effect?: ChartEffect;

  readonly colors?: ChartColors;

  readonly lazyLoadOnVisible?: boolean;

  readonly showDownload?: boolean;

  readonly downloadPlacement?: DownloadPlacement;

  readonly customStyles?: ChartCustomStyles;

  readonly className?: string;

  readonly testId?: string;
};

/* -------------------------------------------------------------------------- */
/* Gantt                                                                       */
/* -------------------------------------------------------------------------- */

type SharedGanttTask = {
  readonly label: string;

  readonly start: string | number | Date;

  readonly end: string | number | Date;

  readonly color?: string;
};

type SharedGanttSeries = {
  readonly label: string;

  readonly data: readonly SharedGanttTask[];

  readonly color?: string;
};

type SharedGanttData = {
  readonly labels: readonly string[];

  readonly series: readonly SharedGanttSeries[];

  readonly type?: string;
};

export type SharedGanttChartProps = SharedSpecialChartProps & {
  readonly type: 'gantt';

  readonly data: SharedGanttData;

  readonly options?: ChartOptions;
};

/* -------------------------------------------------------------------------- */
/* Heatmap                                                                     */
/* -------------------------------------------------------------------------- */

export type SharedHeatmapPoint = {
  readonly x: string;

  readonly y: string;

  readonly v: number;

  readonly color?: string;
};

type SharedHeatmapSeries = {
  readonly label: string;

  readonly data: readonly SharedHeatmapPoint[];

  readonly color?: string;
};

type SharedHeatmapData = {
  readonly labels: readonly string[];

  readonly series: readonly SharedHeatmapSeries[];

  readonly type?: string;
};

export type SharedHeatmapChartProps = SharedSpecialChartProps & {
  readonly type: 'heatmap';

  readonly data: SharedHeatmapData;

  readonly options?: ChartOptions;
};

/* -------------------------------------------------------------------------- */
/* Network                                                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Chart 1 Network                                                             */
/* -------------------------------------------------------------------------- */

type SharedChart1NetworkNode = {
  readonly id: string;

  readonly label: string;

  readonly size?: number;
};

type SharedChart1NetworkEdge = {
  readonly from: string;

  readonly to: string;
};

type SharedChart1NetworkData = {
  readonly labels?: readonly string[];

  readonly series?: readonly never[];

  readonly nodes: readonly SharedChart1NetworkNode[];

  readonly edges: readonly SharedChart1NetworkEdge[];

  readonly type?: string;
};

/* -------------------------------------------------------------------------- */
/* Chart 2 Network                                                             */
/* -------------------------------------------------------------------------- */

type SharedChart2NetworkNode = {
  readonly id: string;

  readonly name: string;

  readonly value?: number;

  readonly symbolSize?: number;

  readonly itemStyle?: {
    readonly color?: string;
  };
};

type SharedChart2NetworkLink = {
  readonly source: string;

  readonly target: string;

  readonly value?: number;
};

type SharedChart2NetworkSeries = {
  readonly label?: string;

  readonly data?: readonly number[];

  readonly nodes: readonly SharedChart2NetworkNode[];

  readonly links: readonly SharedChart2NetworkLink[];
};

type SharedChart2NetworkData = {
  readonly labels?: readonly string[];

  readonly series: readonly SharedChart2NetworkSeries[];

  readonly type?: string;
};

type SharedNetworkData = SharedChart1NetworkData | SharedChart2NetworkData;

export type SharedNetworkChartProps = SharedSpecialChartProps & {
  readonly type: 'network';

  readonly data: SharedNetworkData;

  readonly options?: ChartOptions;
};

/* -------------------------------------------------------------------------- */
/* Scatter                                                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Chart 1 Scatter                                                             */
/* -------------------------------------------------------------------------- */

export type Chart1ScatterPoint = {
  readonly x: number;

  readonly y: number;
};

export type Chart1ScatterDataset = {
  readonly label: string;

  readonly data: readonly Chart1ScatterPoint[];

  readonly color?: string;

  readonly pointRadius?: number;

  readonly pointHoverRadius?: number;
};

export type Chart1ScatterData = {
  readonly data: readonly Chart1ScatterDataset[];
};

/* -------------------------------------------------------------------------- */
/* Chart 2 Scatter                                                             */
/* -------------------------------------------------------------------------- */

export type Chart2ScatterPoint = readonly [number, number];

export type Chart2ScatterSeries = {
  readonly label: string;

  readonly data: readonly Chart2ScatterPoint[];

  readonly color?: string;

  readonly symbolSize?: number;
};

export type Chart2ScatterData = {
  readonly data: {
    readonly series: readonly Chart2ScatterSeries[];
  };
};

/* -------------------------------------------------------------------------- */
/* Shared Scatter                                                              */
/* -------------------------------------------------------------------------- */

export type SharedScatterData = Chart1ScatterData | Chart2ScatterData;

export type SharedScatterChartProps = SharedSpecialChartProps & {
  readonly type: 'scatter';

  readonly data: SharedScatterData;

  readonly options?: ChartOptions;
};

/* -------------------------------------------------------------------------- */
/* Standard numeric charts                                                     */
/* -------------------------------------------------------------------------- */

export type SharedStandardChartProps = Omit<StandardChartProps, 'type'> & {
  readonly type: Exclude<
    StandardChartProps['type'],
    'gantt' | 'heatmap' | 'network' | 'scatter' | 'sunburst'
  >;
};

/* -------------------------------------------------------------------------- */
/* Public Chart props                                                          */
/* -------------------------------------------------------------------------- */

export type ChartProps =
  | SharedStandardChartProps
  | SharedGanttChartProps
  | SharedHeatmapChartProps
  | SharedNetworkChartProps
  | SharedScatterChartProps;

/* -------------------------------------------------------------------------- */
/* Re-exports                                                                  */
/* -------------------------------------------------------------------------- */

export type {
  ChartAppearance,
  ChartColors,
  ChartCustomStyles,
  ChartData,
  ChartEffect,
  ChartEngine,
  ChartOptions,
  ChartSeriesItem,
  ChartType,
  DownloadPlacement,
  EngineModule,
  EngineRendererProps,
  ResolvedChartEngine,
} from '@/engines/engine.types';