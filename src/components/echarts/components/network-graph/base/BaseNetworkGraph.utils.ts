import type {
  EChartsOption,
  GraphSeriesOption,
  LegendComponentOption,
  TooltipComponentOption,
} from 'echarts';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  NetworkGraphColors,
  NetworkGraphData,
  NetworkGraphLink,
  NetworkGraphNode,
  NetworkGraphOptions,
  NetworkGraphResolvedColors,
  NetworkGraphSeries,
} from '../NetworkGraph.types';

import { NETWORK_GRAPH_CONFIG } from './BaseNetworkGraph.constants';

export interface NetworkGraphResolvedNode {
  readonly id?: string;
  readonly name: string;
  readonly value?: number;
  readonly symbolSize: number;
  readonly color: string;
}

export interface NetworkGraphResolvedSeries {
  readonly label?: string;
  readonly nodes: NetworkGraphResolvedNode[];
  readonly links: NetworkGraphLink[];
}

export interface NetworkGraphDefinition {
  readonly type: 'network';
  readonly series: NetworkGraphResolvedSeries[];
  readonly networkGraphColors: NetworkGraphResolvedColors;
}

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const asTooltip = (value: unknown): TooltipComponentOption =>
  isRecord(value) ? (value as TooltipComponentOption) : {};

const asLegend = (value: unknown): LegendComponentOption =>
  isRecord(value) ? (value as LegendComponentOption) : {};

const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();
  if (!value) throw new Error(`[NetworkGraph] Missing required CSS variable "${variableName}".`);
  return value;
};

const resolveColor = (styles: CSSStyleDeclaration, color: string): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(CSS_VARIABLE_PATTERN);
  if (!match) return normalizedColor;
  const variableName = match[1];
  if (!variableName) return normalizedColor;
  const resolvedColor = styles.getPropertyValue(variableName).trim();
  if (resolvedColor) return resolveColor(styles, resolvedColor);
  const fallback = match[2]?.trim();
  if (fallback) return resolveColor(styles, fallback);
  throw new Error(`[NetworkGraph] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveNetworkGraphColors = (
  element: HTMLElement,
  colors?: NetworkGraphColors,
): NetworkGraphResolvedColors => {
  const styles = getComputedStyle(element);
  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);
  return {
    series,
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.grid),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBackground),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder),
  };
};

const resolveNode = (
  styles: CSSStyleDeclaration,
  node: NetworkGraphNode,
  index: number,
  colors: NetworkGraphResolvedColors,
): NetworkGraphResolvedNode => {
  const color =
    node.color !== undefined
      ? resolveColor(styles, node.color)
      : colors.series[index % colors.series.length];
  if (!color) throw new Error('[NetworkGraph] At least one series color is required.');
  return {
    ...(node.id !== undefined ? { id: String(node.id) } : {}),
    name: node.name,
    ...(node.value !== undefined ? { value: node.value } : {}),
    symbolSize: node.symbolSize ?? NETWORK_GRAPH_CONFIG.symbolSize,
    color,
  };
};

const resolveSeries = (
  element: HTMLElement,
  series: NetworkGraphSeries[],
  colors: NetworkGraphResolvedColors,
): NetworkGraphResolvedSeries[] => {
  const styles = getComputedStyle(element);
  let nodeIndex = 0;
  return series.map((item) => ({
    ...(item.label !== undefined ? { label: item.label } : {}),
    nodes: item.nodes.map((node) => resolveNode(styles, node, nodeIndex++, colors)),
    links: item.links.map((link) => ({
      source: String(link.source),
      target: String(link.target),
      ...(link.value !== undefined ? { value: link.value } : {}),
    })),
  }));
};

export const createNetworkGraphDefinition = ({
  element,
  data,
  colors,
}: {
  readonly element: HTMLElement;
  readonly data: NetworkGraphData;
  readonly colors: NetworkGraphResolvedColors;
}): NetworkGraphDefinition => ({
  type: 'network',
  series: resolveSeries(element, data.series, colors),
  networkGraphColors: colors,
});

const isGraphSeriesOption = (value: unknown): value is GraphSeriesOption =>
  isRecord(value) && value['type'] === 'graph';

const mergeGraphSeries = (
  generatedSeries: GraphSeriesOption,
  customSeries: Partial<GraphSeriesOption> | undefined,
): GraphSeriesOption => {
  if (!customSeries) return generatedSeries;
  return {
    ...generatedSeries,
    ...customSeries,
    type: 'graph',
    data: customSeries.data ?? generatedSeries.data ?? [],
    links: customSeries.links ?? generatedSeries.links ?? [],
    label: {
      ...asRecord(generatedSeries.label),
      ...asRecord(customSeries.label),
    },
    lineStyle: {
      ...asRecord(generatedSeries.lineStyle),
      ...asRecord(customSeries.lineStyle),
    },
    itemStyle: {
      ...asRecord(generatedSeries.itemStyle),
      ...asRecord(customSeries.itemStyle),
    },
    emphasis: {
      ...asRecord(generatedSeries.emphasis),
      ...asRecord(customSeries.emphasis),
    },
    force: {
      ...asRecord(generatedSeries.force),
      ...asRecord(customSeries.force),
    },
  } as GraphSeriesOption;
};

export const mergeNetworkGraphOptions = (
  generatedOptions: EChartsOption,
  options?: NetworkGraphOptions,
): EChartsOption => {
  if (!options) return generatedOptions;
  const generatedSeries = Array.isArray(generatedOptions.series)
    ? generatedOptions.series.filter(isGraphSeriesOption)
    : [];
  const customSeries = Array.isArray(options.series) ? options.series : [];
  const generatedTooltip = asTooltip(generatedOptions.tooltip);
  const customTooltip = asTooltip(options.tooltip);
  const generatedLegend = asLegend(generatedOptions.legend);
  const customLegend = asLegend(options.legend);
  const {
    crosshair: _crosshair,
    showLegend,
    boldLabels: _boldLabels,
    isBoxVisible: _isBoxVisible,
    chartBackground: _chartBackground,
    repulsion: _repulsion,
    gravity: _gravity,
    edgeLength: _edgeLength,
    friction: _friction,
    roam: _roam,
    draggable: _draggable,
    series: _series,
    tooltip: _tooltip,
    legend: _legend,
    ...rest
  } = options;
  return {
    ...generatedOptions,
    ...rest,
    tooltip: {
      ...generatedTooltip,
      ...customTooltip,
    },
    legend: {
      ...generatedLegend,
      ...(showLegend !== undefined ? { show: showLegend } : {}),
      ...customLegend,
    },
    series: generatedSeries.map((series, index) =>
      mergeGraphSeries(
        series,
        isRecord(customSeries[index])
          ? (customSeries[index] as Partial<GraphSeriesOption>)
          : undefined,
      ),
    ),
  };
};