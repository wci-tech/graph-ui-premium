import type { Plugin } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type { ChartJSData, ChartJSDataset, ChartJSOptions } from '@/components/chartjs/ChartJS.types';

import type {
  NetworkGraphColors,
  NetworkGraphData,
  NetworkGraphOptions,
  NetworkGraphResolvedColors,
} from '../NetworkGraph.types';

import { NETWORK_GRAPH_CONFIG } from './BaseNetworkGraph.constants';

interface ChartJSGraphNode extends Record<string, unknown> {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly color?: string;
}

interface ChartJSGraphEdge {
  readonly source: number;
  readonly target: number;
}

interface NetworkGraphDataset extends ChartJSDataset {
  readonly edges: ChartJSGraphEdge[];
}

interface TooltipContext {
  readonly raw?: unknown;
}

interface DataLabelContext {
  readonly raw?: unknown;
}

interface NetworkCrosshairOptions {
  readonly enabled?: boolean;
  readonly color?: string;
  readonly width?: number;
  readonly dash?: number[];
  readonly showHorizontal?: boolean;
  readonly showVertical?: boolean;
}

interface NetworkGraphDataParams {
  readonly data: NetworkGraphData;
  readonly colors: NetworkGraphResolvedColors;
}

interface NetworkGraphOptionsParams {
  readonly options?: NetworkGraphOptions;
  readonly colors: NetworkGraphResolvedColors;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getRecordConfig = (
  source: Record<string, unknown> | undefined,
  key: string,
): Record<string, unknown> => {
  const value = source?.[key];
  return isRecord(value) ? value : {};
};

const resolveCssVariable = (element: HTMLElement, variableName: string): string =>
  getComputedStyle(element).getPropertyValue(variableName).trim();

const resolveSeriesColors = (
  element: HTMLElement,
  colors?: NetworkGraphColors,
): string[] =>
  CHART_COLOR_VARIABLES.map(
    (variable, index) => colors?.series?.[index] ?? resolveCssVariable(element, variable),
  );

export const resolveNetworkGraphColors = (
  element: HTMLElement,
  colors?: NetworkGraphColors,
): NetworkGraphResolvedColors => ({
  series: resolveSeriesColors(element, colors),
  axisText:
    colors?.axisText ?? resolveCssVariable(element, CHART_TOKEN_VARIABLES.axisText),
  axisLine:
    colors?.axisLine ?? resolveCssVariable(element, CHART_TOKEN_VARIABLES.axisLine),
  grid:
    colors?.grid ?? resolveCssVariable(element, CHART_TOKEN_VARIABLES.grid),
  tooltipBackground:
    colors?.tooltipBackground ??
    resolveCssVariable(element, CHART_TOKEN_VARIABLES.tooltipBackground),
  tooltipText:
    colors?.tooltipText ?? resolveCssVariable(element, CHART_TOKEN_VARIABLES.tooltipText),
  tooltipBorder:
    colors?.tooltipBorder ??
    resolveCssVariable(element, CHART_TOKEN_VARIABLES.tooltipBorder),
});

export const createNetworkGraphCrosshairPlugin = (): Plugin<'forceDirectedGraph'> => ({
  id: 'networkCrosshair',
  afterDatasetsDraw: (chart) => {
    const pluginOptions = isRecord(chart.options.plugins)
      ? chart.options.plugins
      : undefined;
    const config = getRecordConfig(
      pluginOptions,
      'networkCrosshair',
    ) as NetworkCrosshairOptions;

    if (config.enabled !== true) return;

    const activeElement = chart.getActiveElements()[0]?.element;

    if (!activeElement) return;

    const { ctx, chartArea } = chart;

    ctx.save();
    ctx.strokeStyle = config.color ?? '';
    ctx.lineWidth = config.width ?? NETWORK_GRAPH_CONFIG.crosshairWidth;
    ctx.setLineDash(
      config.dash ?? Array.from(NETWORK_GRAPH_CONFIG.crosshairDash),
    );

    if (config.showHorizontal !== false) {
      ctx.beginPath();
      ctx.moveTo(chartArea.left, activeElement.y);
      ctx.lineTo(chartArea.right, activeElement.y);
      ctx.stroke();
    }

    if (config.showVertical !== false) {
      ctx.beginPath();
      ctx.moveTo(activeElement.x, chartArea.top);
      ctx.lineTo(activeElement.x, chartArea.bottom);
      ctx.stroke();
    }

    ctx.restore();
  },
});

export const createNetworkGraphData = ({
  data,
  colors,
}: NetworkGraphDataParams): ChartJSData => {
  const nodeIds = data.nodes.map((node) => String(node.id));

  const graphNodes: ChartJSGraphNode[] = data.nodes.map((node) => ({
    id: String(node.id),
    label: node.label,
    value: node.size ?? NETWORK_GRAPH_CONFIG.nodeRadius,
    ...(node.color !== undefined ? { color: node.color } : {}),
  }));

  const graphEdges: ChartJSGraphEdge[] = data.edges
    .map((edge): ChartJSGraphEdge | undefined => {
      const source = nodeIds.indexOf(String(edge.from));
      const target = nodeIds.indexOf(String(edge.to));

      if (source === -1 || target === -1) return undefined;

      return { source, target };
    })
    .filter((edge): edge is ChartJSGraphEdge => edge !== undefined);

  const dataset: NetworkGraphDataset = {
    label: 'Network',
    data: graphNodes,
    edges: graphEdges,
    backgroundColor: colors.series[0],
    borderColor: colors.series[1] ?? colors.series[0],
  };

  return {
    labels: data.nodes.map((node) => node.label),
    datasets: [dataset],
  };
};

export const createNetworkGraphOptions = ({
  options,
  colors,
}: NetworkGraphOptionsParams): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;
  const pluginOptions = getRecordConfig(optionRecord, 'plugins');
  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');
  const legendFontConfig = getRecordConfig(legendLabelsConfig, 'font');
  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const datalabelFontConfig = getRecordConfig(datalabelsConfig, 'font');
  const networkCrosshairConfig = getRecordConfig(pluginOptions, 'networkCrosshair');
  const interactionConfig = getRecordConfig(optionRecord, 'interaction');
  const layoutConfig = getRecordConfig(optionRecord, 'layout');
  const layoutPadding = getRecordConfig(layoutConfig, 'padding');
  const crosshairEnabled = options?.crosshair === true;

