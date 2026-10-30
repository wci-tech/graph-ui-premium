import type {
  EChartsOption,
  RadarComponentOption,
  RadarSeriesOption,
} from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';
import type {
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import { RADAR_CHART_CONFIG } from './base/BaseRadarChart.constants';

interface RadarChartColors {
  readonly series: readonly string[];
  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;
  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

export type RadarDataItem =
  NonNullable<
    RadarSeriesOption['data']
  >[number];

const getSeriesColor = (
  item: EChartsSeriesDefinition,
  index: number,
  colors: RadarChartColors,
): string =>
  typeof item.color === 'string'
    ? item.color
    : colors.series[
    index % colors.series.length
    ]!;

const getSeriesData = (
  item: EChartsSeriesDefinition,
): number[] =>
  Array.isArray(item.data)
    ? item.data.filter(
      (value): value is number =>
        typeof value === 'number' &&
        Number.isFinite(value),
    )
    : [];

const getMaxValue = (
  series: readonly EChartsSeriesDefinition[],
): number => {
  const values = series.flatMap(
    getSeriesData,
  );

  const maxValue = values.length
    ? Math.max(
      ...values,
      RADAR_CHART_CONFIG.minimumMaxValue,
    )
    : RADAR_CHART_CONFIG.minimumMaxValue;

  return Math.ceil(
    maxValue *
    RADAR_CHART_CONFIG.maxValueScale,
  );
};

export const getRadarPointSymbolSize =
  (): number =>
    RADAR_CHART_CONFIG.pointSize;

export const getRadarPointHoverSymbolSize =
  (): number =>
    RADAR_CHART_CONFIG.pointSize *
    RADAR_CHART_CONFIG.pointHoverScale;

const createRadarDataItem = ({
  item,
  index,
  colors,
}: {
  readonly item: EChartsSeriesDefinition;
  readonly index: number;
  readonly colors: RadarChartColors;
}): RadarDataItem => {
  const color = getSeriesColor(
    item,
    index,
    colors,
  );

  return compactObject({
    value: getSeriesData(item),

    name:
      item.label ??
      item.name ??
      `Series ${index + 1}`,

    symbol: 'circle',

    symbolSize:
      RADAR_CHART_CONFIG.pointSize,

    itemStyle: {
      color,
      borderColor: color,
      borderWidth: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },

    lineStyle: {
      color,
      width:
        RADAR_CHART_CONFIG.lineWidth,
    },

    areaStyle: {
      color,
      opacity:
        RADAR_CHART_CONFIG.areaOpacity,
    },

    emphasis: {
      focus: 'none',

      itemStyle: {
        color,

        borderColor:
          getEChartsAlphaColor(
            color,
            RADAR_CHART_CONFIG.haloOpacity,
          ),

        borderWidth:
          RADAR_CHART_CONFIG.haloRadius,

        borderType: 'solid',

        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },

      lineStyle: {
        color,
        width:
          RADAR_CHART_CONFIG.lineWidth,
      },

      areaStyle: {
        color,
        opacity:
          RADAR_CHART_CONFIG.areaOpacity,
      },
    },
  }) as RadarDataItem;
};

export const getRadarConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const colors =
    definition[
    'radarChartColors'
    ] as RadarChartColors | undefined;

  if (
    !colors ||
    colors.series.length === 0
  ) {
    return {};
  }

  const labels =
    definition.labels ?? [];

  const series =
    definition.series ?? [];

  const boldLabels =
    definition['boldLabels'] === true;

  const boldLegends =
    definition['boldLegends'] === true;

  const radar: RadarComponentOption = {
    indicator: labels.map(
      (label) => ({
        name: String(label),
        max: getMaxValue(series),
      }),
    ),

    shape: 'polygon',

    radius:
      RADAR_CHART_CONFIG.radius,

    center: [
      ...RADAR_CHART_CONFIG.center,
    ],

    splitNumber:
      RADAR_CHART_CONFIG.splitNumber,

    axisName: {
      color: colors.axisText,

      fontWeight: boldLabels
        ? 'bold'
        : 'normal',
    },

    // Keep radial spoke lines hidden.
    axisLine: {
      show: false,
    },

    splitLine: {
      show: true,

      lineStyle: {
        color: [colors.grid],
      },
    },

    splitArea: {
      show: false,
    },
  };

  const radarSeries: RadarSeriesOption = {
    id: 'radar-series',

    type: 'radar',

    data: series.map(
      (item, index) =>
        createRadarDataItem({
          item,
          index,
          colors,
        }),
    ),

    symbol: 'circle',

    symbolSize:
      RADAR_CHART_CONFIG.pointSize,

    itemStyle: {
      borderWidth: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },

    emphasis: {
      focus: 'none',

      itemStyle: {
        borderWidth:
          RADAR_CHART_CONFIG.haloRadius,

        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
    },

    blur: {
      lineStyle: {
        opacity: 1,
      },

      itemStyle: {
        opacity: 1,
      },

      areaStyle: {
        opacity:
          RADAR_CHART_CONFIG.areaOpacity,
      },
    },

    select: {
      disabled: true,
    },
  };

  return {
    animation: true,

    animationDuration:
      RADAR_CHART_CONFIG.animationDuration,

    animationDurationUpdate:
      RADAR_CHART_CONFIG.animationDuration,

    animationEasing: 'cubicOut',

    animationEasingUpdate: 'cubicOut',

    color: [...colors.series],

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

      bottom:
        RADAR_CHART_CONFIG.legend.bottom,

      left: 'center',

      itemWidth:
        RADAR_CHART_CONFIG.legend.itemWidth,

      itemHeight:
        RADAR_CHART_CONFIG.legend.itemHeight,

      itemGap:
        RADAR_CHART_CONFIG.legend.itemGap,

      icon: 'circle',

      textStyle: {
        color: colors.axisText,

        fontWeight: boldLegends
          ? 'bold'
          : 'normal',
      },
    },

    radar,

    series: [radarSeries],
  };
};