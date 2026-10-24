import type { EChartsOption } from 'echarts';

import { isRecord } from '@/common/utils/Common.utils';

import { getAreaConfig } from '../components/area-chart/area.config';
import type {
  EChartsDefinition,
  SupportedEChartType,
} from '../ECharts.types';

/**
 * Checks whether the value contains the generic ECharts definition structure.
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

  return Array.isArray(definition['series']);
};

/**
 * Creates the base ECharts configuration shared by all supported chart types.
 *
 * @param type - Supported ECharts chart type.
 * @returns Base ECharts configuration.
 */
export const getBaseEChartsConfig = (
  type: SupportedEChartType,
): EChartsOption => ({
  backgroundColor: 'transparent',

  animation: true,

  tooltip: {
    trigger: type === 'pie' ? 'item' : 'axis',

    axisPointer: {
      type: type === 'bar' || type === 'bar-line' ? 'shadow' : 'line',
    },

    backgroundColor: 'var(--wci-overlay-white-10)',

    textStyle: {
      color: 'var(--wci-black)',
    },
  },
});

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

  const type = definition.type ?? 'line';

  return {
    ...getBaseEChartsConfig(type),

    ...getChartSpecificEChartsConfig(definition),
  };
};