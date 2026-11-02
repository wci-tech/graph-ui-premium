import type { EChartsOption } from 'echarts';

import { isRecord } from '@/common/utils/Common.utils';
import { getAreaConfig } from '@/components/echarts/components/area-chart/area.config';
import { getBarConfig } from '@/components/echarts/components/bar-chart/bar.config';
import { getBarLineConfig } from '@/components/echarts/components/bar-line-chart/barLine.config';
import { getBubbleConfig } from '@/components/echarts/components/bubble-chart/bubble.config';
import { getCandlestickConfig } from '@/components/echarts/components/candlestick-chart/candlestick.config';
import { getDoughnutConfig } from '@/components/echarts/components/doughnut-chart/doughnut.config';
import type { FunnelChartDefinition } from '@/components/echarts/components/funnel-chart/base/BaseFunnelChart.utils';
import { getFunnelConfig } from '@/components/echarts/components/funnel-chart/funnel.config';
import { getGanttConfig } from '@/components/echarts/components/gantt-chart/gantt.config';
import { getGaugeConfig } from '@/components/echarts/components/gauge-meter/gauge.config';
import { getHeatmapConfig } from '@/components/echarts/components/heatmap-chart/heatmap.config';
import { getPieConfig } from '@/components/echarts/components/pie-chart/pie.config';
import { getRadarConfig } from '@/components/echarts/components/radar-chart/radar.config';
import type { ScatterChartDefinition } from '@/components/echarts/components/scatter-chart/base/BaseScatterChart.utils';
import { getScatterConfig } from '@/components/echarts/components/scatter-chart/scatter.config';
import type { ScatterLineChartDefinition } from '@/components/echarts/components/scatter-line-chart/base/BaseScatterLineChart.utils';
import { getScatterLineConfig } from '@/components/echarts/components/scatter-line-chart/scatterLine.config';
import type { StackedAreaChartDefinition } from '@/components/echarts/components/stacked-area-chart/base/BaseStackedAreaChart.utils';
import { getStackedAreaConfig } from '@/components/echarts/components/stacked-area-chart/stackedArea.config';
import type { StackedBarChartDefinition } from '@/components/echarts/components/stacked-bar-chart/base/BaseStackedBarChart.utils';
import { getStackedBarConfig } from '@/components/echarts/components/stacked-bar-chart/stackedBar.config';
import type {
  EChartsDefinition,
  SupportedEChartType,
} from '@/components/echarts/ECharts.types';

import { getNetworkConfig } from '../components/network-graph/network.config';
import { getTreemapConfig } from '../components/treemap-chart/treemap.config';
import { getWaterfallConfig } from '../components/waterfall-chart/waterfall.config';

/**
 * Supported ECharts chart types.
 */
const SUPPORTED_ECHART_TYPES: readonly SupportedEChartType[] = [
  'area',
  'bar',
  'bar-line',
  'bubble',
  'candlestick',
  'doughnut',
  'funnel',
  'gantt',
  'gauge',
  'heatmap',
  'network',
  'pie',
  'radar',
  'scatter',
  'scatter-line',
  'stacked-area',
  'stacked-bar',
  'treemap',
  'waterfall',
];

/**
 * Checks whether the value is a supported ECharts chart type.
 *
 * @param type - Chart type to validate.
 * @returns Whether the value is a supported ECharts chart type.
 */
const isSupportedEChartType = (
  type: unknown,
): type is SupportedEChartType =>
  typeof type === 'string' &&
  SUPPORTED_ECHART_TYPES.includes(type as SupportedEChartType);

/**
 * Checks whether the value contains a valid ECharts definition.
 *
 * Each chart owns its definition structure, so validation is based on
 * the supported chart type instead of a shared series property.
 *
 * Chart-specific data validation belongs to each chart configuration.
 * The shared validator only verifies the common chart discriminator.
 *
 * @param definition - Definition to validate.
 * @returns Whether the value is a valid ECharts definition.
 */
export const isEChartsDefinition = (
  definition: unknown,
): definition is EChartsDefinition => {
  if (!isRecord(definition)) {
    return false;
  }

  return isSupportedEChartType(definition['type']);
};

/**
 * Checks whether the definition contains Funnel Chart-specific data.
 *
 * @param definition - ECharts definition to validate.
 * @returns Whether the definition is a Funnel Chart definition.
 */
const isFunnelChartDefinition = (
  definition: unknown,
): definition is FunnelChartDefinition => {
  if (!isRecord(definition) || definition['type'] !== 'funnel') {
    return false;
  }

  return (
    Array.isArray(definition['labels']) &&
    Array.isArray(definition['series']) &&
    typeof definition['funnelAlign'] === 'string' &&
    (typeof definition['sort'] === 'string' ||
      typeof definition['sort'] === 'function') &&
    typeof definition['gap'] === 'number' &&
    typeof definition['minSize'] === 'string' &&
    typeof definition['maxSize'] === 'string' &&
    typeof definition['showLegend'] === 'boolean' &&
    typeof definition['boldLabels'] === 'boolean' &&
    typeof definition['boldLegends'] === 'boolean' &&
    isRecord(definition['funnelChartColors'])
  );
};

/**
 * Checks whether the definition contains Scatter Chart-specific data.
 *
 * @param definition - ECharts definition to validate.
 * @returns Whether the definition is a Scatter Chart definition.
 */
const isScatterChartDefinition = (
  definition: unknown,
): definition is ScatterChartDefinition => {
  if (!isRecord(definition) || definition['type'] !== 'scatter') {
    return false;
  }

  return (
    Array.isArray(definition['series']) &&
    isRecord(definition['scatterChartColors'])
  );
};

