import type { EChartsOption } from 'echarts';

import { isRecord } from '@/common/utils/Common.utils';
import { getAreaConfig } from '@/components/echarts/components/area-chart/area.config';

import { getBarConfig } from '../components/bar-chart/bar.config';
import { getBarLineConfig } from '../components/bar-line-chart/barLine.config';
import { getBubbleConfig } from '../components/bubble-chart/bubble.config';
import { getCandlestickConfig } from '../components/candlestick-chart/candlestick.config';
import { getDoughnutConfig } from '../components/doughnut-chart/doughnut.config';
import { getGanttConfig } from '../components/gantt-chart/gantt.config';
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
];

/**
 * Checks whether the supplied chart type is supported by ECharts.
 *
 * @param type - Chart type to validate.
 * @returns Whether the chart type is supported.
 */
const isSupportedEChartType = (
  type: unknown,
): type is SupportedEChartType =>
  typeof type === 'string' &&
  SUPPORTED_ECHART_TYPES.includes(
    type as SupportedEChartType,
  );

/**
 * Checks whether the value contains the generic ECharts definition structure.
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

  return isSupportedEChartType(
    definition['type'],
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
    type === 'doughnut';

  const isShadowPointer =
    type === 'bar' ||
    type === 'bar-line';

  return {
    backgroundColor: 'transparent',
    animation: true,

    tooltip: {
      trigger: isItemTooltip
        ? 'item'
        : 'axis',

      axisPointer: {
        type: isShadowPointer
          ? 'shadow'
          : 'line',
      },

      backgroundColor:
        'var(--wci-overlay-white-10)',

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
      return getAreaConfig(
        definition,
      );

    case 'bar':
      return getBarConfig(
        definition,
      );

    case 'bar-line':
      return getBarLineConfig(
        definition,
      );

    case 'bubble':
      return getBubbleConfig(
        definition,
      );

    case 'candlestick':
      return getCandlestickConfig(
        definition,
      );

    case 'doughnut':
      return getDoughnutConfig(
        definition,
      );

    case 'gantt':
      return getGanttConfig(
        definition,
      );

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

    ...getChartSpecificEChartsConfig(
      definition,
    ),
  };
};