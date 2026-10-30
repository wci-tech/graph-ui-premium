import type { EChartsOption, LineSeriesOption } from 'echarts';
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';

import { SCATTER_LINE_CHART_CONFIG } from './base/BaseScatterLineChart.constants';
import type {
  ScatterLineChartDefinition,
  ScatterLineChartResolvedSeries,
} from './base/BaseScatterLineChart.utils';

type ScatterLineTooltipValue =
  | readonly [number, number]
  | readonly [string, string];

const isScatterLineTooltipValue = (
  value: unknown,
): value is ScatterLineTooltipValue =>
  Array.isArray(value) && value.length >= 2;

const getPointRadius = (item: ScatterLineChartResolvedSeries): number =>
  item.pointRadius !== undefined && item.pointRadius > 0
    ? item.pointRadius
    : SCATTER_LINE_CHART_CONFIG.pointRadius;

const getLineWidth = (item: ScatterLineChartResolvedSeries): number =>
  item.borderWidth !== undefined && item.borderWidth > 0
    ? item.borderWidth
    : SCATTER_LINE_CHART_CONFIG.lineWidth;

const getSmoothness = (
  definition: ScatterLineChartDefinition,
): boolean | number =>
  definition.appearance === 'basic'
    ? SCATTER_LINE_CHART_CONFIG.basicSmoothness
    : SCATTER_LINE_CHART_CONFIG.smoothSmoothness;

const createScatterLineSeries = ({
  item,
  index,
  appearance,
}: {
  readonly item: ScatterLineChartResolvedSeries;
  readonly index: number;
  readonly appearance: ScatterLineChartDefinition['appearance'];
}): LineSeriesOption => {
  const pointRadius = getPointRadius(item);
  const lineWidth = getLineWidth(item);

  return {
    id: `scatter-line-series-${index}`,
    name: item.label,
    type: 'line',
    data: item.data.map(([x, y]) => [x, y]),
    smooth:
      appearance === 'basic'
        ? SCATTER_LINE_CHART_CONFIG.basicSmoothness
        : SCATTER_LINE_CHART_CONFIG.smoothSmoothness,
    showSymbol: true,
    showAllSymbol: true,
    symbol: 'circle',
    symbolSize: pointRadius,
    animation: true,
    animationDuration: SCATTER_LINE_CHART_CONFIG.animationDuration,
    animationDurationUpdate: SCATTER_LINE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    lineStyle: {
      width: lineWidth,
      color: item.color,
    },
    itemStyle: {
      color: item.pointColor,
      borderColor: item.pointColor,
      borderWidth: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },
    emphasis: {
      focus: 'series',
      scale: SCATTER_LINE_CHART_CONFIG.pointHoverScale,
      itemStyle: {
        color: item.pointColor,
        borderColor: getEChartsAlphaColor(
          item.pointColor,
          SCATTER_LINE_CHART_CONFIG.haloOpacity,
        ),
        borderWidth: SCATTER_LINE_CHART_CONFIG.haloRadius,
        borderType: 'solid',
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      lineStyle: {
        color: item.color,
        width: lineWidth,
      },
    },
    blur: {
      lineStyle: {
        opacity: 1,
      },
      itemStyle: {
        opacity: 1,
        borderWidth: 0,
        shadowBlur: 0,
      },
    },
    select: {
      disabled: true,
    },
  };
};

const formatTooltip = (params: TopLevelFormatterParams): string => {
  const items = Array.isArray(params) ? params : [params];

  return items
    .map((item) => {
      const value = isScatterLineTooltipValue(item.value) ? item.value : [];
      const seriesName =
        typeof item.seriesName === 'string' ? item.seriesName : 'Data';

      return `${seriesName}: <b>[${value[0] ?? '-'}, ${value[1] ?? '-'}]</b>`;
    })
    .join('<br/>');
};

export const getScatterLineConfig = (
  definition: ScatterLineChartDefinition,
): EChartsOption => {
  const { series, appearance, scatterLineChartColors: colors } = definition;

  return {
    animation: true,
    animationThreshold: 10000,
    animationDuration: SCATTER_LINE_CHART_CONFIG.animationDuration,
    animationDurationUpdate: SCATTER_LINE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      trigger: 'item',
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
      axisPointer: {
        show: false,
      },
      formatter: formatTooltip,
    },
    legend: {
      show: true,
      top: SCATTER_LINE_CHART_CONFIG.legend.top,
      left: 'center',
      itemWidth: SCATTER_LINE_CHART_CONFIG.legend.itemWidth,
      itemHeight: SCATTER_LINE_CHART_CONFIG.legend.itemHeight,
      itemGap: SCATTER_LINE_CHART_CONFIG.legend.itemGap,
      icon: 'circle',
      textStyle: {
        color: colors.axisText,
      },
    },
    grid: {
      left: SCATTER_LINE_CHART_CONFIG.grid.left,
      right: SCATTER_LINE_CHART_CONFIG.grid.right,
      top: SCATTER_LINE_CHART_CONFIG.grid.top,
      bottom: SCATTER_LINE_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      position: 'bottom',
      min: 'dataMin',
      max: 'dataMax',
      boundaryGap: ['0%', '0%'],
      axisLabel: {
        show: true,
        color: colors.axisText,
        margin: 10,
        hideOverlap: false,
      },
      axisLine: {
        show: true,
        onZero: false,
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
        show: true,
        color: colors.axisText,
        margin: 12,
      },
      axisLine: {
        show: true,
        onZero: false,
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
    series: series.map((item, index) =>
      createScatterLineSeries({
        item,
        index,
        appearance,
      }),
    ),
  };
};