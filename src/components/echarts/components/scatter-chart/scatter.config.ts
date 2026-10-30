import type { EChartsOption, ScatterSeriesOption } from 'echarts';
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';

import { SCATTER_CHART_CONFIG } from './base/BaseScatterChart.constants';
import type {
  ScatterChartDefinition,
  ScatterChartResolvedSeries,
} from './base/BaseScatterChart.utils';

type ScatterTooltipValue = readonly [number, number] | readonly [string, string];

const isFormatterParam = (
  params: TopLevelFormatterParams,
): params is Exclude<TopLevelFormatterParams, TopLevelFormatterParams[]> =>
  !Array.isArray(params);

const isScatterTooltipValue = (value: unknown): value is ScatterTooltipValue =>
  Array.isArray(value) && value.length >= 2;

const getPointRadius = (
  item: ScatterChartResolvedSeries,
  defaultPointRadius: number,
): number =>
  item.pointRadius !== undefined && item.pointRadius > 0
    ? item.pointRadius
    : defaultPointRadius;

/**
 * Creates an ECharts Scatter series from a normalized Scatter Chart series.
 *
 * @param item - Normalized Scatter Chart series.
 * @param index - Series index.
 * @param pointRadius - Default point radius.
 * @returns ECharts Scatter series configuration.
 */
const createScatterSeries = (
  item: ScatterChartResolvedSeries,
  index: number,
  pointRadius: number,
): ScatterSeriesOption => {
  const symbolSize = getPointRadius(item, pointRadius);

  return {
    id: `scatter-series-${index}`,
    name: item.label,
    type: 'scatter',
    data: item.data.map(([x, y]) => [x, y]),
    symbol: 'circle',
    symbolSize,
    animation: true,
    animationDuration: SCATTER_CHART_CONFIG.animationDuration,
    animationDurationUpdate: SCATTER_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    itemStyle: {
      color: item.color,
      opacity: 1,
      borderColor: item.color,
      borderWidth: 0,
    },
    emphasis: {
      focus: 'none',
      scale: SCATTER_CHART_CONFIG.pointHoverScale,
      itemStyle: {
        color: item.color,
        opacity: 1,
        borderColor: getEChartsAlphaColor(
          item.color,
          SCATTER_CHART_CONFIG.haloOpacity,
        ),
        borderWidth: SCATTER_CHART_CONFIG.haloRadius,
        borderType: 'solid',
      },
    },
    blur: {
      itemStyle: {
        opacity: 1,
      },
    },
    select: {
      disabled: true,
    },
  };
};

/**
 * Formats Scatter Chart tooltip content.
 *
 * @param params - ECharts tooltip formatter parameters.
 * @returns Formatted tooltip content.
 */
const formatTooltip = (params: TopLevelFormatterParams): string => {
  if (!isFormatterParam(params)) return '';

  const value = isScatterTooltipValue(params.value) ? params.value : [];
  const seriesName =
    typeof params.seriesName === 'string' ? params.seriesName : 'Data';

  return `${seriesName}<br/>Data: <b>[${value[0] ?? '-'}, ${value[1] ?? '-'}]</b>`;
};

/**
 * Creates the ECharts-specific Scatter Chart configuration.
 *
 * @param definition - Normalized Scatter Chart definition.
 * @returns ECharts Scatter configuration.
 */
export const getScatterConfig = (
  definition: ScatterChartDefinition,
): EChartsOption => {
  const { series, scatterChartColors: colors } = definition;

  if (colors.series.length === 0) return {};

  const scatterSeries = series.map((item, index) =>
    createScatterSeries(
      item,
      index,
      SCATTER_CHART_CONFIG.pointRadius,
    ),
  );

  return {
    animation: true,
    animationThreshold: 10000,
    animationDuration: SCATTER_CHART_CONFIG.animationDuration,
    animationDurationUpdate: SCATTER_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    grid: {
      left: SCATTER_CHART_CONFIG.grid.left,
      right: SCATTER_CHART_CONFIG.grid.right,
      top: SCATTER_CHART_CONFIG.grid.top,
      bottom: SCATTER_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      formatter: formatTooltip,
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
      axisPointer: {
        show: false,
        type: 'line',
        snap: false,
        lineStyle: {
          color: colors.axisLine,
          width: 1,
          type: 'dashed',
        },
        crossStyle: {
          color: colors.axisLine,
          width: 1,
          type: 'dashed',
        },
        label: {
          show: true,
          color: colors.tooltipText,
          backgroundColor: colors.tooltipBackground,
        },
      },
    },
    legend: {
      show: scatterSeries.length > 1,
      left: 'center',
      bottom: SCATTER_CHART_CONFIG.legend.bottom,
      itemWidth: SCATTER_CHART_CONFIG.legend.itemWidth,
      itemHeight: SCATTER_CHART_CONFIG.legend.itemHeight,
      itemGap: SCATTER_CHART_CONFIG.legend.itemGap,
      icon: 'circle',
      textStyle: {
        color: colors.axisText,
      },
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
    series: scatterSeries,
  };
};