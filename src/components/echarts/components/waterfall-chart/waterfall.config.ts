import type { BarSeriesOption, EChartsOption } from 'echarts';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import { WATERFALL_CHART_CONFIG } from './base/BaseWaterfallChart.constants';
import type {
  WaterfallChartDefinition,
  WaterfallChartPoint,
} from './base/BaseWaterfallChart.utils';

type WaterfallSeriesData = NonNullable<BarSeriesOption['data']>;

interface WaterfallTooltipParam {
  readonly dataIndex?: number;
}

const createHelperData = (points: WaterfallChartPoint[]): WaterfallSeriesData =>
  points.map((point) => Math.min(point.start, point.end));

const createValueData = (points: WaterfallChartPoint[]): WaterfallSeriesData =>
  points.map((point) => ({
    value: Math.abs(point.end - point.start),
    itemStyle: {
      color: point.color,
      borderRadius: WATERFALL_CHART_CONFIG.borderRadius,
    },
  }));

const createHelperSeries = (
  definition: WaterfallChartDefinition,
): BarSeriesOption => ({
  id: 'waterfall-helper-series',
  name: 'Waterfall Helper',
  type: 'bar',
  stack: 'waterfall',
  silent: true,
  barGap: '-100%',
  data: createHelperData(definition.points),
  itemStyle: {
    color: 'transparent',
    borderColor: 'transparent',
  },
  emphasis: {
    disabled: true,
  },
  tooltip: {
    show: false,
  },
  animation: false,
});

const createValueSeries = (
  definition: WaterfallChartDefinition,
): BarSeriesOption => ({
  id: 'waterfall-value-series',
  name: 'Waterfall',
  type: 'bar',
  stack: 'waterfall',
  data: createValueData(definition.points),
  barWidth: WATERFALL_CHART_CONFIG.barWidth,
  barMaxWidth: WATERFALL_CHART_CONFIG.barMaxWidth,
  label: {
    show: definition.showDataLabels,
    position: 'top',
    color: definition.waterfallChartColors.axisText,
    fontWeight: definition.boldLabels ? 'bold' : 'normal',
    formatter: (params) => {
      const point = definition.points[params.dataIndex];

      if (!point) return '';

      if (point.isTotal) return String(point.end);

      return `${point.change > 0 ? '+' : ''}${point.change}`;
    },
  },
  emphasis: {
    focus: 'series',
  },
  animation: true,
  animationDuration: WATERFALL_CHART_CONFIG.animationDuration,
  animationDurationUpdate: WATERFALL_CHART_CONFIG.animationDuration,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicOut',
});

export const getWaterfallConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const waterfallDefinition = definition as unknown as WaterfallChartDefinition;
  const colors = waterfallDefinition.waterfallChartColors;

  if (!colors || colors.series.length === 0) return {};

  return {
    animation: true,
    animationThreshold: WATERFALL_CHART_CONFIG.animationThreshold,
    animationDuration: WATERFALL_CHART_CONFIG.animationDuration,
    animationDurationUpdate: WATERFALL_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      trigger: 'item',
      confine: true,
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      borderWidth: WATERFALL_CHART_CONFIG.tooltipBorderWidth,
      textStyle: {
        color: colors.tooltipText,
      },
      axisPointer: {
        show: false,
      },
      formatter: (params: unknown): string => {
        if (typeof params !== 'object' || params === null) return '';

        const info = params as WaterfallTooltipParam;

        if (typeof info.dataIndex !== 'number') return '';

        const point = waterfallDefinition.points[info.dataIndex];
        const label = waterfallDefinition.labels[info.dataIndex];

        if (!point || !label) return '';

        if (point.isTotal) {
          return `${label}<br/><strong>Total: ${point.end}</strong>`;
        }

        return `${label}<br/><strong>Change: ${point.change > 0 ? '+' : ''}${point.change}</strong><br/>Total: ${point.end}`;
      },
    },
    legend: {
      show: false,
      top: WATERFALL_CHART_CONFIG.legend.top,
      left: 'center',
      itemWidth: WATERFALL_CHART_CONFIG.legend.itemWidth,
      itemHeight: WATERFALL_CHART_CONFIG.legend.itemHeight,
      itemGap: WATERFALL_CHART_CONFIG.legend.itemGap,
      textStyle: {
        color: colors.axisText,
        fontWeight: waterfallDefinition.boldLegends ? 'bold' : 'normal',
      },
    },
    grid: {
      left: WATERFALL_CHART_CONFIG.grid.left,
      right: WATERFALL_CHART_CONFIG.grid.right,
      top: WATERFALL_CHART_CONFIG.grid.top,
      bottom: WATERFALL_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: waterfallDefinition.labels,
      axisLabel: {
        show: true,
        color: colors.axisText,
        margin: 12,
        interval: 0,
        hideOverlap: false,
        fontWeight: waterfallDefinition.boldLabels ? 'bold' : 'normal',
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
        fontWeight: waterfallDefinition.boldLabels ? 'bold' : 'normal',
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
          color: colors.grid,
        },
      },
    },
    series: [
      createHelperSeries(waterfallDefinition),
      createValueSeries(waterfallDefinition),
    ],
  };
};