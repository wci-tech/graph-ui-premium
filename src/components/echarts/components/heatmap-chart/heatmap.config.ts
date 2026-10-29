import type {
  CustomSeriesOption,
  EChartsOption,
  HeatmapSeriesOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';

import { getEChartsAlphaColor } from '@/components/echarts/utils/EChartsPointHalo.utils';
import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import { HEATMAP_CHART_CONFIG } from './base/BaseHeatmapChart.constants';
import type {
  HeatmapChartDefinition,
  HeatmapChartResolvedSeries,
} from './base/BaseHeatmapChart.utils';
import type { HeatmapChartResolvedColors } from './HeatmapChart.types';

type MutableHeatmapPoint = [number, number, number];

const getDefinition = (definition: EChartsDefinition): HeatmapChartDefinition =>
  definition as unknown as HeatmapChartDefinition;

const getSeries = (definition: HeatmapChartDefinition): HeatmapChartResolvedSeries | undefined =>
  definition.series[0];

const getData = (definition: HeatmapChartDefinition): MutableHeatmapPoint[] => {
  const data = getSeries(definition)?.data ?? [];
  return data.map(([x, y, value]) => [x, y, value]);
};

const getSeriesName = (definition: HeatmapChartDefinition): string => {
  const series = getSeries(definition);
  return series?.label ?? series?.name ?? 'Density';
};

const getValueRange = (data: readonly MutableHeatmapPoint[]) => {
  const values = data.map((item) => item[2]);

  return {
    min: values.length
      ? Math.min(...values, HEATMAP_CHART_CONFIG.minValue)
      : HEATMAP_CHART_CONFIG.minValue,
    max: values.length
      ? Math.max(...values, HEATMAP_CHART_CONFIG.maxValue)
      : HEATMAP_CHART_CONFIG.maxValue,
  };
};

const getCellSizeRatio = (value: number, minSizeRatio: number): number => {
  const safeMinRatio = Math.min(
    Math.max(minSizeRatio, HEATMAP_CHART_CONFIG.minCellSizeRatio),
    1,
  );
  const safeValue =
    Math.min(
      Math.max(value, HEATMAP_CHART_CONFIG.minValue),
      HEATMAP_CHART_CONFIG.maxValue,
    ) / HEATMAP_CHART_CONFIG.maxValue;

  return safeMinRatio + safeValue * (1 - safeMinRatio);
};

const getTooltipParams = (params: unknown): Record<string, unknown> | undefined => {
  if (Array.isArray(params)) {
    const firstItem = params[0];
    return typeof firstItem === 'object' && firstItem !== null
      ? (firstItem as Record<string, unknown>)
      : undefined;
  }

  return typeof params === 'object' && params !== null
    ? (params as Record<string, unknown>)
    : undefined;
};

const formatTooltip = ({
  params,
  xLabels,
  yLabels,
  seriesName,
}: {
  readonly params: unknown;
  readonly xLabels: readonly string[];
  readonly yLabels: readonly string[];
  readonly seriesName: string;
}): string => {
  const resolvedParams = getTooltipParams(params);
  const value = resolvedParams?.['value'];

  if (!Array.isArray(value)) return '';

  const xIndex = Number(value[0]);
  const yIndex = Number(value[1]);
  const heatValue = Number(value[2]);

  return `${seriesName}<br />${xLabels[xIndex] ?? xIndex} × ${yLabels[yIndex] ?? yIndex
    }: <b>${heatValue}</b>`;
};

const createAxis = ({
  labels,
  colors,
  crosshair,
}: {
  readonly labels: readonly string[];
  readonly colors: HeatmapChartResolvedColors;
  readonly crosshair: boolean;
}): XAXisComponentOption | YAXisComponentOption => ({
  type: 'category',
  data: [...labels],
  boundaryGap: true,
  splitArea: {
    show: true,
    areaStyle: {
      color: [
        getEChartsAlphaColor(colors.grid, 0.02),
        getEChartsAlphaColor(colors.grid, 0.05),
      ],
    },
  },
  axisLine: {
    lineStyle: {
      color: colors.axisLine,
    },
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    color: colors.axisText,
  },
  axisPointer: {
    show: crosshair,
    type: 'line',
    snap: true,
    lineStyle: {
      color: colors.axisLine,
      width: HEATMAP_CHART_CONFIG.crosshairWidth,
      type: 'dashed',
    },
    label: {
      show: false,
    },
  },
});

const createEqualSeries = ({
  definition,
  data,
  seriesName,
}: {
  readonly definition: HeatmapChartDefinition;
  readonly data: MutableHeatmapPoint[];
  readonly seriesName: string;
}): HeatmapSeriesOption => ({
  name: seriesName,
  type: 'heatmap',
  data,
  label: {
    show: definition.showLabels,
    color: definition.heatmapChartColors.tooltipText,
    fontWeight: definition.boldLabels ? 'bold' : 'normal',
  },
  itemStyle: {
    borderWidth: definition.cellGap,
    borderColor: definition.heatmapChartColors.grid,
    borderRadius: definition.cellBorderRadius,
  },
  emphasis: {
    itemStyle: {
      borderWidth: definition.cellGap,
      borderColor: definition.heatmapChartColors.grid,
      borderRadius: definition.cellBorderRadius,
      shadowBlur: HEATMAP_CHART_CONFIG.emphasisShadowBlur,
      shadowColor: getEChartsAlphaColor(
        definition.heatmapChartColors.axisText,
        HEATMAP_CHART_CONFIG.emphasisShadowOpacity,
      ),
    },
  },
});

const createVariableSizeSeries = ({
  definition,
  data,
  seriesName,
}: {
  readonly definition: HeatmapChartDefinition;
  readonly data: MutableHeatmapPoint[];
  readonly seriesName: string;
}): CustomSeriesOption => ({
  name: seriesName,
  type: 'custom',
  coordinateSystem: 'cartesian2d',
  data,
  encode: {
    x: 0,
    y: 1,
    tooltip: 2,
  },
  renderItem: (_params, api) => {
    const xValue = Number(api.value(0));
    const yValue = Number(api.value(1));
    const value = Number(api.value(2));
    const point = api.coord([xValue, yValue]);
    const size = api.size?.([1, 1]) ?? [24, 24];
    const ratio = getCellSizeRatio(value, definition.cellMinSizeRatio);
    const cellWidth = Array.isArray(size) ? Number(size[0] ?? 24) : Number(size);
    const cellHeight = Array.isArray(size) ? Number(size[1] ?? 24) : Number(size);
    const availableWidth = Math.max(cellWidth - definition.cellGap, 2);
    const availableHeight = Math.max(cellHeight - definition.cellGap, 2);
    const width = Math.max(availableWidth * ratio, 2);
    const height = Math.max(availableHeight * ratio, 2);

    return {
      type: 'rect',
      shape: {
        x: point[0] - width / 2,
        y: point[1] - height / 2,
        width,
        height,
        r: definition.cellBorderRadius,
      },
      style: {
        ...api.style(),
        stroke: definition.heatmapChartColors.grid,
        lineWidth: 0,
      },
    };
  },
});

export const getHeatmapConfig = (genericDefinition: EChartsDefinition): EChartsOption => {
  const definition = getDefinition(genericDefinition);
  const { heatmapChartColors: colors } = definition;

  if (colors.series.length === 0) return {};

  const data = getData(definition);
  const seriesName = getSeriesName(definition);
  const { min, max } = getValueRange(data);

  const xAxis = createAxis({
    labels: definition.xLabels,
    colors,
    crosshair: definition.crosshair,
  }) as XAXisComponentOption;

  const yAxis = createAxis({
    labels: definition.yLabels,
    colors,
    crosshair: definition.crosshair,
  }) as YAXisComponentOption;

  const equalSeries = createEqualSeries({
    definition,
    data,
    seriesName,
  });

  const variableSizeSeries = createVariableSizeSeries({
    definition,
    data,
    seriesName,
  });

  return {
    grid: {
      left: HEATMAP_CHART_CONFIG.grid.left,
      right: HEATMAP_CHART_CONFIG.grid.right,
      top: HEATMAP_CHART_CONFIG.grid.top,
      bottom: HEATMAP_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    tooltip: {
      trigger: definition.crosshair ? 'axis' : 'item',
      position: 'top',
      confine: true,
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      borderWidth: 1,
      textStyle: {
        color: colors.tooltipText,
      },
      axisPointer: {
        type: 'cross',
        snap: true,
        lineStyle: {
          color: colors.axisLine,
          width: HEATMAP_CHART_CONFIG.crosshairWidth,
          type: 'dashed',
        },
        crossStyle: {
          color: colors.axisLine,
          width: HEATMAP_CHART_CONFIG.crosshairWidth,
          type: 'dashed',
        },
        label: {
          show: false,
        },
      },
      formatter: (params: unknown) =>
        formatTooltip({
          params,
          xLabels: definition.xLabels,
          yLabels: definition.yLabels,
          seriesName,
        }),
    },
    xAxis,
    yAxis,
    visualMap: {
      min,
      max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: HEATMAP_CHART_CONFIG.visualMap.bottom,
      dimension: 2,
      inRange: {
        color: [...colors.series],
      },
      textStyle: {
        color: colors.axisText,
      },
    },
    series: [definition.cellSizeMode === 'value' ? variableSizeSeries : equalSeries],
  };
};