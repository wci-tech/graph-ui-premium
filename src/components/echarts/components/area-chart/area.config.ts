import type { EChartsOption, LineSeriesOption } from 'echarts';

import * as echarts from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';

import type { AreaChartDefinition, AreaChartResolvedSeries } from './base/BaseAreaChart.utils';

import { AREA_CHART_CONFIG } from './base/BaseAreaChart.constants';

/**
 * Creates the area fill gradient for a series.
 */
const createAreaGradient = (color: string): echarts.graphic.LinearGradient =>
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,

      color: getEChartsAlphaColor(color, AREA_CHART_CONFIG.gradientStartOpacity),
    },

    {
      offset: 1,

      color: getEChartsAlphaColor(color, AREA_CHART_CONFIG.gradientEndOpacity),
    },
  ]);

/**
 * Creates one ECharts line series used by the AreaChart.
 */
const createSeries = (
  item: AreaChartResolvedSeries,
  index: number,
  appearance: AreaChartDefinition['appearance'],
): LineSeriesOption => {
  const color = item.color;

  const pointColor = item.pointColor;

  return compactObject({
    id: `area-series-${index}`,

    name: item.label,

    type: 'line',

    data: item.data,

    smooth: appearance !== 'basic',

    showSymbol: true,

    showAllSymbol: true,

    symbol: 'circle',

    symbolSize: item.pointRadius ?? AREA_CHART_CONFIG.pointRadius,

    animation: true,

    animationDuration: AREA_CHART_CONFIG.animationDuration,

    animationDurationUpdate: AREA_CHART_CONFIG.animationDuration,

    animationEasing: 'cubicOut',

    animationEasingUpdate: 'cubicOut',

    itemStyle: {
      color: pointColor,

      borderColor: pointColor,

      borderWidth: 0,
    },

    emphasis: {
      focus: 'none',

      scale: AREA_CHART_CONFIG.pointHoverScale,

      itemStyle: {
        color: pointColor,

        borderColor: getEChartsAlphaColor(pointColor, AREA_CHART_CONFIG.haloOpacity),

        borderWidth: AREA_CHART_CONFIG.haloRadius,

        borderType: 'solid',
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
      width: item.borderWidth ?? AREA_CHART_CONFIG.lineWidth,

      color,
    },

    areaStyle: {
      color: createAreaGradient(color),
    },
  }) as LineSeriesOption;
};

/**
 * Creates the final ECharts option configuration for AreaChart.
 *
 * All colors have already been resolved before reaching this layer.
 */
export const getAreaConfig = (definition: AreaChartDefinition): EChartsOption => {
  const { labels, series, appearance, areaChartColors: colors } = definition;

  if (colors.series.length === 0) {
    return {};
  }

  return {
    animation: true,

    animationThreshold: 10000,

    animationDuration: AREA_CHART_CONFIG.animationDuration,

    animationDurationUpdate: AREA_CHART_CONFIG.animationDuration,

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
    },

    legend: {
      show: true,

      top: AREA_CHART_CONFIG.legend.top,

      left: 'center',

      itemWidth: AREA_CHART_CONFIG.legend.itemWidth,

      itemHeight: AREA_CHART_CONFIG.legend.itemHeight,

      itemGap: AREA_CHART_CONFIG.legend.itemGap,

      icon: 'circle',

      textStyle: {
        color: colors.axisText,
      },
    },

    grid: {
      left: AREA_CHART_CONFIG.grid.left,

      right: AREA_CHART_CONFIG.grid.right,

      top: AREA_CHART_CONFIG.grid.top,

      bottom: AREA_CHART_CONFIG.grid.bottom,

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

    series: series.map((item, index) => createSeries(item, index, appearance)),
  };
};