/**
 * Checks whether the definition contains Scatter Line Chart-specific data.
 *
 * @param definition - ECharts definition to validate.
 * @returns Whether the definition is a Scatter Line Chart definition.
 */
const isScatterLineChartDefinition = (
  definition: unknown,
): definition is ScatterLineChartDefinition => {
  if (!isRecord(definition) || definition['type'] !== 'scatter-line') {
    return false;
  }

  return (
    Array.isArray(definition['series']) &&
    isRecord(definition['scatterLineChartColors'])
  );
};

/**
 * Checks whether the definition contains Stacked Area Chart-specific data.
 *
 * @param definition - ECharts definition to validate.
 * @returns Whether the definition is a Stacked Area Chart definition.
 */
const isStackedAreaChartDefinition = (
  definition: unknown,
): definition is StackedAreaChartDefinition => {
  if (!isRecord(definition) || definition['type'] !== 'stacked-area') {
    return false;
  }

  return (
    Array.isArray(definition['labels']) &&
    Array.isArray(definition['series']) &&
    (definition['appearance'] === 'basic' ||
      definition['appearance'] === 'smooth') &&
    isRecord(definition['stackedAreaChartColors'])
  );
};

/**
 * Checks whether the definition contains Stacked Bar Chart-specific data.
 *
 * @param definition - ECharts definition to validate.
 * @returns Whether the definition is a Stacked Bar Chart definition.
 */
const isStackedBarChartDefinition = (
  definition: unknown,
): definition is StackedBarChartDefinition => {
  if (!isRecord(definition) || definition['type'] !== 'stacked-bar') {
    return false;
  }

  return (
    Array.isArray(definition['labels']) &&
    Array.isArray(definition['series']) &&
    typeof definition['horizontal'] === 'boolean' &&
    typeof definition['stackId'] === 'string' &&
    typeof definition['showLegend'] === 'boolean' &&
    typeof definition['boldLabels'] === 'boolean' &&
    typeof definition['boldLegends'] === 'boolean' &&
    typeof definition['maxBarWidth'] === 'number' &&
    isRecord(definition['stackedBarChartColors'])
  );
};

/**
 * Creates the base ECharts configuration shared by all supported chart types.
 *
 * @param type - Supported ECharts chart type.
 * @returns Base ECharts configuration.
 */
export const getBaseEChartsConfig = (
  type: SupportedEChartType,
): EChartsOption => {
  const isItemTooltip =
    type === 'pie' ||
    type === 'doughnut' ||
    type === 'gauge' ||
    type === 'scatter' ||
    type === 'funnel';

  const isShadowPointer =
    type === 'bar' ||
    type === 'bar-line';

  return {
    backgroundColor: 'transparent',
    animation: true,
    tooltip: {
      trigger: isItemTooltip ? 'item' : 'axis',
      axisPointer: {
        type: isShadowPointer ? 'shadow' : 'line',
      },
      backgroundColor: 'var(--wci-overlay-white-10)',
      textStyle: {
        color: 'var(--wci-black)',
      },
    },
  };
};

/**
 * Resolves the chart-specific ECharts configuration.
 *
 * Each chart type owns its configuration and receives the common
 * ECharts definition from this dispatcher.
 *
 * @param definition - Normalized ECharts chart definition.
 * @returns Chart-specific ECharts configuration.
 */
export const getChartSpecificEChartsConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  switch (definition.type) {
    case 'area':
      return getAreaConfig(definition);

    case 'bar':
      return getBarConfig(definition);

    case 'bar-line':
      return getBarLineConfig(definition);

    case 'bubble':
      return getBubbleConfig(definition);

    case 'candlestick':
      return getCandlestickConfig(definition);

    case 'doughnut':
      return getDoughnutConfig(definition);

    case 'funnel':
      return isFunnelChartDefinition(definition)
        ? getFunnelConfig(definition)
        : {};

    case 'gantt':
      return getGanttConfig(definition);

    case 'gauge':
      return getGaugeConfig(definition);

    case 'heatmap':
      return getHeatmapConfig(definition);

    case 'network':
      return getNetworkConfig(definition);

    case 'pie':
      return getPieConfig(definition);

    case 'radar':
      return getRadarConfig(definition);

    case 'scatter':
      return isScatterChartDefinition(definition)
        ? getScatterConfig(definition)
        : {};

    case 'scatter-line':
      return isScatterLineChartDefinition(definition)
        ? getScatterLineConfig(definition)
        : {};

    case 'stacked-area':
      return isStackedAreaChartDefinition(definition)
        ? getStackedAreaConfig(definition)
        : {};

    case 'stacked-bar':
      return isStackedBarChartDefinition(definition)
        ? getStackedBarConfig(definition)
        : {};

    case 'treemap':
      return getTreemapConfig(definition);

    case 'waterfall':
      return getWaterfallConfig(definition);

    default:
      return {};
  }
};

/**
 * Creates the complete ECharts option configuration.
 *
 * Combines the shared ECharts configuration with the configuration
 * provided by the resolved chart type.
 *
 * @param definition - Chart definition to convert.
 * @returns Complete ECharts option configuration.
 */
export const createEChartsOptions = (
  definition: unknown,
): EChartsOption => {
  if (!isEChartsDefinition(definition)) {
    return {};
  }

  const type = definition.type;

  if (!isSupportedEChartType(type)) {
    return {};
  }

  return {
    ...getBaseEChartsConfig(type),
    ...getChartSpecificEChartsConfig(definition),
  };
};