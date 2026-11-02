import type {
  EChartsOption,
  LineSeriesOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';
import type {
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import { LINE_CHART_CONFIG } from './base/BaseLineChart.constants';
import type {
  LineChartAppearance,
  LineChartResolvedColors,
} from './LineChart.types';

const getSeriesColor = (
  item: EChartsSeriesDefinition,
  index: number,
  colors: LineChartResolvedColors,
): string => {
  if (typeof item.color === 'string') return item.color;

  return colors.series[index % colors.series.length]!;
};

const getPointColor = (
  item: EChartsSeriesDefinition,
  lineColor: string,
): string => {
  const pointColor = item['pointColor'];

  return typeof pointColor === 'string'
    ? pointColor
    : lineColor;
};

const getSeriesNumber = (
  item: EChartsSeriesDefinition,
  property: 'borderWidth' | 'pointRadius',
): number | undefined => {
  const value = item[property];

  return typeof value === 'number'
    ? value
    : undefined;
};

const getLineStyleType = (
  appearance: LineChartAppearance,
): 'solid' | 'dashed' | 'dotted' => {
  if (appearance === 'dashed') return 'dashed';
  if (appearance === 'dotted') return 'dotted';

  return 'solid';
};

const createSeries = ({
  item,
  index,
  appearance,
  colors,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly index: number;
  readonly appearance: LineChartAppearance;
  readonly colors: LineChartResolvedColors;
}): LineSeriesOption => {
  const color = getSeriesColor(item, index, colors);
  const pointColor = getPointColor(item, color);
  const pointRadius = getSeriesNumber(
    item,
    'pointRadius',
  );
  const borderWidth = getSeriesNumber(
    item,
    'borderWidth',
  );

  return compactObject({
    id: `line-series-${index}`,
    name: item.label ?? item.name,
    type: 'line',
    data: item.data,
    smooth: appearance === 'smooth',
    step:
      appearance === 'stepped'
        ? ('middle' as const)
        : undefined,
    showSymbol: true,
    showAllSymbol: true,
    symbol: 'circle',
    symbolSize:
      pointRadius ??
      LINE_CHART_CONFIG.pointRadius,
    animation: true,
    animationDuration:
      LINE_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      LINE_CHART_CONFIG.animationDuration,
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
        LINE_CHART_CONFIG.pointHoverScale,
      itemStyle: {
        color: pointColor,
        borderColor: getEChartsAlphaColor(
          pointColor,
          LINE_CHART_CONFIG.haloOpacity,
        ),
        borderWidth:
          LINE_CHART_CONFIG.haloRadius,
        borderType: 'solid',
      },
    },
    select: {
      disabled: true,
      itemStyle: {
        color: pointColor,
        borderColor: pointColor,
        borderWidth: 0,
      },
    },
    blur: {
      lineStyle: {
        opacity: 1,
      },
      itemStyle: {
        color: pointColor,
        borderColor: pointColor,
        borderWidth: 0,
        opacity: 1,
      },
    },
    lineStyle: {
      width:
        borderWidth ??
        LINE_CHART_CONFIG.lineWidth,
      color,
      type: getLineStyleType(appearance),
    },
  }) as LineSeriesOption;
};

export const getLineConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const colors =
    definition['lineChartColors'] as
    | LineChartResolvedColors
    | undefined;

  if (!colors || colors.series.length === 0) {
    return {};
  }

  const appearance =
    (definition['appearance'] ??
      'solid') as LineChartAppearance;

  const crosshair =
    definition['crosshair'] === true;

  const showLegend =
    definition['showLegend'] === true;

  const boldLabels =
    definition['boldLabels'] === true;

  const boldLegends =
    definition['boldLegends'] === true;

  const labels =
    definition.labels ?? [];

  const series =
    definition.series ?? [];

  const xAxis: XAXisComponentOption = {
    type: 'category',
    data: labels,
    boundaryGap: false,
    axisLabel: {
      show: true,
      color: colors.axisText,
      margin: 12,
      interval: 0,
      hideOverlap: false,
      fontWeight:
        boldLabels
          ? 'bold'
          : 'normal',
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
      show: true,
      lineStyle: {
        type: 'dashed',
        color: colors.grid,
      },
    },
    axisPointer: {
      show: crosshair,
      type: 'line',
      snap: true,
      lineStyle: {
        color: colors.axisText,
        width:
          LINE_CHART_CONFIG.crosshairWidth,
        type: 'dashed',
      },
      label: {
        show: false,
      },
    },
  };

  const yAxis: YAXisComponentOption = {
    type: 'value',
    axisLabel: {
      show: true,
      color: colors.axisText,
      margin: 10,
      fontWeight:
        boldLabels
          ? 'bold'
          : 'normal',
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
    axisPointer: {
      show: crosshair,
      type: 'line',
      snap: true,
      lineStyle: {
        color: colors.axisText,
        width:
          LINE_CHART_CONFIG.crosshairWidth,
        type: 'dashed',
      },
      label: {
        show: false,
      },
    },
  };

  return {
    animation: true,
    animationThreshold:
      LINE_CHART_CONFIG.animationThreshold,
    animationDuration:
      LINE_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      LINE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      trigger: 'axis',
      confine: true,
      backgroundColor:
        colors.tooltipBackground,
      borderColor:
        colors.tooltipBorder,
      borderWidth:
        LINE_CHART_CONFIG.tooltipBorderWidth,
      textStyle: {
        color: colors.tooltipText,
      },
      axisPointer: {
        type: crosshair
          ? 'cross'
          : 'line',
        snap: true,
        lineStyle: {
          color: colors.axisText,
          width:
            LINE_CHART_CONFIG.crosshairWidth,
          type: 'dashed',
        },
        crossStyle: {
          color: colors.axisText,
          width:
            LINE_CHART_CONFIG.crosshairWidth,
          type: 'dashed',
        },
        label: {
          show: false,
        },
      },
    },
    legend: {
      show: showLegend,
      top:
        LINE_CHART_CONFIG.legend.top,
      left: 'center',
      itemWidth:
        LINE_CHART_CONFIG.legend.itemWidth,
      itemHeight:
        LINE_CHART_CONFIG.legend.itemHeight,
      itemGap:
        LINE_CHART_CONFIG.legend.itemGap,
      icon: 'circle',
      textStyle: {
        color: colors.axisText,
        fontWeight:
          boldLegends
            ? 'bold'
            : 'normal',
      },
    },
    grid: {
      left:
        LINE_CHART_CONFIG.grid.left,
      right:
        LINE_CHART_CONFIG.grid.right,
      top:
        LINE_CHART_CONFIG.grid.top,
      bottom:
        LINE_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    axisPointer: {
      show: crosshair,
      link: [
        {
          xAxisIndex: 'all',
        },
        {
          yAxisIndex: 'all',
        },
      ],
      lineStyle: {
        color: colors.axisText,
        width:
          LINE_CHART_CONFIG.crosshairWidth,
        type: 'dashed',
      },
      label: {
        show: false,
      },
    },
    xAxis,
    yAxis,
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