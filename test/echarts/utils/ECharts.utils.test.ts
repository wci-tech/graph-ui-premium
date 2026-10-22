import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { EChartsOption } from 'echarts';

import type { EChartsDefinition, SupportedEChartType } from '@/components/echarts/ECharts.types';

const {
  getAreaConfigMock,
  getBarConfigMock,
  getBarLineConfigMock,
  getBubbleConfigMock,
  getCandlestickConfigMock,
  getDoughnutConfigMock,
  getFunnelConfigMock,
  getGanttConfigMock,
  getGaugeConfigMock,
  getHeatmapConfigMock,
  getLineConfigMock,
  getNetworkConfigMock,
  getPieConfigMock,
  getRadarConfigMock,
  getScatterConfigMock,
  getScatterLineConfigMock,
  getStackedAreaConfigMock,
  getStackedBarConfigMock,
  getSunburstConfigMock,
  getTreemapConfigMock,
  getWaterfallConfigMock,
} = vi.hoisted(() => ({
  getAreaConfigMock: vi.fn(),
  getBarConfigMock: vi.fn(),
  getBarLineConfigMock: vi.fn(),
  getBubbleConfigMock: vi.fn(),
  getCandlestickConfigMock: vi.fn(),
  getDoughnutConfigMock: vi.fn(),
  getFunnelConfigMock: vi.fn(),
  getGanttConfigMock: vi.fn(),
  getGaugeConfigMock: vi.fn(),
  getHeatmapConfigMock: vi.fn(),
  getLineConfigMock: vi.fn(),
  getNetworkConfigMock: vi.fn(),
  getPieConfigMock: vi.fn(),
  getRadarConfigMock: vi.fn(),
  getScatterConfigMock: vi.fn(),
  getScatterLineConfigMock: vi.fn(),
  getStackedAreaConfigMock: vi.fn(),
  getStackedBarConfigMock: vi.fn(),
  getSunburstConfigMock: vi.fn(),
  getTreemapConfigMock: vi.fn(),
  getWaterfallConfigMock: vi.fn(),
}));

vi.mock('@/components/echarts/components/area-chart/area.config', () => ({
  getAreaConfig: getAreaConfigMock,
}));

vi.mock('@/components/echarts/components/bar-chart/bar.config', () => ({
  getBarConfig: getBarConfigMock,
}));

vi.mock('@/components/echarts/components/bar-line-chart/barLine.config', () => ({
  getBarLineConfig: getBarLineConfigMock,
}));

vi.mock('@/components/echarts/components/bubble-chart/bubble.config', () => ({
  getBubbleConfig: getBubbleConfigMock,
}));

vi.mock('@/components/echarts/components/candlestick-chart/candlestick.config', () => ({
  getCandlestickConfig: getCandlestickConfigMock,
}));

vi.mock('@/components/echarts/components/doughnut-chart/doughnut.config', () => ({
  getDoughnutConfig: getDoughnutConfigMock,
}));

vi.mock('@/components/echarts/components/funnel-chart/funnel.config', () => ({
  getFunnelConfig: getFunnelConfigMock,
}));

vi.mock('@/components/echarts/components/gantt-chart/gantt.config', () => ({
  getGanttConfig: getGanttConfigMock,
}));

vi.mock('@/components/echarts/components/gauge-meter/gauge.config', () => ({
  getGaugeConfig: getGaugeConfigMock,
}));

vi.mock('@/components/echarts/components/heatmap-chart/heatmap.config', () => ({
  getHeatmapConfig: getHeatmapConfigMock,
}));

vi.mock('@/components/echarts/components/line-chart/line.config', () => ({
  getLineConfig: getLineConfigMock,
}));

vi.mock('@/components/echarts/components/network-graph/network.config', () => ({
  getNetworkConfig: getNetworkConfigMock,
}));

vi.mock('@/components/echarts/components/pie-chart/pie.config', () => ({
  getPieConfig: getPieConfigMock,
}));

vi.mock('@/components/echarts/components/radar-chart/radar.config', () => ({
  getRadarConfig: getRadarConfigMock,
}));

vi.mock('@/components/echarts/components/scatter-chart/scatter.config', () => ({
  getScatterConfig: getScatterConfigMock,
}));

vi.mock('@/components/echarts/components/scatter-line-chart/scatterLine.config', () => ({
  getScatterLineConfig: getScatterLineConfigMock,
}));

