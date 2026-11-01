import type {
  BarSeriesOption,
  EChartsOption,
} from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import { STACKED_BAR_CHART_CONFIG } from './base/BaseStackedBarChart.constants';
import type { StackedBarChartDefinition } from './base/BaseStackedBarChart.utils';

const createSeries = (
  item: StackedBarChartDefinition['series'][number],
  index: number,
  definition: StackedBarChartDefinition,
): BarSeriesOption => {
  const isTerminalSeries =
    index === definition.series.length - 1;

  const borderRadius =
    item.borderRadius ??
    STACKED_BAR_CHART_CONFIG.borderRadius;

  const resolvedBorderRadius = isTerminalSeries
    ? definition.horizontal
      ? [0, borderRadius, borderRadius, 0]
      : [borderRadius, borderRadius, 0, 0]
    : 0;

  return compactObject({
    id: `stacked-bar-series-${index}`,

    name: item.label,

    type: 'bar',

    stack: definition.stackId,

    data: Array.from(item.data),

    ...(definition.barWidth !== undefined
      ? {
        barWidth: definition.barWidth,
      }
      : {}),

    barMaxWidth:
      definition.maxBarWidth,

    animation: true,

    animationDuration:
      STACKED_BAR_CHART_CONFIG.animationDuration,

    animationDurationUpdate:
      STACKED_BAR_CHART_CONFIG.animationDuration,

    animationEasing: 'cubicOut',

    animationEasingUpdate: 'cubicOut',

    itemStyle: {
      color: item.color,
      borderRadius: resolvedBorderRadius,
    },

    emphasis: {
      focus: 'series',

      itemStyle: {
        color: item.color,
        borderRadius: resolvedBorderRadius,
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

    universalTransition: {
      enabled: true,
    },
  }) as BarSeriesOption;
};

export const getStackedBarConfig = (
  definition: StackedBarChartDefinition,
): EChartsOption => {
  const {
    labels,
    series,
    horizontal,
    showLegend,
    boldLabels,
    boldLegends,
    stackedBarChartColors: colors,
  } = definition;

  if (colors.series.length === 0) {
    return {};
  }

  const chartSeries = series.map(
    (item, index) =>
      createSeries(
        item,
        index,
        definition,
      ),
  );

  const grid = horizontal
    ? STACKED_BAR_CHART_CONFIG.grid.horizontal
    : STACKED_BAR_CHART_CONFIG.grid.vertical;

  const categoryAxis = {
    type: 'category' as const,

    data: Array.from(labels),

    boundaryGap: true,

    axisLabel: {
      show: true,
      color: colors.axisText,
      margin: 12,
      interval: 0,
      hideOverlap: false,
      fontWeight: boldLabels
        ? ('bold' as const)
        : ('normal' as const),
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

    splitLine: {
      show: false,
    },
  };

  const valueAxis = {
    type: 'value' as const,

    axisLabel: {
      show: true,
      color: colors.axisText,
      margin: 10,
      fontWeight: boldLabels
        ? ('bold' as const)
        : ('normal' as const),
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
        type: 'dashed' as const,
        color: colors.grid,
      },
    },
  };

  return {
    animation: true,

    animationThreshold: 10000,

    animationDuration:
      STACKED_BAR_CHART_CONFIG.animationDuration,

    animationDurationUpdate:
      STACKED_BAR_CHART_CONFIG.animationDuration,

    animationEasing: 'cubicOut',

    animationEasingUpdate: 'cubicOut',

    tooltip: {
      trigger: 'axis',

      backgroundColor:
        colors.tooltipBackground,

      borderColor:
        colors.tooltipBorder,

      textStyle: {
        color: colors.tooltipText,
      },

      axisPointer: {
        show: false,
        type: 'line',
        snap: true,

        lineStyle: {
          color: colors.axisText,
          width: 1,
          type: 'dashed',
        },
      },
    },

    legend: {
      show: showLegend,

      bottom:
        STACKED_BAR_CHART_CONFIG.legend.bottom,

      left: 'center',

      textStyle: {
        color: colors.axisText,
        fontWeight: boldLegends
          ? 'bold'
          : 'normal',
      },
    },

    grid: {
      ...grid,

      bottom: showLegend
        ? grid.bottom
        : '6%',

      containLabel: true,
    },

    xAxis: horizontal
      ? valueAxis
      : categoryAxis,

    yAxis: horizontal
      ? categoryAxis
      : valueAxis,

    series: chartSeries,
  };
};