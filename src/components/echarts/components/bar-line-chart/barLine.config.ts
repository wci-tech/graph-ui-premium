import type {
  BarSeriesOption,
  EChartsOption,
  LineSeriesOption,
} from 'echarts';
import * as echarts from 'echarts';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';
import type {
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import type {
  BarLineChartAppearance,
  BarLineChartResolvedColors,
} from './BarLineChart.types';
import { BAR_LINE_CHART_CONFIG } from './base/BaseBarLineChart.constants';

type BarLineSeriesOption = BarSeriesOption | LineSeriesOption;
type BorderRadius = (string | number)[];

interface BarLineDefinitionConfig {
  readonly appearance: BarLineChartAppearance;
  readonly showTrendPoints: boolean;
  readonly barWidth: number;
  readonly touchBarTop: boolean;
  readonly colors: BarLineChartResolvedColors;
}

const createBarBorderRadius = (): BorderRadius => [
  BAR_LINE_CHART_CONFIG.barBorderRadius,
  BAR_LINE_CHART_CONFIG.barBorderRadius,
  0,
  0,
];

const createLineGradient = (
  color: string,
): echarts.graphic.LinearGradient =>
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: getEChartsAlphaColor(
        color,
        BAR_LINE_CHART_CONFIG.gradientStartOpacity,
      ),
    },
    {
      offset: 1,
      color: getEChartsAlphaColor(
        color,
        BAR_LINE_CHART_CONFIG.gradientEndOpacity,
      ),
    },
  ]);

const getNumericData = (
  data: EChartsSeriesDefinition['data'],
): number[] =>
  Array.isArray(data)
    ? data.map((value) => (typeof value === 'number' ? value : 0))
    : [];

const getPrimaryBarValues = (
  series: readonly EChartsSeriesDefinition[],
): number[] => {
  const primaryBarSeries = series.find((item) => item.type !== 'line');

  return primaryBarSeries
    ? getNumericData(primaryBarSeries.data)
    : [];
};

const resolveLineData = (
  lineData: number[],
  barData: readonly number[],
  touchBarTop: boolean,
): number[] => {
  if (!touchBarTop) {
    return lineData;
  }

  return lineData.map(
    (lineValue, index) => barData[index] ?? lineValue,
  );
};

const getTrendPointColors = (
  values: readonly number[],
  colors: BarLineChartResolvedColors,
): string[] =>
  values.map((value, index) => {
    if (index === 0) {
      return colors.trendNeutral;
    }

    const previousValue = values[index - 1] ?? value;

    if (value > previousValue) {
      return colors.trendUp;
    }

    if (value < previousValue) {
      return colors.trendDown;
    }

    return colors.trendNeutral;
  });

const getSeriesNumber = (
  item: EChartsSeriesDefinition,
  property:
    | 'barWidth'
    | 'borderWidth'
    | 'pointRadius'
    | 'yAxisIndex',
): number | undefined => {
  const value = item[property];

  return typeof value === 'number' ? value : undefined;
};

