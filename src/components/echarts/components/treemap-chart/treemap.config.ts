import type { EChartsOption, TreemapSeriesOption } from 'echarts';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import { TREEMAP_CHART_CONFIG } from './base/BaseTreemapChart.constants';
import type { TreemapChartDefinition } from './base/BaseTreemapChart.utils';

type TreemapSeriesData = NonNullable<TreemapSeriesOption['data']>;
type TreemapLevels = NonNullable<TreemapSeriesOption['levels']>;

interface TreemapTooltipParam {
  readonly name?: string;
  readonly value?: unknown;
  readonly treePathInfo?: {
    readonly name?: string;
  }[];
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getTooltipValue = (value: unknown): string => {
  if (typeof value === 'number' || typeof value === 'string') return String(value);
  if (Array.isArray(value)) return value.join(', ');
  return '';
};

const getTreemapLevels = (
  colors: TreemapChartDefinition['treemapChartColors'],
): TreemapLevels => [
    {
      itemStyle: {
        borderColor: colors.axisLine,
        borderWidth: TREEMAP_CHART_CONFIG.levelOneBorderWidth,
        gapWidth: TREEMAP_CHART_CONFIG.levelOneGapWidth,
      },
      upperLabel: {
        show: false,
      },
    },
    {
      colorSaturation: TREEMAP_CHART_CONFIG.levelTwoSaturation,
      itemStyle: {
        borderColor: colors.grid,
        borderWidth: TREEMAP_CHART_CONFIG.levelTwoBorderWidth,
        gapWidth: TREEMAP_CHART_CONFIG.levelTwoGapWidth,
      },
    },
    {
      colorSaturation: TREEMAP_CHART_CONFIG.levelThreeSaturation,
      itemStyle: {
        borderColor: colors.grid,
        borderWidth: TREEMAP_CHART_CONFIG.levelThreeBorderWidth,
        gapWidth: TREEMAP_CHART_CONFIG.levelThreeGapWidth,
      },
    },
  ];

const createSeries = (
  item: TreemapChartDefinition['series'][number],
  definition: TreemapChartDefinition,
  index: number,
): TreemapSeriesOption => {
  const colors = definition.treemapChartColors;

  return {
    id: `treemap-series-${index}`,
    name: item.label,
    type: 'treemap',
    data: item.data as TreemapSeriesData,
    visibleMin: definition.visibleMin,
    ...(definition.leafDepth !== null ? { leafDepth: definition.leafDepth } : {}),
    drillDownIcon: definition.drillDownIcon,
    roam: definition.roam,
    nodeClick: definition.nodeClick,
    label: {
      show: definition.showLabels,
      formatter: '{b}',
      color: colors.tooltipText,
      fontWeight: definition.boldLabels ? 'bold' : 'normal',
      overflow: 'truncate',
    },
    upperLabel: {
      show: definition.showUpperLabels,
      height: TREEMAP_CHART_CONFIG.upperLabelHeight,
      color: colors.tooltipText,
      backgroundColor: colors.axisLine,
      fontWeight: 'bold',
    },
    breadcrumb: {
      show: definition.showBreadcrumb,
      bottom: TREEMAP_CHART_CONFIG.breadcrumbBottom,
      itemStyle: {
        color: item.color,
        borderColor: colors.grid,
        textStyle: {
          color: colors.tooltipText,
        },
      },
      emphasis: {
        itemStyle: {
          color: item.color,
        },
      },
    },
    itemStyle: {
      color: item.color,
      borderColor: colors.grid,
      borderWidth: TREEMAP_CHART_CONFIG.borderWidth,
      gapWidth: TREEMAP_CHART_CONFIG.gapWidth,
    },
    emphasis: {
      focus: 'descendant',
      upperLabel: {
        show: true,
      },
    },
    levels: getTreemapLevels(colors),
  };
};

export const getTreemapConfig = (definition: EChartsDefinition): EChartsOption => {
  const treemapDefinition = definition as unknown as TreemapChartDefinition;
  const colors = treemapDefinition.treemapChartColors;

  if (!colors || colors.series.length === 0) return {};

  return {
    animation: true,
    animationThreshold: TREEMAP_CHART_CONFIG.animationThreshold,
    animationDuration: TREEMAP_CHART_CONFIG.animationDuration,
    animationDurationUpdate: TREEMAP_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      trigger: 'item',
      confine: true,
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      borderWidth: 1,
      textStyle: {
        color: colors.tooltipText,
      },
      formatter: (params: unknown): string => {
        if (!isRecord(params)) return '';

        const info = params as TreemapTooltipParam;
        const value = getTooltipValue(info.value);
        const treePathInfo = Array.isArray(info.treePathInfo) ? info.treePathInfo : [];
        const path = treePathInfo
          .map((item) => (typeof item.name === 'string' ? item.name : ''))
          .filter(Boolean)
          .map(escapeHtml)
          .join(' / ');
        const name = typeof info.name === 'string' ? escapeHtml(info.name) : '';

        return [
          path ? `<div style="font-size:12px;margin-bottom:4px">${path}</div>` : '',
          `<div style="font-size:14px;font-weight:700">${name}: ${escapeHtml(value)}${escapeHtml(
            treemapDefinition.valueSuffix,
          )}</div>`,
        ].join('');
      },
    },
    series: treemapDefinition.series.map((item, index) =>
      createSeries(item, treemapDefinition, index),
    ),
  };
};