vi.mock('@/components/echarts/components/stacked-area-chart/stackedArea.config', () => ({
  getStackedAreaConfig: getStackedAreaConfigMock,
}));

vi.mock('@/components/echarts/components/stacked-bar-chart/stackedBar.config', () => ({
  getStackedBarConfig: getStackedBarConfigMock,
}));

vi.mock('@/components/echarts/components/sunburst-chart/sunburst.config', () => ({
  getSunburstConfig: getSunburstConfigMock,
}));

vi.mock('@/components/echarts/components/treemap-chart/treemap.config', () => ({
  getTreemapConfig: getTreemapConfigMock,
}));

vi.mock('@/components/echarts/components/waterfall-chart/waterfall.config', () => ({
  getWaterfallConfig: getWaterfallConfigMock,
}));

import {
  createEChartsOptions,
  getBaseEChartsConfig,
  getChartSpecificEChartsConfig,
  isEChartsDefinition,
} from '@/components/echarts/utils/ECharts.utils';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

type ConfigMock = ReturnType<typeof vi.fn>;

type ChartSpecificCase = readonly [
  type: SupportedEChartType,
  mock: ConfigMock,
  result: EChartsOption,
];

const createDefinition = (type: SupportedEChartType | undefined = 'line'): EChartsDefinition =>
  ({
    ...(type
      ? {
          type,
        }
      : {}),

    labels: ['January', 'February'],

    series: [
      {
        label: 'Revenue',
        data: [10, 20],
      },
    ],
  }) as EChartsDefinition;

const chartSpecificCases: readonly ChartSpecificCase[] = [
  ['area', getAreaConfigMock, { areaConfig: true } as EChartsOption],

  ['bar', getBarConfigMock, { barConfig: true } as EChartsOption],

  ['bar-line', getBarLineConfigMock, { barLineConfig: true } as EChartsOption],

  ['bubble', getBubbleConfigMock, { bubbleConfig: true } as EChartsOption],

  [
    'candlestick',
    getCandlestickConfigMock,
    {
      candlestickConfig: true,
    } as EChartsOption,
  ],

  [
    'doughnut',
    getDoughnutConfigMock,
    {
      doughnutConfig: true,
    } as EChartsOption,
  ],

  ['funnel', getFunnelConfigMock, { funnelConfig: true } as EChartsOption],

  ['gantt', getGanttConfigMock, { ganttConfig: true } as EChartsOption],

  ['gauge', getGaugeConfigMock, { gaugeConfig: true } as EChartsOption],

  ['heatmap', getHeatmapConfigMock, { heatmapConfig: true } as EChartsOption],

  ['line', getLineConfigMock, { lineConfig: true } as EChartsOption],

  ['network', getNetworkConfigMock, { networkConfig: true } as EChartsOption],

  ['pie', getPieConfigMock, { pieConfig: true } as EChartsOption],

  ['radar', getRadarConfigMock, { radarConfig: true } as EChartsOption],

  ['scatter', getScatterConfigMock, { scatterConfig: true } as EChartsOption],

  [
    'scatter-line',
    getScatterLineConfigMock,
    {
      scatterLineConfig: true,
    } as EChartsOption,
  ],

  [
    'stacked-area',
    getStackedAreaConfigMock,
    {
      stackedAreaConfig: true,
    } as EChartsOption,
  ],

  [
    'stacked-bar',
    getStackedBarConfigMock,
    {
      stackedBarConfig: true,
    } as EChartsOption,
  ],

  [
    'sunburst',
    getSunburstConfigMock,
    {
      sunburstConfig: true,
    } as EChartsOption,
  ],

  ['treemap', getTreemapConfigMock, { treemapConfig: true } as EChartsOption],

  [
    'waterfall',
    getWaterfallConfigMock,
    {
      waterfallConfig: true,
    } as EChartsOption,
  ],
];

const allConfigMocks: readonly ConfigMock[] = chartSpecificCases.map(
  ([, configMock]) => configMock,
);

/* -------------------------------------------------------------------------- */
/* Tests                                                                       */
/* -------------------------------------------------------------------------- */

