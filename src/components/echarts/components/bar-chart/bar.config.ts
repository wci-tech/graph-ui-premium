import type {
  BarSeriesOption,
  EChartsOption,
} from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import type {
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import { BAR_CHART_CONFIG } from './base/BaseBarChart.constants';

interface BarChartColors {
  readonly series: readonly string[];
  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;
  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

const getSeriesColor = (
  item: EChartsSeriesDefinition,
  index: number,
  colors: BarChartColors,
): string =>
  typeof item.color === 'string'
    ? item.color
    : colors.series[index % colors.series.length]!;

const getSeriesStack = (
  item: EChartsSeriesDefinition,
): string | undefined => {
  const stack = item['stack'];

  return typeof stack === 'string'
    ? stack
    : undefined;
};

const getSeriesNumber = (
  item: EChartsSeriesDefinition,
  property: 'barWidth' | 'borderRadius',
): number | undefined => {
  const value = item[property];

  return typeof value === 'number'
    ? value
    : undefined;
};

const createSeries = ({
  item,
  index,
  horizontal,
  barWidth,
  colors,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly index: number;
  readonly horizontal: boolean;
  readonly barWidth: number;
  readonly colors: BarChartColors;
}): BarSeriesOption => {
  const color = getSeriesColor(
    item,
    index,
    colors,
  );

  const stack = getSeriesStack(item);

  const resolvedBarWidth =
    getSeriesNumber(item, 'barWidth') ??
    barWidth;

  const borderRadius =
    getSeriesNumber(item, 'borderRadius') ??
    BAR_CHART_CONFIG.borderRadius;

  const resolvedBorderRadius = horizontal
    ? [0, borderRadius, borderRadius, 0]
    : [borderRadius, borderRadius, 0, 0];

  return compactObject({
    id: `bar-series-${index}`,

    name: item.label ?? item.name,

    type: 'bar',

    data: item.data,

    stack,

    barWidth: resolvedBarWidth,

    barMaxWidth: resolvedBarWidth,

    animation: true,

    animationDuration:
      BAR_CHART_CONFIG.animationDuration,

    animationDurationUpdate:
      BAR_CHART_CONFIG.animationDuration,

    animationEasing: 'cubicOut',

    animationEasingUpdate: 'cubicOut',

    itemStyle: {
      color,
      borderRadius: resolvedBorderRadius,
    },

    emphasis: {
      focus: 'none',

      itemStyle: {
        color,
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

export const getBarConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const colors =
    definition['barChartColors'] as
    | BarChartColors
    | undefined;

  if (!colors || colors.series.length === 0) {
    return {};
  }

  const horizontal =
    definition['horizontal'] === true;

  const definitionBarWidth =
    definition['barWidth'];

  const barWidth =
    typeof definitionBarWidth === 'number'
      ? definitionBarWidth
      : BAR_CHART_CONFIG.barWidth;

  const labels =
    definition.labels ?? [];

  const series =
    definition.series ?? [];

  const chartSeries = series.map(
    (item, index) =>
      createSeries({
        item,
        index,
        horizontal,
        barWidth,
        colors,
      }),
  );

  const categoryAxis = {
    type: 'category' as const,

    data: labels,

    boundaryGap: true,

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
  };

  const valueAxis = {
    type: 'value' as const,

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
        type: 'dashed' as const,
        color: colors.grid,
      },
    },
  };

  return {
    animation: true,

    animationThreshold: 10000,

    animationDuration:
      BAR_CHART_CONFIG.animationDuration,

    animationDurationUpdate:
      BAR_CHART_CONFIG.animationDuration,

    animationEasing: 'cubicOut',

    animationEasingUpdate: 'cubicOut',

    tooltip: {
      trigger: 'item',

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

        shadowStyle: {
          color: 'transparent',
          opacity: 0,
        },
      },
    },

    legend: {
      show: chartSeries.length > 1,

      top:
        BAR_CHART_CONFIG.legend.top,

      left: 'center',

      itemWidth:
        BAR_CHART_CONFIG.legend.itemWidth,

      itemHeight:
        BAR_CHART_CONFIG.legend.itemHeight,

      itemGap:
        BAR_CHART_CONFIG.legend.itemGap,

      textStyle: {
        color: colors.axisText,
      },
    },

    grid: {
      left:
        BAR_CHART_CONFIG.grid.left,

      right:
        BAR_CHART_CONFIG.grid.right,

      top:
        BAR_CHART_CONFIG.grid.top,

      bottom:
        BAR_CHART_CONFIG.grid.bottom,

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