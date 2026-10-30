import type { EChartsOption } from 'echarts';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import type {
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import type {
  RadarChartColors,
  RadarChartData,
  RadarChartOptions,
  RadarChartResolvedColors,
  RadarChartSeries,
} from '../RadarChart.types';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

type TooltipTrigger = 'item' | 'axis' | 'none';
type AxisPointerType = 'line' | 'shadow' | 'none' | 'cross';

export type RadarChartResolvedSeries = EChartsSeriesDefinition & {
  readonly label: string;
  readonly data: number[];
  readonly color: string;
};

export type RadarChartDefinition = EChartsDefinition & {
  readonly type: 'radar';
  readonly labels: string[];
  readonly series: RadarChartResolvedSeries[];
  readonly radarChartColors: RadarChartResolvedColors;
  readonly boldLabels: boolean;
  readonly boldLegends: boolean;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> =>
  isRecord(value) ? value : {};

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[RadarChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

const resolveColor = (
  styles: CSSStyleDeclaration,
  color: string,
): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(CSS_VARIABLE_PATTERN);

  if (!match) return normalizedColor;

  const variableName = match[1];

  if (!variableName) return normalizedColor;

  const resolvedColor = styles.getPropertyValue(variableName).trim();

  if (resolvedColor) {
    return resolveColor(styles, resolvedColor);
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(styles, fallback);
  }

  throw new Error(`[RadarChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveRadarChartColors = (
  element: HTMLElement,
  colors?: RadarChartColors,
): RadarChartResolvedColors => {
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
  item: RadarChartSeries,
  index: number,
  colors: RadarChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[RadarChart] At least one series color is required.');
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly RadarChartSeries[],
  colors: RadarChartResolvedColors,
): RadarChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item, index) => ({
    label: item.label,
    data: [...item.data],
    color: getSeriesColor(item, index, colors, styles),
  }));
};

export const createRadarChartDefinition = ({
  element,
  data,
  colors,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: RadarChartData;
  readonly colors: RadarChartResolvedColors;
  readonly options?: RadarChartOptions;
}): RadarChartDefinition => ({
  type: 'radar',
  labels: [...data.labels],
  series: resolveSeries(element, data.series, colors),
  radarChartColors: colors,
  boldLabels: options?.boldLabels ?? false,
  boldLegends: options?.boldLegends ?? false,
});

const resolveTooltipTrigger = (
  value: unknown,
  fallback: TooltipTrigger,
): TooltipTrigger =>
  value === 'item' || value === 'axis' || value === 'none'
    ? value
    : fallback;

const resolveAxisPointerType = (
  value: unknown,
  fallback: AxisPointerType,
): AxisPointerType =>
  value === 'line' || value === 'shadow' || value === 'none' || value === 'cross'
    ? value
    : fallback;

export const mergeRadarChartOptions = (
  generatedOptions: EChartsOption,
  options?: RadarChartOptions,
): EChartsOption => {
  if (!options) return generatedOptions;

  const {
    crosshair = false,
    showLegend,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    radar,
    ...rest
  } = options;

  const generatedTooltip = asRecord(generatedOptions.tooltip);
  const customTooltip = asRecord(tooltip);
  const generatedPointer = asRecord(generatedTooltip['axisPointer']);
  const customPointer = asRecord(customTooltip['axisPointer']);

  const mergedTooltip = {
    ...generatedTooltip,
    ...customTooltip,
    trigger: crosshair
      ? 'item'
      : resolveTooltipTrigger(
        customTooltip['trigger'],
        resolveTooltipTrigger(generatedTooltip['trigger'], 'item'),
      ),
    axisPointer: {
      ...generatedPointer,
      ...customPointer,
      show: crosshair,
      type: crosshair
        ? 'cross'
        : resolveAxisPointerType(
          customPointer['type'],
          resolveAxisPointerType(generatedPointer['type'], 'line'),
        ),
      snap: true,
    },
  };

  const mergedLegend = {
    ...asRecord(generatedOptions.legend),
    ...(showLegend !== undefined ? { show: showLegend } : {}),
    ...asRecord(legend),
  };

  const mergedRadar = {
    ...asRecord(generatedOptions.radar),
    ...asRecord(radar),
  };

  return {
    ...generatedOptions,
    ...rest,
    radar: mergedRadar,
    legend: mergedLegend,
    tooltip: mergedTooltip,
  } as EChartsOption;
};