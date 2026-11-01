import type {
  AxisPointerComponentOption,
  BarSeriesOption,
  EChartsOption,
  TooltipComponentOption,
} from 'echarts';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  StackedBarChartColors,
  StackedBarChartData,
  StackedBarChartOptions,
  StackedBarChartResolvedColors,
  StackedBarChartSeries,
} from '../StackedBarChart.types';

import { STACKED_BAR_CHART_CONFIG } from './BaseStackedBarChart.constants';

type TooltipTrigger = 'item' | 'axis' | 'none';
type AxisPointerType = 'line' | 'shadow' | 'none' | 'cross';

export interface StackedBarChartResolvedSeries extends StackedBarChartSeries {
  readonly color: string;
}

export interface StackedBarChartDefinition {
  readonly type: 'stacked-bar';
  readonly labels: string[];
  readonly series: StackedBarChartResolvedSeries[];
  readonly horizontal: boolean;
  readonly stackId: string;
  readonly showLegend: boolean;
  readonly boldLabels: boolean;
  readonly boldLegends: boolean;
  readonly maxBarWidth: number;
  readonly barWidth?: number;
  readonly stackedBarChartColors: StackedBarChartResolvedColors;
}

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> =>
  isRecord(value) ? value : {};

const asTooltip = (value: unknown): TooltipComponentOption =>
  isRecord(value) ? (value as TooltipComponentOption) : {};

const asAxisPointer = (value: unknown): AxisPointerComponentOption =>
  isRecord(value) ? (value as AxisPointerComponentOption) : {};

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[StackedBarChart] Missing required CSS variable "${variableName}".`);
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

  if (resolvedColor) return resolveColor(styles, resolvedColor);

  const fallback = match[2]?.trim();

  if (fallback) return resolveColor(styles, fallback);

  throw new Error(
    `[StackedBarChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveStackedBarChartColors = (
  element: HTMLElement,
  colors?: StackedBarChartColors,
): StackedBarChartResolvedColors => {
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
  item: StackedBarChartSeries,
  index: number,
  colors: StackedBarChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) return resolveColor(styles, item.color);

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[StackedBarChart] At least one series color is required.');
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: StackedBarChartSeries[],
  colors: StackedBarChartResolvedColors,
): StackedBarChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item, index) => ({
    ...item,
    color: getSeriesColor(item, index, colors, styles),
  }));
};

export const createStackedBarChartDefinition = ({
  element,
  data,
  colors,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: StackedBarChartData;
  readonly colors: StackedBarChartResolvedColors;
  readonly options?: StackedBarChartOptions;
}): StackedBarChartDefinition => ({
  type: 'stacked-bar',
  labels: [...data.labels],
  series: resolveSeries(element, data.series, colors),
  horizontal: options?.horizontal ?? false,
  stackId: options?.stackId ?? STACKED_BAR_CHART_CONFIG.stackId,
  showLegend: options?.showLegend ?? true,
  boldLabels: options?.boldLabels ?? false,
  boldLegends: options?.boldLegends ?? false,
  maxBarWidth: options?.maxBarWidth ?? STACKED_BAR_CHART_CONFIG.maxBarWidth,
  ...(options?.barWidth !== undefined ? { barWidth: options.barWidth } : {}),
  stackedBarChartColors: colors,
});

const getSeriesArray = (value: unknown): BarSeriesOption[] => {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is BarSeriesOption => isRecord(item));
};

const mergeSeriesItem = (
  generatedItem: BarSeriesOption,
  customItem: BarSeriesOption,
): BarSeriesOption => {
  const data = customItem.data ?? generatedItem.data;

  return {
    ...generatedItem,
    ...customItem,
    itemStyle: {
      ...asRecord(generatedItem.itemStyle),
      ...asRecord(customItem.itemStyle),
    },
    emphasis: {
      ...asRecord(generatedItem.emphasis),
      ...asRecord(customItem.emphasis),
    },
    label: {
      ...asRecord(generatedItem.label),
      ...asRecord(customItem.label),
    },
    ...(data !== undefined ? { data } : {}),
  };
};

const mergeSeries = (
  generatedValue: unknown,
  customValue: unknown,
): BarSeriesOption[] => {
  const generatedSeries = getSeriesArray(generatedValue);
  const customSeries = getSeriesArray(customValue);

  if (customSeries.length === 0) return generatedSeries;

  return generatedSeries.map((generatedItem, index) => {
    const customItem = customSeries[index];

    return customItem
      ? mergeSeriesItem(generatedItem, customItem)
      : generatedItem;
  });
};

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
  value === 'line' ||
    value === 'shadow' ||
    value === 'none' ||
    value === 'cross'
    ? value
    : fallback;

export const mergeStackedBarChartOptions = (
  generatedOptions: EChartsOption,
  options?: StackedBarChartOptions,
): EChartsOption => {
  if (!options) return generatedOptions;

  const {
    horizontal: _horizontal,
    stackId: _stackId,
    showLegend,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    barWidth: _barWidth,
    maxBarWidth: _maxBarWidth,
    crosshair = false,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    grid,
    series,
    ...rest
  } = options;

  const generatedTooltip = asTooltip(generatedOptions.tooltip);
  const customTooltip = asTooltip(tooltip);
  const generatedPointer = asAxisPointer(generatedTooltip.axisPointer);
  const customPointer = asAxisPointer(customTooltip.axisPointer);
  const generatedLegend = asRecord(generatedOptions.legend);

  return {
    ...generatedOptions,
    ...rest,
    grid: {
      ...asRecord(generatedOptions.grid),
      ...asRecord(grid),
    },
    legend: {
      ...generatedLegend,
      ...(showLegend !== undefined ? { show: showLegend } : {}),
      ...asRecord(legend),
    },
    tooltip: {
      ...generatedTooltip,
      ...customTooltip,
      trigger: crosshair
        ? 'axis'
        : resolveTooltipTrigger(
          customTooltip.trigger,
          resolveTooltipTrigger(generatedTooltip.trigger, 'axis'),
        ),
      axisPointer: {
        ...generatedPointer,
        ...customPointer,
        show: crosshair,
        type: crosshair
          ? 'cross'
          : resolveAxisPointerType(
            customPointer.type,
            resolveAxisPointerType(generatedPointer.type, 'line'),
          ),
        snap: true,
      },
    },
    series: mergeSeries(generatedOptions.series, series),
  };
};