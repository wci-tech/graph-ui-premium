export type EngineId = 'chartjs' | 'echarts' | 'uplot';

export type ChartType =
  | 'line'
  | 'bar'
  | 'bar-line'
  | 'area'
  | 'scatter'
  | 'pie'
  | 'donut'
  | 'heatmap'
  | 'candlestick'
  | 'treemap'
  | 'bubble'
  | 'gauge'
  | 'doughnut'
  | 'funnel'
  | 'gantt'
  | 'gauge'
  | 'matrix'
  | 'forceDirectedGraph'
  | 'network'
  | 'radar'
  | 'scatter-line'
  | 'stacked-area'
  | 'stacked-bar'
  | 'waterfall'
  | 'sunburst';

export type RenderMode = 'canvas' | 'svg';

export type Capability =
  | 'huge-datasets'
  | 'realtime'
  | 'crosshair'
  | 'brush-zoom'
  | 'annotations'
  | '3d'
  | 'mixed-series'
  | 'sparklines'
  | 'ssr-safe';

export type EngineCapability = Readonly<{
  id: EngineId;
  renderModes: readonly RenderMode[];
  supportedTypes: readonly ChartType[];
  capabilities: readonly Capability[];
  recommendedFor: readonly ('default' | 'timeseries' | 'complex-viz' | 'lightweight')[];
  notes?: string;
}>;

export type ResolveInput = Readonly<{
  type: ChartType;
  points: number;
  renderMode?: RenderMode;
  needs?: readonly Capability[];
  preferred?: EngineId;
}>;

export type EngineRendererBaseProps = {
  engineId: EngineId;
};

export type EngineModule<TProps extends EngineRendererBaseProps = EngineRendererBaseProps> = {
  EngineRenderer: React.ComponentType<TProps>;
  init?: () => void | Promise<void>;
  adapter?: unknown;
};
