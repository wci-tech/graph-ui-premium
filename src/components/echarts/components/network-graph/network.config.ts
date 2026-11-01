import type { EChartsOption, GraphSeriesOption } from 'echarts';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import { NETWORK_GRAPH_CONFIG } from './base/BaseNetworkGraph.constants';
import type { NetworkGraphDefinition } from './base/BaseNetworkGraph.utils';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getDefinition = (definition: EChartsDefinition): NetworkGraphDefinition =>
  definition as unknown as NetworkGraphDefinition;

const getNumberOption = (
  options: Record<string, unknown> | undefined,
  key: string,
  fallback: number,
): number => {
  const value = options?.[key];
  return typeof value === 'number' ? value : fallback;
};

const getBooleanOption = (
  options: Record<string, unknown> | undefined,
  key: string,
  fallback: boolean,
): boolean => {
  const value = options?.[key];
  return typeof value === 'boolean' ? value : fallback;
};

const getEdgeLength = (
  options: Record<string, unknown> | undefined,
): number | [number, number] => {
  const value = options?.['edgeLength'];
  if (typeof value === 'number') return value;
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number'
  ) {
    return [value[0], value[1]];
  }
  return [...NETWORK_GRAPH_CONFIG.edgeLength];
};

export const getNetworkConfig = (definition: EChartsDefinition): EChartsOption => {
  const networkDefinition = getDefinition(definition);
  const colors = networkDefinition.networkGraphColors;
  const options = isRecord(definition['options']) ? definition['options'] : undefined;
  const series: GraphSeriesOption[] = networkDefinition.series.map((item, seriesIndex) => {
    const edgeColor =
      colors.series[(seriesIndex + 1) % colors.series.length] ?? colors.axisLine;
    return {
      id: `network-series-${seriesIndex}`,
      name: item.label ?? `Network ${seriesIndex + 1}`,
      type: 'graph',
      layout: 'force',
      roam: getBooleanOption(options, 'roam', true),
      draggable: getBooleanOption(options, 'draggable', true),
      data: item.nodes.map((node) => ({
        ...(node.id !== undefined ? { id: node.id } : {}),
        name: node.name,
        ...(node.value !== undefined ? { value: node.value } : {}),
        symbolSize: node.symbolSize,
        itemStyle: {
          color: node.color,
        },
      })),
      links: item.links.map((link) => ({
        source: String(link.source),
        target: String(link.target),
        ...(link.value !== undefined ? { value: link.value } : {}),
      })),
      label: {
        show: true,
        position: 'right',
        formatter: '{b}',
        fontSize: NETWORK_GRAPH_CONFIG.labelFontSize,
        color: colors.axisText,
      },
      force: {
        repulsion: getNumberOption(
          options,
          'repulsion',
          item.nodes.length > NETWORK_GRAPH_CONFIG.largeNetworkThreshold
            ? NETWORK_GRAPH_CONFIG.largeNetworkRepulsion
            : NETWORK_GRAPH_CONFIG.repulsion,
        ),
        gravity: getNumberOption(options, 'gravity', NETWORK_GRAPH_CONFIG.gravity),
        edgeLength: getEdgeLength(options),
        friction: getNumberOption(options, 'friction', NETWORK_GRAPH_CONFIG.friction),
        layoutAnimation: true,
      },
      lineStyle: {
        color: edgeColor,
        width: NETWORK_GRAPH_CONFIG.lineWidth,
        opacity: NETWORK_GRAPH_CONFIG.lineOpacity,
        curveness: NETWORK_GRAPH_CONFIG.lineCurveness,
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: NETWORK_GRAPH_CONFIG.emphasisLineWidth,
          opacity: NETWORK_GRAPH_CONFIG.emphasisLineOpacity,
        },
      },
    };
  });
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
      formatter: (params: unknown): string => {
        if (!isRecord(params)) return '';
        const dataType = params['dataType'];
        const name = params['name'];
        const data = params['data'];
        if (dataType === 'node') return `<b>Entity:</b> ${String(name ?? '')}`;
        if (!isRecord(data)) return '';
        return `<b>Connection:</b> ${String(data['source'] ?? '')} > ${String(data['target'] ?? '')}`;
      },
    },
    legend: {
      show: true,
      bottom: NETWORK_GRAPH_CONFIG.legendBottom,
      textStyle: {
        color: colors.axisText,
      },
    },
    series,
  };
};