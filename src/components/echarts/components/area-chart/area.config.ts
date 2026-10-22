import type { EChartsOption, LineSeriesOption } from 'echarts';
import * as echarts from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';

import type {
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import { AREA_CHART_CONFIG } from './base/BaseAreaChart.constants';

/**
 * Resolved color configuration used by the AreaChart ECharts adapter.
 */
interface AreaChartColors {
  readonly series: readonly string[];
  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;
  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

/**
 * Creates the area fill gradient for a series.
 */
const createAreaGradient = (
  color: string,
): echarts.graphic.LinearGradient =>
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: getEChartsAlphaColor(
        color,
        AREA_CHART_CONFIG.gradientStartOpacity,
      ),
    },
    {
      offset: 1,
      color: getEChartsAlphaColor(
        color,
        AREA_CHART_CONFIG.gradientEndOpacity,
      ),
    },
  ]);

/**
 * Resolves the line color for an AreaChart series.
 */
const getSeriesColor = (
  item: EChartsSeriesDefinition,
  index: number,
  colors: AreaChartColors,
): string =>
  typeof item.color === 'string'
    ? item.color
    : colors.series[index % colors.series.length]!;

/**
 * Resolves the point color for an AreaChart series.
 */
const getPointColor = (
  item: EChartsSeriesDefinition,
  lineColor: string,
): string => {
  const pointColor = item['pointColor'];

  return typeof pointColor === 'string'
    ? pointColor
    : lineColor;
};

/**
 * Resolves an optional numeric series property.
 */
const getSeriesNumber = (
  item: EChartsSeriesDefinition,
  property: 'borderWidth' | 'pointRadius',
): number | undefined => {
  const value = item[property];

  return typeof value === 'number'
    ? value
    : undefined;
};

/**
 * Creates one ECharts line series used by the AreaChart.
 */
const createSeries = ({
  item,
  index,
  appearance,
  colors,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly index: number;
  readonly appearance: unknown;
  readonly colors: AreaChartColors;
}): LineSeriesOption => {
  const color = getSeriesColor(
    item,
    index,
    colors,
  );

  const pointColor = getPointColor(
    item,
    color,
  );

  const pointRadius = getSeriesNumber(
    item,
    'pointRadius',
  );

  const borderWidth = getSeriesNumber(
    item,
    'borderWidth',
  );

  return compactObject({
    id: `area-series-${index}`,

    name: item.label ?? item.name,

    type: 'line',

    data: item.data,

    smooth: appearance !== 'basic',

    showSymbol: true,

    showAllSymbol: true,

    symbol: 'circle',

    symbolSize:
      pointRadius ??
      AREA_CHART_CONFIG.pointRadius,

    animation: true,

    animationDuration:
      AREA_CHART_CONFIG.animationDuration,

    animationDurationUpdate:
      AREA_CHART_CONFIG.animationDuration,

    animationEasing: 'cubicOut',

    animationEasingUpdate: 'cubicOut',

    itemStyle: {
      color: pointColor,

      borderColor: pointColor,

      borderWidth: 0,
    },

    emphasis: {
      focus: 'none',

      scale:
        AREA_CHART_CONFIG.pointHoverScale,

      itemStyle: {
        color: pointColor,

        borderColor: getEChartsAlphaColor(
          pointColor,
          AREA_CHART_CONFIG.haloOpacity,
        ),

        borderWidth:
          AREA_CHART_CONFIG.haloRadius,

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
      width:
        borderWidth ??
        AREA_CHART_CONFIG.lineWidth,

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
 * The common ECharts dispatcher passes the generic ECharts definition to
 * this adapter. AreaChart-specific properties are resolved at this boundary.
 */
export const getAreaConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const colors =
    definition['areaChartColors'] as
    | AreaChartColors
    | undefined;

  if (
    !colors ||
    colors.series.length === 0
  ) {
    return {};
  }

  const appearance =
    definition['appearance'];

  const labels =
    definition.labels ?? [];

  const series =
    definition.series ?? [];

  return {
    animation: true,

    animationThreshold: 10000,

    animationDuration:
      AREA_CHART_CONFIG.animationDuration,

    animationDurationUpdate:
      AREA_CHART_CONFIG.animationDuration,

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
      },
    },

    legend: {
      show: true,

      top:
        AREA_CHART_CONFIG.legend.top,

      left: 'center',

      itemWidth:
        AREA_CHART_CONFIG.legend.itemWidth,

      itemHeight:
        AREA_CHART_CONFIG.legend.itemHeight,

      itemGap:
        AREA_CHART_CONFIG.legend.itemGap,

      icon: 'circle',

      textStyle: {
        color: colors.axisText,
      },
    },

    grid: {
      left:
        AREA_CHART_CONFIG.grid.left,

      right:
        AREA_CHART_CONFIG.grid.right,

      top:
        AREA_CHART_CONFIG.grid.top,

      bottom:
        AREA_CHART_CONFIG.grid.bottom,

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

    series: series.map(
      (item, index) =>
        createSeries({
          item,
          index,
          appearance,
          colors,
        }),
    ),
  };
};