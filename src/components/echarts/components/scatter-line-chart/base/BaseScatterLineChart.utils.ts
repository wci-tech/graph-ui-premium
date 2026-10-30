import type { EChartsOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  ScatterLineChartAppearance,
  ScatterLineChartColors,
  ScatterLineChartData,
  ScatterLineChartOptions,
  ScatterLineChartSeries,
} from '../ScatterLineChart.types';

export interface ScatterLineChartResolvedColors {
  readonly series: readonly string[];
  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;
  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

export interface ScatterLineChartResolvedSeries extends ScatterLineChartSeries {
  readonly color: string;
  readonly pointColor: string;
}

export interface ScatterLineChartDefinition {
  readonly type: 'scatter-line';
  readonly series: ScatterLineChartResolvedSeries[];
  readonly appearance: ScatterLineChartAppearance;
  readonly scatterLineChartColors: ScatterLineChartResolvedColors;
}

type TooltipTrigger = 'item' | 'axis' | 'none';

type AxisPointerType = 'line' | 'shadow' | 'none' | 'cross';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const asTooltip = (value: unknown): TooltipComponentOption =>
  isRecord(value) ? (value as TooltipComponentOption) : {};

const asAxisPointer = (value: unknown): AxisPointerOption =>
  isRecord(value) ? (value as AxisPointerOption) : {};

const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[ScatterLineChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

const resolveColor = (styles: CSSStyleDeclaration, color: string): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(CSS_VARIABLE_PATTERN);

  if (!match) {
    return normalizedColor;
  }

  const variableName = match[1];

  if (!variableName) {
    return normalizedColor;
  }

  const resolvedColor = styles.getPropertyValue(variableName).trim();

  if (resolvedColor) {
    return resolveColor(styles, resolvedColor);
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(styles, fallback);
  }

  throw new Error(`[ScatterLineChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveScatterLineChartColors = (
  element: HTMLElement,
  colors?: ScatterLineChartColors,
): ScatterLineChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.grid),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBackground),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder),
  };
};

const getSeriesColor = (
  item: ScatterLineChartSeries,
  index: number,
  colors: ScatterLineChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[ScatterLineChart] At least one series color is required.');
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly ScatterLineChartSeries[],
  colors: ScatterLineChartResolvedColors,
): ScatterLineChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item, index) => {
    const color = getSeriesColor(item, index, colors, styles);
    const pointColor = item.pointColor ? resolveColor(styles, item.pointColor) : color;

    return {
      ...item,
      data: [...item.data].sort((first, second) => first[0] - second[0]),
      color,
      pointColor,
    };
  });
};

export const createScatterLineChartDefinition = ({
  element,
  data,
  colors,
  appearance,
}: {
  readonly element: HTMLElement;
  readonly data: ScatterLineChartData;
  readonly colors: ScatterLineChartResolvedColors;
  readonly appearance: ScatterLineChartAppearance;
}): ScatterLineChartDefinition => ({
  type: 'scatter-line',
  series: resolveSeries(element, data.series, colors),
  appearance,
  scatterLineChartColors: colors,
});

const resolveTooltipTrigger = (value: unknown, fallback: TooltipTrigger): TooltipTrigger =>
  value === 'item' || value === 'axis' || value === 'none' ? value : fallback;

const resolveAxisPointerType = (value: unknown, fallback: AxisPointerType): AxisPointerType =>
  value === 'line' || value === 'shadow' || value === 'none' || value === 'cross'
    ? value
    : fallback;

export const mergeScatterLineChartOptions = (
  generatedOptions: EChartsOption,
  options?: ScatterLineChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    crosshair,
    showLegend,
    boldLabels,
    boldLegends,
    isBoxVisible,
    ...consumerOptions
  } = options;

  const generatedTooltip = asTooltip(generatedOptions.tooltip);
  const consumerTooltip = asTooltip(consumerOptions.tooltip);
  const generatedAxisPointer = asAxisPointer(generatedTooltip.axisPointer);
  const consumerAxisPointer = asAxisPointer(consumerTooltip.axisPointer);

  const tooltipTrigger = crosshair
    ? 'axis'
    : resolveTooltipTrigger(consumerTooltip.trigger, 'item');

  const axisPointerType = crosshair
    ? 'cross'
    : resolveAxisPointerType(consumerAxisPointer.type, 'none');

  const generatedLegend = asRecord(generatedOptions.legend);
  const consumerLegend = asRecord(consumerOptions.legend);
  const generatedLegendTextStyle = asRecord(generatedLegend['textStyle']);
  const consumerLegendTextStyle = asRecord(consumerLegend['textStyle']);

  const generatedXAxis = asRecord(generatedOptions.xAxis);
  const consumerXAxis = asRecord(consumerOptions.xAxis);
  const generatedXAxisLabel = asRecord(generatedXAxis['axisLabel']);
  const consumerXAxisLabel = asRecord(consumerXAxis['axisLabel']);

  const generatedYAxis = asRecord(generatedOptions.yAxis);
  const consumerYAxis = asRecord(consumerOptions.yAxis);
  const generatedYAxisLabel = asRecord(generatedYAxis['axisLabel']);
  const consumerYAxisLabel = asRecord(consumerYAxis['axisLabel']);

  return {
    ...generatedOptions,
    ...consumerOptions,
    tooltip: {
      ...generatedTooltip,
      ...consumerTooltip,
      trigger: tooltipTrigger,
      axisPointer: {
        ...generatedAxisPointer,
        ...consumerAxisPointer,
        show: crosshair === true,
        type: axisPointerType,
      },
    },
    legend: {
      ...generatedLegend,
      ...consumerLegend,
      ...(showLegend !== undefined ? { show: showLegend } : {}),
      textStyle: {
        ...generatedLegendTextStyle,
        ...consumerLegendTextStyle,
        ...(boldLegends ? { fontWeight: 'bold' } : {}),
      },
    },
    xAxis: {
      ...generatedXAxis,
      ...consumerXAxis,
      axisLabel: {
        ...generatedXAxisLabel,
        ...consumerXAxisLabel,
        ...(boldLabels ? { fontWeight: 'bold' } : {}),
      },
      ...(isBoxVisible === false
        ? {
          axisLine: {
            ...asRecord(generatedXAxis['axisLine']),
            ...asRecord(consumerXAxis['axisLine']),
            show: false,
          },
        }
        : {}),
    },
    yAxis: {
      ...generatedYAxis,
      ...consumerYAxis,
      axisLabel: {
        ...generatedYAxisLabel,
        ...consumerYAxisLabel,
        ...(boldLabels ? { fontWeight: 'bold' } : {}),
      },
      ...(isBoxVisible === false
        ? {
          axisLine: {
            ...asRecord(generatedYAxis['axisLine']),
            ...asRecord(consumerYAxis['axisLine']),
            show: false,
          },
        }
        : {}),
    },
  };
};