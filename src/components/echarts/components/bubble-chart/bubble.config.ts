import type {
  EChartsOption,
  ScatterSeriesOption,
} from 'echarts';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

import type {
  BubblePoint,
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import { BUBBLE_CHART_CONFIG } from './base/BaseBubbleChart.constants';

interface BubbleChartColors {
  readonly series: readonly string[];
  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;
  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

const isBubbleDataPoint = (
  value: unknown,
): value is BubblePoint =>
  Array.isArray(value) &&
  value.length >= 3 &&
  typeof value[0] === 'number' &&
  typeof value[1] === 'number' &&
  typeof value[2] === 'number';

const getSeriesColor = (
  item: EChartsSeriesDefinition,
  index: number,
  colors: BubbleChartColors,
): string | undefined =>
  typeof item.color === 'string'
    ? item.color
    : colors.series[index % colors.series.length];

const getSizeMultiplier = (
  definition: EChartsDefinition,
): number => {
  const value = definition['sizeMultiplier'];

  return typeof value === 'number'
    ? value
    : BUBBLE_CHART_CONFIG.sizeMultiplier;
};

const getBubbleSeriesData = (
  item: EChartsSeriesDefinition,
): BubblePoint[] =>
  item.data.filter(isBubbleDataPoint);

const getTooltipParam = (
  params:
    | CallbackDataParams
    | CallbackDataParams[],
): CallbackDataParams | undefined =>
  Array.isArray(params)
    ? params[0]
    : params;

const createBubbleSeries = ({
  item,
  index,
  color,
  sizeMultiplier,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly index: number;
  readonly color: string;
  readonly sizeMultiplier: number;
}): ScatterSeriesOption => ({
  id: `bubble-series-${index}`,
  ...(item.label ?? item.name
    ? {
      name: item.label ?? item.name,
    }
    : {}),
  type: 'scatter',
  data: getBubbleSeriesData(item),
  symbolSize: (value: unknown) =>
    isBubbleDataPoint(value)
      ? Math.sqrt(
        Math.max(value[2], 0),
      ) * sizeMultiplier
      : BUBBLE_CHART_CONFIG.defaultSymbolSize,
  animation: true,
  animationDuration:
    BUBBLE_CHART_CONFIG.animationDuration,
  animationDurationUpdate:
    BUBBLE_CHART_CONFIG.animationDuration,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicOut',
  emphasis: {
    focus: 'series',
    label: {
      show: true,
      formatter: '{@[2]}',
      position: 'top',
    },
  },
  itemStyle: {
    color,
    opacity: BUBBLE_CHART_CONFIG.opacity,
    borderWidth:
      BUBBLE_CHART_CONFIG.borderWidth,
  },
});

export const getBubbleConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const colors =
    definition[
    'bubbleChartColors'
    ] as BubbleChartColors | undefined;

  if (
    !colors ||
    colors.series.length === 0
  ) {
    return {};
  }

  const sizeMultiplier =
    getSizeMultiplier(definition);

  const series = (
    definition.series ?? []
  ).reduce<ScatterSeriesOption[]>(
    (result, item, index) => {
      const color = getSeriesColor(
        item,
        index,
        colors,
      );

      if (!color) {
        return result;
      }

      result.push(
        createBubbleSeries({
          item,
          index,
          color,
          sizeMultiplier,
        }),
      );

      return result;
    },
    [],
  );

  return {
    animation: true,
    animationThreshold: 10000,
    animationDuration:
      BUBBLE_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      BUBBLE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      trigger: 'item',
      backgroundColor:
        colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
      axisPointer: {
        show: false,
      },
      formatter: (
        params:
          | CallbackDataParams
          | CallbackDataParams[],
      ) => {
        const param =
          getTooltipParam(params);

        if (!param) {
          return '';
        }

        const data = param.data;

        if (!isBubbleDataPoint(data)) {
          return param.seriesName ?? '';
        }

        return [
          `<b>${param.seriesName ?? ''}</b>`,
          `X: ${data[0]}`,
          `Y: ${data[1]}`,
          `Value: ${data[2]}`,
        ].join('<br/>');
      },
    },
    legend: {
      show: true,
      bottom:
        BUBBLE_CHART_CONFIG.legend.bottom,
      textStyle: {
        color: colors.axisText,
      },
    },
    grid: {
      left:
        BUBBLE_CHART_CONFIG.grid.left,
      right:
        BUBBLE_CHART_CONFIG.grid.right,
      bottom:
        BUBBLE_CHART_CONFIG.grid.bottom,
      top:
        BUBBLE_CHART_CONFIG.grid.top,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
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
        show: true,
        lineStyle: {
          color: colors.axisLine,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: colors.grid,
        },
      },
    },
    yAxis: {
      type: 'value',
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
        show: true,
        lineStyle: {
          color: colors.axisLine,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: colors.grid,
        },
      },
    },
    series,
  };
};