describe('ECharts.utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    for (const [, configMock, result] of chartSpecificCases) {
      configMock.mockReturnValue(result);
    }
  });

  /* ------------------------------------------------------------------------ */
  /* isEChartsDefinition                                                      */
  /* ------------------------------------------------------------------------ */

  describe('isEChartsDefinition', () => {
    it('returns true for a definition with a series array', () => {
      expect(
        isEChartsDefinition({
          type: 'line',
          series: [],
        }),
      ).toBe(true);
    });

    it('returns true when type is missing but series is an array', () => {
      expect(
        isEChartsDefinition({
          series: [],
        }),
      ).toBe(true);
    });

    it('returns true when the definition has additional properties', () => {
      expect(
        isEChartsDefinition({
          type: 'bar',
          labels: ['January'],
          series: [],
          customProperty: true,
        }),
      ).toBe(true);
    });

    it.each([undefined, null, false, true, 0, 1, '', 'line', Symbol('definition'), 10n])(
      'returns false for the primitive value %s',
      (definition) => {
        expect(isEChartsDefinition(definition)).toBe(false);
      },
    );

    it('returns false for an empty object', () => {
      expect(isEChartsDefinition({})).toBe(false);
    });

    it('returns false when series is missing', () => {
      expect(
        isEChartsDefinition({
          type: 'line',
        }),
      ).toBe(false);
    });

    it.each([null, undefined, 'invalid', 123, true, {}, new Set(), new Map()])(
      'returns false when series is not an array: %s',
      (series) => {
        expect(
          isEChartsDefinition({
            type: 'line',
            series,
          }),
        ).toBe(false);
      },
    );

    it('returns true for an array because arrays are objects with a series property when assigned', () => {
      const definition: unknown[] & {
        series?: unknown[];
      } = [];

      definition.series = [];

      expect(isEChartsDefinition(definition)).toBe(true);
    });

    it('does not validate the contents of the series array', () => {
      expect(
        isEChartsDefinition({
          type: 'line',
          series: [null, 'invalid', 123],
        }),
      ).toBe(true);
    });

    it('does not require a supported chart type', () => {
      expect(
        isEChartsDefinition({
          type: 'unsupported-chart',
          series: [],
        }),
      ).toBe(true);
    });
  });

  /* ------------------------------------------------------------------------ */
  /* getBaseEChartsConfig                                                     */
  /* ------------------------------------------------------------------------ */

  describe('getBaseEChartsConfig', () => {
    it('creates the common base configuration', () => {
      expect(getBaseEChartsConfig('line')).toEqual({
        backgroundColor: 'transparent',

        animation: true,

        tooltip: {
          trigger: 'axis',

          axisPointer: {
            type: 'line',
          },

          backgroundColor: 'rgba(255, 255, 255, 0.9)',

          textStyle: {
            color: '#333333',
          },
        },
      });
    });

    it('uses item tooltip trigger for pie charts', () => {
      expect(getBaseEChartsConfig('pie')).toMatchObject({
        tooltip: {
          trigger: 'item',
        },
      });
    });

    it('uses axis tooltip trigger for non-pie charts', () => {
      const chartTypes: readonly SupportedEChartType[] = [
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
        'line',
        'network',
        'radar',
        'scatter',
        'scatter-line',
        'stacked-area',
        'stacked-bar',
        'sunburst',
        'treemap',
        'waterfall',
      ];

      for (const type of chartTypes) {
        expect(getBaseEChartsConfig(type)).toMatchObject({
          tooltip: {
            trigger: 'axis',
          },
        });
      }
    });

    it.each(['bar', 'bar-line'] as const)('uses shadow axis pointer for %s charts', (type) => {
      expect(getBaseEChartsConfig(type)).toMatchObject({
        tooltip: {
          axisPointer: {
            type: 'shadow',
          },
        },
      });
    });

    it('uses line axis pointer for pie charts', () => {
      expect(getBaseEChartsConfig('pie')).toMatchObject({
        tooltip: {
          axisPointer: {
            type: 'line',
          },
        },
      });
    });

    it('uses line axis pointer for all non-bar chart types', () => {
      const chartTypes: readonly SupportedEChartType[] = [
        'area',
        'bubble',
        'candlestick',
        'doughnut',
        'funnel',
        'gantt',
        'gauge',
        'heatmap',
        'line',
        'network',
        'pie',
        'radar',
        'scatter',
        'scatter-line',
        'stacked-area',
        'stacked-bar',
        'sunburst',
        'treemap',
        'waterfall',
      ];

      for (const type of chartTypes) {
        expect(getBaseEChartsConfig(type)).toMatchObject({
          tooltip: {
            axisPointer: {
              type: 'line',
            },
          },
        });
      }
    });

    it('returns a new object for each invocation', () => {
      const firstResult = getBaseEChartsConfig('line');
      const secondResult = getBaseEChartsConfig('line');

      expect(firstResult).toEqual(secondResult);
      expect(firstResult).not.toBe(secondResult);
      expect(firstResult.tooltip).not.toBe(secondResult.tooltip);
    });
  });

  /* ------------------------------------------------------------------------ */
  /* getChartSpecificEChartsConfig                                             */
  /* ------------------------------------------------------------------------ */

  describe('getChartSpecificEChartsConfig', () => {
    it.each(chartSpecificCases)(
      'routes the "%s" definition to its chart config',
      (type, configMock, expectedResult) => {
        const definition = createDefinition(type);

        const result = getChartSpecificEChartsConfig(definition);

        expect(configMock).toHaveBeenCalledTimes(1);
        expect(configMock).toHaveBeenCalledWith(definition);

        expect(result).toBe(expectedResult);
      },
    );

    it.each(chartSpecificCases)('calls only the expected config for "%s"', (type, expectedMock) => {
      const definition = createDefinition(type);

      getChartSpecificEChartsConfig(definition);

      for (const configMock of allConfigMocks) {
        if (configMock === expectedMock) {
          expect(configMock).toHaveBeenCalledTimes(1);
        } else {
          expect(configMock).not.toHaveBeenCalled();
        }
      }
    });

    it('returns an empty object for an unsupported chart type', () => {
      const definition = {
        type: 'unsupported-chart',
        series: [],
      } as unknown as EChartsDefinition;

      const result = getChartSpecificEChartsConfig(definition);

      expect(result).toEqual({});

      for (const configMock of allConfigMocks) {
        expect(configMock).not.toHaveBeenCalled();
      }
    });

    it('returns an empty object when type is undefined', () => {
      const definition = {
        labels: ['January', 'February'],

        series: [
          {
            label: 'Revenue',
            data: [10, 20],
          },
        ],
      } as EChartsDefinition;

      const result = getChartSpecificEChartsConfig(definition);

      expect(result).toEqual({});

      for (const configMock of allConfigMocks) {
        expect(configMock).not.toHaveBeenCalled();
      }
    });

    it('returns the exact object produced by the selected config function', () => {
      const expectedResult = {
        series: [
          {
            type: 'line',
          },
        ],
      } as EChartsOption;

      getLineConfigMock.mockReturnValueOnce(expectedResult);

      const result = getChartSpecificEChartsConfig(createDefinition('line'));

      expect(result).toBe(expectedResult);
      expect(result).toStrictEqual(expectedResult);
    });

    it('propagates an error thrown by a chart-specific config function', () => {
      const error = new Error('Unable to create scatter config');

      getScatterConfigMock.mockImplementationOnce(() => {
        throw error;
      });

      expect(() => getChartSpecificEChartsConfig(createDefinition('scatter'))).toThrow(error);

      expect(getScatterConfigMock).toHaveBeenCalledTimes(1);
    });
  });

  /* ------------------------------------------------------------------------ */
  /* createEChartsOptions                                                     */
  /* ------------------------------------------------------------------------ */

  describe('createEChartsOptions', () => {
    it('returns an empty object for an invalid definition', () => {
      expect(createEChartsOptions(undefined)).toEqual({});
      expect(createEChartsOptions(null)).toEqual({});
      expect(createEChartsOptions({})).toEqual({});
      expect(createEChartsOptions({ type: 'line' })).toEqual({});
      expect(
        createEChartsOptions({
          type: 'line',
          series: 'invalid',
        }),
      ).toEqual({});

      for (const configMock of allConfigMocks) {
        expect(configMock).not.toHaveBeenCalled();
      }
    });

    it('uses line as the default type when definition type is missing', () => {
      const definition = createDefinition(undefined);

      const result = createEChartsOptions(definition);

      expect(getLineConfigMock).toHaveBeenCalledTimes(1);
      expect(getLineConfigMock).toHaveBeenCalledWith(definition);

      expect(result).toEqual({
        backgroundColor: 'transparent',

        animation: true,

        tooltip: {
          trigger: 'axis',

          axisPointer: {
            type: 'line',
          },

          backgroundColor: 'rgba(255, 255, 255, 0.9)',

          textStyle: {
            color: '#333333',
          },
        },

        lineConfig: true,
      });
    });

    it.each(chartSpecificCases)(
      'merges base and "%s" chart-specific options',
      (type, configMock, chartSpecificOptions) => {
        const definition = createDefinition(type);

        const result = createEChartsOptions(definition);

        expect(configMock).toHaveBeenCalledTimes(1);
        expect(configMock).toHaveBeenCalledWith(definition);

        expect(result).toEqual({
          ...getBaseEChartsConfig(type),
          ...chartSpecificOptions,
        });
      },
    );

    it('allows chart-specific top-level properties to override base properties', () => {
      const chartSpecificOptions: EChartsOption = {
        backgroundColor: '#111827',

        animation: false,

        tooltip: {
          trigger: 'item',

          backgroundColor: '#222222',
        },
      };

      getLineConfigMock.mockReturnValueOnce(chartSpecificOptions);

      const result = createEChartsOptions(createDefinition('line'));

      expect(result).toEqual({
        backgroundColor: '#111827',

        animation: false,

        tooltip: {
          trigger: 'item',

          backgroundColor: '#222222',
        },
      });
    });

    it('replaces the complete base tooltip when chart-specific tooltip exists', () => {
      const chartSpecificTooltip = {
        trigger: 'item' as const,

        textStyle: {
          color: '#ffffff',
        },
      };

      getLineConfigMock.mockReturnValueOnce({
        tooltip: chartSpecificTooltip,
      });

      const result = createEChartsOptions(createDefinition('line'));

      expect(result.tooltip).toBe(chartSpecificTooltip);

      expect(result.tooltip).toEqual({
        trigger: 'item',

        textStyle: {
          color: '#ffffff',
        },
      });

      expect(result.tooltip).not.toHaveProperty('axisPointer');
      expect(result.tooltip).not.toHaveProperty('backgroundColor');
    });

    it('keeps base properties that are not overridden by chart-specific options', () => {
      getLineConfigMock.mockReturnValueOnce({
        series: [
          {
            type: 'line',
            data: [10, 20],
          },
        ],
      });

      const result = createEChartsOptions(createDefinition('line'));

      expect(result).toMatchObject({
        backgroundColor: 'transparent',
        animation: true,

        tooltip: {
          trigger: 'axis',

          axisPointer: {
            type: 'line',
          },

          backgroundColor: 'rgba(255, 255, 255, 0.9)',

          textStyle: {
            color: '#333333',
          },
        },

        series: [
          {
            type: 'line',
            data: [10, 20],
          },
        ],
      });
    });

    it('returns only the base configuration when the chart-specific config is empty', () => {
      getLineConfigMock.mockReturnValueOnce({});

      const result = createEChartsOptions(createDefinition('line'));

      expect(result).toEqual(getBaseEChartsConfig('line'));
    });

    it('returns base configuration for an unsupported type after validation succeeds', () => {
      const definition = {
        type: 'unsupported-chart',
        series: [],
      } as unknown as EChartsDefinition;

      const result = createEChartsOptions(definition);

      expect(result).toEqual({
        backgroundColor: 'transparent',

        animation: true,

        tooltip: {
          trigger: 'axis',

          axisPointer: {
            type: 'line',
          },

          backgroundColor: 'rgba(255, 255, 255, 0.9)',

          textStyle: {
            color: '#333333',
          },
        },
      });

      for (const configMock of allConfigMocks) {
        expect(configMock).not.toHaveBeenCalled();
      }
    });

    it('does not mutate the supplied definition', () => {
      const definition = createDefinition('bar');

      const definitionSnapshot = structuredClone(definition);

      createEChartsOptions(definition);

      expect(definition).toEqual(definitionSnapshot);
    });

    it('passes the exact definition object to the chart-specific config', () => {
      const definition = createDefinition('waterfall');

      createEChartsOptions(definition);

      const receivedDefinition = getWaterfallConfigMock.mock.calls[0]?.[0];

      expect(receivedDefinition).toBe(definition);
    });

    it('creates a new result object for each invocation', () => {
      const definition = createDefinition('line');

      const firstResult = createEChartsOptions(definition);
      const secondResult = createEChartsOptions(definition);

      expect(firstResult).toEqual(secondResult);
      expect(firstResult).not.toBe(secondResult);
    });

    it('propagates an error thrown by the chart-specific config', () => {
      const error = new Error('Unable to build waterfall chart options');

      getWaterfallConfigMock.mockImplementationOnce(() => {
        throw error;
      });

      expect(() => createEChartsOptions(createDefinition('waterfall'))).toThrow(error);

      expect(getWaterfallConfigMock).toHaveBeenCalledTimes(1);
    });
  });
});