  const {
    crosshair: _crosshair,
    plugins: _plugins,
    layout: _layout,
    simulationIterations: _simulationIterations,
    manyBodyStrength: _manyBodyStrength,
    linkDistance: _linkDistance,
    edgeWidth: _edgeWidth,
    nodeRadius: _nodeRadius,
    nodeHoverRadius: _nodeHoverRadius,
    height: _height,
    isBoxVisible: _isBoxVisible,
    chartBackground: _chartBackground,
    showLegend: _showLegend,
    boldLabels: _boldLabels,
    ...remainingOptions
  } = options ?? {};

  return {
    ...remainingOptions,
    responsive: true,
    maintainAspectRatio: false,
    clip: false,
    interaction: {
      mode: 'nearest',
      intersect: true,
      ...interactionConfig,
    },
    layout: {
      ...layoutConfig,
      padding: {
        ...NETWORK_GRAPH_CONFIG.layoutPadding,
        ...layoutPadding,
      },
    },
    simulation: {
      enabled: true,
      iterations:
        options?.simulationIterations ?? NETWORK_GRAPH_CONFIG.simulationIterations,
      forces: {
        center: true,
        manyBody: {
          strength:
            options?.manyBodyStrength ?? NETWORK_GRAPH_CONFIG.manyBodyStrength,
        },
        link: {
          distance:
            options?.linkDistance ?? NETWORK_GRAPH_CONFIG.linkDistance,
        },
      },
    },
    scales: {
      x: {
        display: false,
        grace: '10%',
      },
      y: {
        display: false,
        grace: '10%',
      },
    },
    elements: {
      edgeLine: {
        borderColor: colors.series[1] ?? colors.axisLine,
        borderWidth: options?.edgeWidth ?? NETWORK_GRAPH_CONFIG.edgeWidth,
        tension: NETWORK_GRAPH_CONFIG.edgeTension,
      },
      point: {
        backgroundColor: colors.series[0],
        borderColor: colors.series[0],
        radius: options?.nodeRadius ?? NETWORK_GRAPH_CONFIG.nodeRadius,
        hoverRadius:
          options?.nodeHoverRadius ?? NETWORK_GRAPH_CONFIG.nodeHoverRadius,
      },
    },
    plugins: {
      ...pluginOptions,
      crosshair: {
        ...getRecordConfig(pluginOptions, 'crosshair'),
        enabled: false,
      },
      candlestickCrosshair: {
        ...getRecordConfig(pluginOptions, 'candlestickCrosshair'),
        enabled: false,
      },
      networkCrosshair: {
        color: colors.axisLine,
        width: NETWORK_GRAPH_CONFIG.crosshairWidth,
        dash: Array.from(NETWORK_GRAPH_CONFIG.crosshairDash),
        showHorizontal: true,
        showVertical: true,
        ...networkCrosshairConfig,
        enabled: crosshairEnabled,
      },
      legend: {
        ...legendConfig,
        display: options?.showLegend ?? false,
        labels: {
          color: colors.axisText,
          ...legendLabelsConfig,
          font: {
            ...legendFontConfig,
            weight: options?.boldLabels ? 'bold' : 'normal',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        ...tooltipConfig,
        callbacks: {
          ...getRecordConfig(tooltipConfig, 'callbacks'),
          label: (context: TooltipContext): string => {
            const raw = context.raw;

            if (isRecord(raw) && typeof raw['label'] === 'string') {
              return raw['label'];
            }

            return '';
          },
        },
      },
      datalabels: {
        display: true,
        color: colors.axisText,
        anchor: 'center',
        align: 'right',
        offset: NETWORK_GRAPH_CONFIG.labelOffset,
        clamp: true,
        clip: false,
        ...datalabelsConfig,
        formatter: (_value: unknown, context: DataLabelContext): string => {
          const raw = context.raw;

          if (isRecord(raw) && typeof raw['label'] === 'string') {
            return raw['label'];
          }

          return '';
        },
        font: {
          size: NETWORK_GRAPH_CONFIG.labelFontSize,
          ...datalabelFontConfig,
          weight: options?.boldLabels ? 'bold' : 'normal',
        },
      },
    },
  } as unknown as ChartJSOptions;
};