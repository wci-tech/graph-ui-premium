import { beforeEach, describe, expect, it, vi } from 'vitest';

import { compactObject } from '@wci-tech/core-ui-premium';
import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';

vi.mock('@wci-tech/core-ui-premium', () => ({
  compactObject: vi.fn((value: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)),
  ),
}));

const mockedCompactObject = vi.mocked(compactObject);

describe('applyEChartsSeriesAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('applies the default animation configuration to chart and series', () => {
    const result = applyEChartsSeriesAnimation(
      {
        title: {
          text: 'Revenue',
        },

        series: [
          {
            type: 'line',
            name: 'Revenue',
            data: [10, 20, 30],
          },
        ],
      },
      undefined,
    );

    expect(result).toEqual({
      title: {
        text: 'Revenue',
      },

      animation: true,
      animationThreshold: 10000,

      animationDuration: 1800,
      animationDurationUpdate: 1800,

      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',

      series: [
        {
          type: 'line',
          name: 'Revenue',
          data: [10, 20, 30],

          animation: true,

          animationDuration: 1800,
          animationDurationUpdate: 1800,

          animationEasing: 'cubicOut',
          animationEasingUpdate: 'cubicOut',
        },
      ],
    });
  });

  it('applies all provided animation options', () => {
    const animationDelay = vi.fn((index: number) => index * 100);
    const animationDelayUpdate = vi.fn((index: number) => index * 50);

    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'bar',
            data: [10, 20],
          },
        ],
      },
      {
        animation: false,

        animationDuration: 900,
        animationDurationUpdate: 700,

        animationDelay,
        animationDelayUpdate,

        animationEasing: 'linear',
        animationEasingUpdate: 'cubicInOut',
      },
    );

    expect(result).toEqual({
      animation: false,
      animationThreshold: 10000,

      animationDuration: 900,
      animationDurationUpdate: 700,

      animationDelay,
      animationDelayUpdate,

      animationEasing: 'linear',
      animationEasingUpdate: 'cubicInOut',

      series: [
        {
          type: 'bar',
          data: [10, 20],

          animation: false,

          animationDuration: 900,
          animationDurationUpdate: 700,

          animationDelay,
          animationDelayUpdate,

          animationEasing: 'linear',
          animationEasingUpdate: 'cubicInOut',
        },
      ],
    });
  });

  it('preserves animation when it is false', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            data: [10],
          },
        ],
      },
      {
        animation: false,
      },
    );

    expect(result.animation).toBe(false);

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series[0]).toMatchObject({
      animation: false,
    });
  });

  it('preserves zero animation durations', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            data: [10],
          },
        ],
      },
      {
        animationDuration: 0,
        animationDurationUpdate: 0,
      },
    );

    expect(result.animationDuration).toBe(0);
    expect(result.animationDurationUpdate).toBe(0);

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series[0]).toMatchObject({
      animationDuration: 0,
      animationDurationUpdate: 0,
    });
  });

  it('preserves numeric animation delays including zero', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'bar',
            data: [10],
          },
        ],
      },
      {
        animationDelay: 0,
        animationDelayUpdate: 250,
      },
    );

    expect(result.animationDelay).toBe(0);
    expect(result.animationDelayUpdate).toBe(250);

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series[0]).toMatchObject({
      animationDelay: 0,
      animationDelayUpdate: 250,
    });
  });

  it('preserves animation delay functions by reference', () => {
    const animationDelay = vi.fn((index: number) => index * 150);
    const animationDelayUpdate = vi.fn((index: number) => index * 75);

    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'scatter',
            data: [[10, 20]],
          },
        ],
      },
      {
        animationDelay,
        animationDelayUpdate,
      },
    );

    expect(result.animationDelay).toBe(animationDelay);
    expect(result.animationDelayUpdate).toBe(animationDelayUpdate);

    const series = Array.isArray(result.series) ? result.series : [];
    const seriesItem = series[0];

    expect(seriesItem).toMatchObject({
      animationDelay,
      animationDelayUpdate,
    });
  });

  it('uses defaults for missing options while preserving provided options', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            data: [10],
          },
        ],
      },
      {
        animationDuration: 600,
        animationEasingUpdate: 'linear',
      },
    );

    expect(result).toMatchObject({
      animation: true,

      animationDuration: 600,
      animationDurationUpdate: 1800,

      animationEasing: 'cubicOut',
      animationEasingUpdate: 'linear',
    });

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series[0]).toMatchObject({
      animation: true,

      animationDuration: 600,
      animationDurationUpdate: 1800,

      animationEasing: 'cubicOut',
      animationEasingUpdate: 'linear',
    });
  });

  it.each([undefined, null, true, false, 100, 'invalid', []])(
    'uses default animation values when options is %p',
    (options) => {
      const result = applyEChartsSeriesAnimation(
        {
          series: [
            {
              type: 'line',
              data: [10],
            },
          ],
        },
        options,
      );

      expect(result).toMatchObject({
        animation: true,
        animationThreshold: 10000,

        animationDuration: 1800,
        animationDurationUpdate: 1800,

        animationEasing: 'cubicOut',
        animationEasingUpdate: 'cubicOut',
      });
    },
  );

  it('uses defaults when animation option values are undefined', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            data: [10],
          },
        ],
      },
      {
        animation: undefined,

        animationDuration: undefined,
        animationDurationUpdate: undefined,

        animationDelay: undefined,
        animationDelayUpdate: undefined,

        animationEasing: undefined,
        animationEasingUpdate: undefined,
      },
    );

    expect(result).toEqual({
      animation: true,
      animationThreshold: 10000,

      animationDuration: 1800,
      animationDurationUpdate: 1800,

      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',

      series: [
        {
          type: 'line',
          data: [10],

          animation: true,

          animationDuration: 1800,
          animationDurationUpdate: 1800,

          animationEasing: 'cubicOut',
          animationEasingUpdate: 'cubicOut',
        },
      ],
    });
  });

  it('applies animation settings to every series', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            name: 'Revenue',
            data: [10, 20],
          },
          {
            type: 'bar',
            name: 'Profit',
            data: [5, 15],
          },
          {
            type: 'scatter',
            name: 'Forecast',
            data: [[1, 25]],
          },
        ],
      },
      {
        animationDuration: 750,
        animationEasing: 'linear',
      },
    );

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series).toHaveLength(3);

    series.forEach((seriesItem) => {
      expect(seriesItem).toMatchObject({
        animation: true,

        animationDuration: 750,
        animationDurationUpdate: 1800,

        animationEasing: 'linear',
        animationEasingUpdate: 'cubicOut',
      });
    });
  });

  it('preserves existing series properties', () => {
    const originalSeries = {
      type: 'line' as const,

      id: 'revenue-series',
      name: 'Revenue',

      data: [10, 20],

      smooth: true,
      symbol: 'circle',

      lineStyle: {
        width: 4,
        color: '#3155e7',
      },
    };

    const result = applyEChartsSeriesAnimation(
      {
        series: [originalSeries],
      },
      {
        animationDuration: 500,
      },
    );

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series[0]).toEqual({
      ...originalSeries,

      animation: true,

      animationDuration: 500,
      animationDurationUpdate: 1800,

      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',
    });
  });

  it('overrides existing animation properties on each series', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            data: [10],

            animation: false,

            animationDuration: 100,
            animationDurationUpdate: 200,

            animationDelay: 300,
            animationDelayUpdate: 400,

            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
          },
        ],
      },
      {
        animation: true,

        animationDuration: 900,
        animationDurationUpdate: 800,

        animationDelay: 50,
        animationDelayUpdate: 75,

        animationEasing: 'bounceOut',
        animationEasingUpdate: 'elasticOut',
      },
    );

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series[0]).toMatchObject({
      animation: true,

      animationDuration: 900,
      animationDurationUpdate: 800,

      animationDelay: 50,
      animationDelayUpdate: 75,

      animationEasing: 'bounceOut',
      animationEasingUpdate: 'elasticOut',
    });
  });

  it('overrides existing chart-level animation properties', () => {
    const result = applyEChartsSeriesAnimation(
      {
        animation: false,
        animationThreshold: 50,

        animationDuration: 100,
        animationDurationUpdate: 200,

        animationDelay: 300,
        animationDelayUpdate: 400,

        animationEasing: 'linear',
        animationEasingUpdate: 'linear',

        series: [],
      },
      {
        animation: true,

        animationDuration: 900,
        animationDurationUpdate: 800,

        animationDelay: 50,
        animationDelayUpdate: 75,

        animationEasing: 'bounceOut',
        animationEasingUpdate: 'elasticOut',
      },
    );

    expect(result).toEqual({
      animation: true,
      animationThreshold: 10000,

      animationDuration: 900,
      animationDurationUpdate: 800,

      animationDelay: 50,
      animationDelayUpdate: 75,

      animationEasing: 'bounceOut',
      animationEasingUpdate: 'elasticOut',

      series: [],
    });
  });

  it('uses an empty series array when chartOptions.series is undefined', () => {
    const result = applyEChartsSeriesAnimation(
      {
        title: {
          text: 'Revenue',
        },
      },
      undefined,
    );

    expect(result).toEqual({
      title: {
        text: 'Revenue',
      },

      animation: true,
      animationThreshold: 10000,

      animationDuration: 1800,
      animationDurationUpdate: 1800,

      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',

      series: [],
    });
  });

  it('uses an empty series array when chartOptions.series is not an array', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: {
          type: 'line',
          data: [10],
        },
      },
      undefined,
    );

    expect(result.series).toEqual([]);
  });

  it('supports an empty series array', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [],
      },
      {
        animationDuration: 700,
      },
    );

    expect(result).toEqual({
      animation: true,
      animationThreshold: 10000,

      animationDuration: 700,
      animationDurationUpdate: 1800,

      animationEasing: 'cubicOut',
      animationEasingUpdate: 'cubicOut',

      series: [],
    });
  });

  it('creates a new series array', () => {
    const originalSeries = [
      {
        type: 'line' as const,
        data: [10],
      },
      {
        type: 'bar' as const,
        data: [20],
      },
    ];

    const result = applyEChartsSeriesAnimation(
      {
        series: originalSeries,
      },
      undefined,
    );

    expect(result.series).not.toBe(originalSeries);
  });

  it('creates new series objects without mutating the originals', () => {
    const firstSeries = {
      type: 'line' as const,
      data: [10],
    };

    const secondSeries = {
      type: 'bar' as const,
      data: [20],
    };

    const originalSeries = [firstSeries, secondSeries];

    const result = applyEChartsSeriesAnimation(
      {
        series: originalSeries,
      },
      {
        animationDuration: 600,
      },
    );

    const series = Array.isArray(result.series) ? result.series : [];

    expect(series[0]).not.toBe(firstSeries);
    expect(series[1]).not.toBe(secondSeries);

    expect(firstSeries).toEqual({
      type: 'line',
      data: [10],
    });

    expect(secondSeries).toEqual({
      type: 'bar',
      data: [20],
    });
  });

  it('does not mutate the supplied chart options', () => {
    const chartOptions = {
      title: {
        text: 'Revenue',
      },

      animation: false,

      series: [
        {
          type: 'line' as const,
          data: [10, 20],
        },
      ],
    };

    const originalChartOptions = structuredClone(chartOptions);

    applyEChartsSeriesAnimation(chartOptions, {
      animation: true,
      animationDuration: 900,
    });

    expect(chartOptions).toEqual(originalChartOptions);
  });

  it('does not mutate the supplied animation options', () => {
    const options = {
      animation: false,

      animationDuration: 900,
      animationDurationUpdate: 800,

      animationDelay: 50,
      animationDelayUpdate: 75,

      animationEasing: 'linear' as const,
      animationEasingUpdate: 'cubicInOut' as const,
    };

    const originalOptions = {
      ...options,
    };

    applyEChartsSeriesAnimation(
      {
        series: [],
      },
      options,
    );

    expect(options).toEqual(originalOptions);
  });

  it('calls compactObject for each series and for the final chart options', () => {
    applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            data: [10],
          },
          {
            type: 'bar',
            data: [20],
          },
        ],
      },
      {
        animationDuration: 600,
      },
    );

    expect(mockedCompactObject).toHaveBeenCalledTimes(3);
  });

  it('removes undefined animation delays through compactObject', () => {
    const result = applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            data: [10],
          },
        ],
      },
      {},
    );

    expect(result).not.toHaveProperty('animationDelay');
    expect(result).not.toHaveProperty('animationDelayUpdate');

    const series = Array.isArray(result.series) ? result.series : [];
    const seriesItem = series[0];

    expect(seriesItem).not.toHaveProperty('animationDelay');
    expect(seriesItem).not.toHaveProperty('animationDelayUpdate');
  });

  it('passes the expected object to compactObject for every series', () => {
    const animationDelay = vi.fn((index: number) => index * 100);

    applyEChartsSeriesAnimation(
      {
        series: [
          {
            type: 'line',
            name: 'Revenue',
            data: [10],
          },
        ],
      },
      {
        animation: false,

        animationDuration: 500,
        animationDurationUpdate: 600,

        animationDelay,

        animationEasing: 'linear',
        animationEasingUpdate: 'cubicInOut',
      },
    );

    expect(mockedCompactObject).toHaveBeenNthCalledWith(1, {
      type: 'line',
      name: 'Revenue',
      data: [10],

      animation: false,

      animationDuration: 500,
      animationDurationUpdate: 600,

      animationDelay,
      animationDelayUpdate: undefined,

      animationEasing: 'linear',
      animationEasingUpdate: 'cubicInOut',
    });
  });

  it('passes the expected final object to compactObject', () => {
    const chartOptions = {
      title: {
        text: 'Revenue',
      },

      series: [],
    };

    applyEChartsSeriesAnimation(chartOptions, {
      animation: false,

      animationDuration: 500,
      animationDurationUpdate: 600,

      animationDelay: 100,
      animationDelayUpdate: 200,

      animationEasing: 'linear',
      animationEasingUpdate: 'cubicInOut',
    });

    expect(mockedCompactObject).toHaveBeenLastCalledWith({
      title: {
        text: 'Revenue',
      },

      series: [],

      animation: false,
      animationThreshold: 10000,

      animationDuration: 500,
      animationDurationUpdate: 600,

      animationDelay: 100,
      animationDelayUpdate: 200,

      animationEasing: 'linear',
      animationEasingUpdate: 'cubicInOut',
    });
  });
});