const createBarSeries = ({
  item,
  color,
  barWidth,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly color: string;
  readonly barWidth: number;
}): BarSeriesOption => {
  const resolvedBarWidth =
    getSeriesNumber(item, 'barWidth') ?? barWidth;

  const borderWidth =
    getSeriesNumber(item, 'borderWidth') ?? 0;

  const yAxisIndex =
    getSeriesNumber(item, 'yAxisIndex');

  const borderRadius = createBarBorderRadius();

  return {
    id: `bar-line-bar-${item.label ?? item.name ?? 'series'}`,
    ...(item.label || item.name
      ? {
        name: item.label ?? item.name,
      }
      : {}),
    type: 'bar',
    data: item.data,
    ...(yAxisIndex !== undefined
      ? {
        yAxisIndex,
      }
      : {}),
    barWidth: resolvedBarWidth,
    barMaxWidth: resolvedBarWidth,
    animation: true,
    animationDuration:
      BAR_LINE_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      BAR_LINE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    itemStyle: {
      color,
      borderColor: color,
      borderWidth,
      borderRadius,
    },
    emphasis: {
      focus: 'none',
      itemStyle: {
        color,
        borderRadius: createBarBorderRadius(),
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

const createLineSeries = ({
  item,
  color,
  data,
  appearance,
  showTrendPoints,
  colors,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly color: string;
  readonly data: number[];
  readonly appearance: BarLineChartAppearance;
  readonly showTrendPoints: boolean;
  readonly colors: BarLineChartResolvedColors;
}): LineSeriesOption => {
  const pointRadius =
    getSeriesNumber(item, 'pointRadius') ??
    BAR_LINE_CHART_CONFIG.pointRadius;

  const borderWidth =
    getSeriesNumber(item, 'borderWidth') ??
    BAR_LINE_CHART_CONFIG.lineWidth;

  const yAxisIndex =
    getSeriesNumber(item, 'yAxisIndex');

  const shouldFill = item['fill'] === true;

  const pointColors = showTrendPoints
    ? getTrendPointColors(data, colors)
    : data.map(() => color);

  const resolvedData: LineSeriesOption['data'] = data.map(
    (value, index) => {
      const pointColor = pointColors[index] ?? color;

      return {
        value,
        symbol: 'circle',
        symbolSize: pointRadius,
        itemStyle: {
          color: pointColor,
          borderColor: pointColor,
          borderWidth: 0,
        },
        emphasis: {
          itemStyle: {
            color: pointColor,
            borderColor: getEChartsAlphaColor(
              pointColor,
              BAR_LINE_CHART_CONFIG.haloOpacity,
            ),
            borderWidth:
              BAR_LINE_CHART_CONFIG.haloRadius,
            borderType: 'solid',
          },
        },
      };
    },
  );

  return {
    id: `bar-line-line-${item.label ?? item.name ?? 'series'}`,
    ...(item.label || item.name
      ? {
        name: item.label ?? item.name,
      }
      : {}),
    type: 'line',
    data: resolvedData,
    ...(yAxisIndex !== undefined
      ? {
        yAxisIndex,
      }
      : {}),
    smooth: appearance !== 'basic',
    showSymbol: true,
    showAllSymbol: true,
    symbol: 'circle',
    symbolSize: pointRadius,
    animation: true,
    animationDuration:
      BAR_LINE_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      BAR_LINE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    lineStyle: {
      width: borderWidth,
      color,
    },
    itemStyle: {
      color,
      borderColor: color,
      borderWidth: 0,
    },
    emphasis: {
      focus: 'none',
      scale: BAR_LINE_CHART_CONFIG.pointHoverScale,
      itemStyle: {
        color,
        borderColor: getEChartsAlphaColor(
          color,
          BAR_LINE_CHART_CONFIG.haloOpacity,
        ),
        borderWidth:
          BAR_LINE_CHART_CONFIG.haloRadius,
        borderType: 'solid',
      },
    },
    blur: {
      lineStyle: {
        opacity: 1,
      },
      itemStyle: {
        opacity: 1,
      },
      ...(shouldFill
        ? {
          areaStyle: {
            opacity: 1,
          },
        }
        : {}),
    },
    ...(shouldFill
      ? {
        areaStyle: {
          color: createLineGradient(color),
        },
      }
      : {}),
  };
};

const getDefinitionConfig = (
  definition: EChartsDefinition,
): BarLineDefinitionConfig | undefined => {
  const colors = definition['barLineChartColors'] as
    | BarLineChartResolvedColors
    | undefined;

  if (!colors || colors.series.length === 0) {
    return undefined;
  }

  return {
    colors,
    appearance:
      definition['appearance'] === 'basic'
        ? 'basic'
        : 'smooth',
    showTrendPoints:
      definition['showTrendPoints'] !== false,
    barWidth:
      typeof definition['barWidth'] === 'number'
        ? definition['barWidth']
        : BAR_LINE_CHART_CONFIG.barWidth,
    touchBarTop:
      definition['touchBarTop'] !== false,
  };
};

export const getBarLineConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const config = getDefinitionConfig(definition);

  if (!config) {
    return {};
  }

  const series = definition.series ?? [];
  const primaryBarValues =
    getPrimaryBarValues(series);

  const resolvedSeries = series.map<BarLineSeriesOption>(
    (item, index) => {
      const color =
        typeof item.color === 'string'
          ? item.color
          : config.colors.series[
          index % config.colors.series.length
          ];

      if (!color) {
        throw new Error(
          '[BarLineChart] Unable to resolve series color.',
        );
      }

      if (item.type === 'line') {
        const lineData = resolveLineData(
          getNumericData(item.data),
          primaryBarValues,
          config.touchBarTop,
        );

        return createLineSeries({
          item,
          color,
          data: lineData,
          appearance: config.appearance,
          showTrendPoints:
            config.showTrendPoints,
          colors: config.colors,
        });
      }

      return createBarSeries({
        item,
        color,
        barWidth: config.barWidth,
      });
    },
  );

  return {
    animation: true,
    animationThreshold: 10000,
    animationDuration:
      BAR_LINE_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      BAR_LINE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      show: true,
      trigger: 'axis',
      confine: true,
      backgroundColor:
        config.colors.tooltipBackground,
      borderColor:
        config.colors.tooltipBorder,
      textStyle: {
        color: config.colors.tooltipText,
      },
      axisPointer: {
        show: false,
        type: 'none',
        snap: true,
        lineStyle: {
          color: config.colors.axisLine,
          width: 1,
          type: 'dashed',
        },
      },
    },
    legend: {
      show: true,
      top: BAR_LINE_CHART_CONFIG.legend.top,
      left: 'center',
      itemWidth:
        BAR_LINE_CHART_CONFIG.legend.itemWidth,
      itemHeight:
        BAR_LINE_CHART_CONFIG.legend.itemHeight,
      itemGap:
        BAR_LINE_CHART_CONFIG.legend.itemGap,
      icon: 'circle',
      textStyle: {
        color: config.colors.axisText,
      },
    },
    grid: {
      left: BAR_LINE_CHART_CONFIG.grid.left,
      right: BAR_LINE_CHART_CONFIG.grid.right,
      top: BAR_LINE_CHART_CONFIG.grid.top,
      bottom: BAR_LINE_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: definition.labels ?? [],
      boundaryGap: true,
      axisLabel: {
        show: true,
        color: config.colors.axisText,
        margin: 12,
        interval: 0,
        hideOverlap: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: config.colors.axisLine,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: config.colors.axisLine,
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        color: config.colors.axisText,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: config.colors.axisLine,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: config.colors.grid,
        },
      },
    },
    series: resolvedSeries,
  };
};