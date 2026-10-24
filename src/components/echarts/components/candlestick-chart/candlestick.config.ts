import type {
  BarSeriesOption,
  CandlestickSeriesOption,
  EChartsOption,
} from 'echarts';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import type {
  CandlestickChartPoint,
  CandlestickChartResolvedColors,
} from './CandlestickChart.types';
import { CANDLESTICK_CHART_CONFIG } from './base/BaseCandlestickChart.constants';

type CandlestickValue = [
  open: number,
  close: number,
  low: number,
  high: number,
];

interface CandlestickDefinition {
  readonly labels: string[];
  readonly series: readonly CandlestickChartPoint[];
  readonly candlestickChartColors: CandlestickChartResolvedColors;
}

const toNumber = (value: string | number): number =>
  Number.parseFloat(String(value));

const toCandlestickValue = (
  point: CandlestickChartPoint,
): CandlestickValue => [
    toNumber(point.o),
    toNumber(point.c),
    toNumber(point.l),
    toNumber(point.h),
  ];

const createCandlestickSeries = (
  data: readonly CandlestickChartPoint[],
  colors: CandlestickChartResolvedColors,
): CandlestickSeriesOption => ({
  name: 'OHLC',
  type: 'candlestick',
  data: data.map(toCandlestickValue),
  itemStyle: {
    color: colors.up,
    color0: colors.down,
    borderColor: colors.up,
    borderColor0: colors.down,
  },
});

const createVolumeSeries = (
  data: readonly CandlestickChartPoint[],
  colors: CandlestickChartResolvedColors,
): BarSeriesOption => ({
  name: 'Volume',
  type: 'bar',
  xAxisIndex: 1,
  yAxisIndex: 1,
  barWidth: CANDLESTICK_CHART_CONFIG.volumeBarWidth,
  data: data.map((point) => {
    const open = toNumber(point.o);
    const close = toNumber(point.c);

    return {
      value: toNumber(point.v),
      itemStyle: {
        color:
          close > open
            ? colors.volumeUp
            : close < open
              ? colors.volumeDown
              : colors.unchanged,
      },
    };
  }),
});

export const getCandlestickConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const resolvedDefinition =
    definition as unknown as CandlestickDefinition;

  const {
    labels,
    series,
    candlestickChartColors: colors,
  } = resolvedDefinition;

  if (!colors || series.length === 0) {
    return {};
  }

  return {
    legend: {
      show: false,
      top: CANDLESTICK_CHART_CONFIG.legendTop,
      textStyle: {
        color: colors.axisText,
      },
    },
    grid: [
      {
        ...CANDLESTICK_CHART_CONFIG.priceGrid,
        containLabel: true,
      },
      {
        ...CANDLESTICK_CHART_CONFIG.volumeGrid,
        containLabel: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
      axisPointer: {
        type: 'cross',
        lineStyle: {
          color: colors.crosshair,
          type: 'dashed',
        },
        crossStyle: {
          color: colors.crosshair,
          type: 'dashed',
        },
      },
    },
    axisPointer: {
      link: [{ xAxisIndex: 'all' }],
      label: {
        backgroundColor:
          colors.crosshairLabelBackground,
        color: colors.crosshairLabelText,
      },
    },
    xAxis: [
      {
        type: 'category',
        data: labels,
        boundaryGap: true,
        axisLabel: {
          color: colors.axisText,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors.axisLine,
          },
        },
        axisTick: {
          lineStyle: {
            color: colors.axisLine,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: colors.grid,
          },
        },
      },
      {
        type: 'category',
        gridIndex: 1,
        data: labels,
        boundaryGap: true,
        axisLabel: {
          color: colors.axisText,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors.axisLine,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        position: 'right',
        axisLabel: {
          color: colors.axisText,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors.axisLine,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: colors.grid,
          },
        },
      },
      {
        type: 'value',
        gridIndex: 1,
        position: 'right',
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      createCandlestickSeries(series, colors),
      createVolumeSeries(series, colors),
    ],
  };
};