import type { EChartsOption, LineSeriesOption } from 'echarts';
import * as echarts from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import { STACKED_AREA_CHART_CONFIG } from '@/components/echarts/components/stacked-area-chart/base/BaseStackedAreaChart.constants';
import type { StackedAreaChartDefinition } from '@/components/echarts/components/stacked-area-chart/base/BaseStackedAreaChart.utils';
import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';

const createStackedAreaGradient = (color: string): echarts.graphic.LinearGradient =>
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: getEChartsAlphaColor(
        color,
        STACKED_AREA_CHART_CONFIG.gradientStartOpacity,
      ),
    },
    {
      offset: 1,
      color: getEChartsAlphaColor(
        color,
        STACKED_AREA_CHART_CONFIG.gradientEndOpacity,
      ),
    },
  ]);

const createSeries = (
  item: StackedAreaChartDefinition['series'][number],
  index: number,
  appearance: StackedAreaChartDefinition['appearance'],
): LineSeriesOption => {
  const pointRadius =
    item.pointRadius ??
    STACKED_AREA_CHART_CONFIG.pointRadius;

  const borderWidth =
    item.borderWidth ??
    STACKED_AREA_CHART_CONFIG.lineWidth;

  return compactObject({
    id: `stacked-area-series-${index}`,
    name: item.label,
    type: 'line',
    stack: STACKED_AREA_CHART_CONFIG.stackId,
    data: item.data,
    smooth: appearance !== 'basic',
    showSymbol: true,
    showAllSymbol: true,
    symbol: 'circle',
    symbolSize: pointRadius,
    animation: true,
    animationDuration:
      STACKED_AREA_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      STACKED_AREA_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    itemStyle: {
      color: item.pointColor,
      borderColor: item.pointColor,
      borderWidth: 0,
    },
    emphasis: {
      focus: 'none',
      scale: STACKED_AREA_CHART_CONFIG.pointHoverScale,
      itemStyle: {
        color: item.pointColor,
        borderColor: getEChartsAlphaColor(
          item.pointColor,
          STACKED_AREA_CHART_CONFIG.haloOpacity,
        ),
        borderWidth:
          STACKED_AREA_CHART_CONFIG.haloRadius,
        borderType: 'solid',
      },
      lineStyle: {
        color: item.color,
        width: borderWidth,
      },
    },
    blur: {
      itemStyle: {
        opacity: 1,
      },
      lineStyle: {
        opacity: 1,
      },
      areaStyle: {
        opacity: 1,
      },
    },
    lineStyle: {
      width: borderWidth,
      color: item.color,
    },
    areaStyle: {
      color: createStackedAreaGradient(item.color),
    },
  }) as LineSeriesOption;
};

export const getStackedAreaConfig = (
  definition: StackedAreaChartDefinition,
): EChartsOption => {
  const {
    labels,
    series,
    appearance,
    stackedAreaChartColors: colors,
  } = definition;

  if (colors.series.length === 0) {
    return {};
  }

  return {
    animation: true,
    animationThreshold: 10000,
    animationDuration:
      STACKED_AREA_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      STACKED_AREA_CHART_CONFIG.animationDuration,
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
        type: 'line',
        snap: true,
      },
    },
    legend: {
      show: true,
      top: STACKED_AREA_CHART_CONFIG.legend.top,
      left: 'center',
      itemWidth:
        STACKED_AREA_CHART_CONFIG.legend.itemWidth,
      itemHeight:
        STACKED_AREA_CHART_CONFIG.legend.itemHeight,
      itemGap:
        STACKED_AREA_CHART_CONFIG.legend.itemGap,
      icon: 'circle',
      textStyle: {
        color: colors.axisText,
      },
    },
    grid: {
      left: STACKED_AREA_CHART_CONFIG.grid.left,
      right: STACKED_AREA_CHART_CONFIG.grid.right,
      top: STACKED_AREA_CHART_CONFIG.grid.top,
      bottom: STACKED_AREA_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: labels,
      boundaryGap: false,
      axisLabel: {
        show: true,
        color: colors.axisText,
        margin: 12,
        interval: 0,
        hideOverlap: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: colors.axisLine,
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: colors.axisLine,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        color: colors.axisText,
        margin: 10,
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
    series: series.map((item, index) =>
      createSeries(
        item,
        index,
        appearance,
      ),
    ),
  };
};