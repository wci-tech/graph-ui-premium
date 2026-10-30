import type { EChartsOption } from 'echarts';

import { isRecord } from '@/common/utils/Common.utils';
import { getAreaConfig } from '@/components/echarts/components/area-chart/area.config';
import type { ScatterChartDefinition } from '@/components/echarts/components/scatter-chart/base/BaseScatterChart.utils';
import { getScatterConfig } from '@/components/echarts/components/scatter-chart/scatter.config';
import type { ScatterLineChartDefinition } from '@/components/echarts/components/scatter-line-chart/base/BaseScatterLineChart.utils';
import { getScatterLineConfig } from '@/components/echarts/components/scatter-line-chart/scatterLine.config';

import { getBarConfig } from '../components/bar-chart/bar.config';
import { getBarLineConfig } from '../components/bar-line-chart/barLine.config';
import { getBubbleConfig } from '../components/bubble-chart/bubble.config';
import { getCandlestickConfig } from '../components/candlestick-chart/candlestick.config';
import { getDoughnutConfig } from '../components/doughnut-chart/doughnut.config';
import { getGanttConfig } from '../components/gantt-chart/gantt.config';
import { getGaugeConfig } from '../components/gauge-meter/gauge.config';
import { getHeatmapConfig } from '../components/heatmap-chart/heatmap.config';
import { getPieConfig } from '../components/pie-chart/pie.config';
import { getRadarConfig } from '../components/radar-chart/radar.config';
import type {
  EChartsDefinition,
  SupportedEChartType,
} from '../ECharts.types';

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
  'gantt',
  'gauge',
  'heatmap',
  'pie',
  'radar',
  'scatter',
  'scatter-line',
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
 * Checks whether the definition contains Scatter Chart-specific data.
 *
 * Scatter Chart uses tuple-based series data that is intentionally owned
 * by the Scatter Chart definition rather than the shared series definition.
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
 * Scatter Line Chart uses tuple-based series data that is intentionally owned
 * by the Scatter Line Chart definition rather than the shared series definition.
 *
 * @param definition - ECharts definition to validate.
 * @returns Whether the definition is a Scatter Line Chart definition.
 */
const isScatterLineChartDefinition = (
  definition: unknown,
): definition is ScatterLineChartDefinition => {
  if (
    !isRecord(definition) ||
    definition['type'] !== 'scatter-line'
  ) {
    return false;
  }

  return (
    Array.isArray(definition['series']) &&
    isRecord(definition['scatterLineChartColors'])
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
    type === 'scatter';

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

    case 'gantt':
      return getGanttConfig(definition);

    case 'gauge':
      return getGaugeConfig(definition);

    case 'heatmap':
      return getHeatmapConfig(definition);

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