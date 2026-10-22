// import type { EChartsOption } from 'echarts';

// import { getAreaConfig } from '../components/area-chart/area.config';
// import type { EChartsDefinition, SupportedEChartType } from '../ECharts.types';

// export const isEChartsDefinition = (definition: unknown): definition is EChartsDefinition => {
//   if (!definition || typeof definition !== 'object') return false;

//   return 'series' in definition && Array.isArray((definition as EChartsDefinition).series);
// };

// export const getBaseEChartsConfig = (type: SupportedEChartType): EChartsOption => ({
//   backgroundColor: 'transparent',
//   animation: true,

//   tooltip: {
//     trigger: type === 'pie' ? 'item' : 'axis',
//     axisPointer: {
//       type: type === 'bar' || type === 'bar-line' ? 'shadow' : 'line',
//     },
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     textStyle: {
//       color: '#333333',
//     },
//   },
// });

// export const getChartSpecificEChartsConfig = (definition: EChartsDefinition): EChartsOption => {
//   switch (definition.type) {
//     case 'area':
//       return getAreaConfig(definition);

//     default:
//       return {};
//   }
// };

// export const createEChartsOptions = (definition: unknown): EChartsOption => {
//   if (!isEChartsDefinition(definition)) return {};

//   const type = definition.type ?? 'line';

//   return {
//     ...getBaseEChartsConfig(type),
//     ...getChartSpecificEChartsConfig(definition),
//   };
// };

import type { EChartsOption } from 'echarts';

import { getAreaConfig } from '../components/area-chart/area.config';
import type {
  AreaChartDefinition,
  AreaChartResolvedColors,
  AreaChartResolvedSeries,
} from '../components/area-chart/base/BaseAreaChart.utils';
import type { EChartsDefinition, SupportedEChartType } from '../ECharts.types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'number');

const isAreaChartResolvedColors = (value: unknown): value is AreaChartResolvedColors => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isStringArray(value['series']) &&
    typeof value['axisText'] === 'string' &&
    typeof value['axisLine'] === 'string' &&
    typeof value['grid'] === 'string' &&
    typeof value['tooltipBackground'] === 'string' &&
    typeof value['tooltipText'] === 'string' &&
    typeof value['tooltipBorder'] === 'string'
  );
};

const isAreaChartResolvedSeries = (value: unknown): value is AreaChartResolvedSeries => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value['label'] === 'string' &&
    isNumberArray(value['data']) &&
    typeof value['color'] === 'string' &&
    typeof value['pointColor'] === 'string' &&
    (value['pointRadius'] === undefined || typeof value['pointRadius'] === 'number') &&
    (value['borderWidth'] === undefined || typeof value['borderWidth'] === 'number')
  );
};

/**
 * Checks whether the value contains the generic
 * ECharts definition structure.
 */
export const isEChartsDefinition = (definition: unknown): definition is EChartsDefinition => {
  if (!isRecord(definition)) {
    return false;
  }

  return Array.isArray(definition['series']);
};

/**
 * Checks whether the value is a fully normalized
 * AreaChart definition.
 *
 * The guard starts from unknown intentionally because
 * AreaChartDefinition does not extend EChartsDefinition.
 */
const isAreaChartDefinition = (definition: unknown): definition is AreaChartDefinition => {
  if (!isRecord(definition)) {
    return false;
  }

  if (definition['type'] !== 'area') {
    return false;
  }

  if (!isStringArray(definition['labels'])) {
    return false;
  }

  const appearance = definition['appearance'];

  if (appearance !== 'basic' && appearance !== 'smooth') {
    return false;
  }

  if (!isAreaChartResolvedColors(definition['areaChartColors'])) {
    return false;
  }

  const series = definition['series'];

  if (!Array.isArray(series)) {
    return false;
  }

  return series.every(isAreaChartResolvedSeries);
};

export const getBaseEChartsConfig = (type: SupportedEChartType): EChartsOption => ({
  backgroundColor: 'transparent',

  animation: true,

  tooltip: {
    trigger: type === 'pie' ? 'item' : 'axis',

    axisPointer: {
      type: type === 'bar' || type === 'bar-line' ? 'shadow' : 'line',
    },

    backgroundColor: 'rgba(255, 255, 255, 0.9)',

    textStyle: {
      color: '#333333',
    },
  },
});

/**
 * Resolves chart-specific configuration.
 *
 * Chart-specific definitions are narrowed from unknown
 * instead of being forced into EChartsDefinition.
 */
export const getChartSpecificEChartsConfig = (definition: unknown): EChartsOption => {
  if (isAreaChartDefinition(definition)) {
    return getAreaConfig(definition);
  }

  return {};
};

export const createEChartsOptions = (definition: unknown): EChartsOption => {
  if (isAreaChartDefinition(definition)) {
    return {
      ...getBaseEChartsConfig(definition.type),

      ...getAreaConfig(definition),
    };
  }

  if (!isEChartsDefinition(definition)) {
    return {};
  }

  const type = definition.type ?? 'line';

  return {
    ...getBaseEChartsConfig(type),

    ...getChartSpecificEChartsConfig(definition),
  };
};
