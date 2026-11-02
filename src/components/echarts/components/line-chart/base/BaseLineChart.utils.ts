import type { EChartsOption, SeriesOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  LineChartAppearance,
  LineChartColors,
  LineChartData,
  LineChartOptions,
  LineChartResolvedColors,
  LineChartSeries,
} from '../LineChart.types';

export interface LineChartResolvedSeries extends LineChartSeries {
  readonly color: string;
  readonly pointColor: string;
}

export interface LineChartDefinition {
  readonly type: 'line';
  readonly labels: string[];
  readonly series: LineChartResolvedSeries[];
  readonly appearance: LineChartAppearance;
  readonly lineChartColors: LineChartResolvedColors;
  readonly crosshair: boolean;
  readonly showLegend: boolean;
  readonly boldLabels: boolean;
  readonly boldLegends: boolean;
}

type TooltipTrigger = 'item' | 'axis' | 'none';
type AxisPointerType = 'line' | 'shadow' | 'none' | 'cross';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> =>
  isRecord(value) ? value : {};

const asTooltip = (value: unknown): TooltipComponentOption =>
  isRecord(value) ? (value as TooltipComponentOption) : {};

const asAxisPointer = (value: unknown): AxisPointerOption =>
  isRecord(value) ? (value as AxisPointerOption) : {};

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[LineChart] Missing required CSS variable "${variableName}".`);
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

  throw new Error(`[LineChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveLineChartColors = (
  element: HTMLElement,
  colors?: LineChartColors,
): LineChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series?.length
        ? colors.series.map((color) => resolveColor(styles, color))
        : resolveDefaultSeriesColors(styles),
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText),
      ),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
      ),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.grid),
      ),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBackground),
      ),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText),
      ),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder),
      ),
  };
};

const getSeriesColor = (
  item: LineChartSeries,
  index: number,
  colors: LineChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) return resolveColor(styles, item.color);

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[LineChart] At least one series color is required.');
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: LineChartSeries[],
  colors: LineChartResolvedColors,
): LineChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item, index) => {
    const color = getSeriesColor(item, index, colors, styles);

    return {
      ...item,
      color,
      pointColor: item.pointColor
        ? resolveColor(styles, item.pointColor)
        : color,
    };
  });
};

export const createLineChartDefinition = ({
  element,
  data,
  colors,
  appearance,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: LineChartData;
  readonly colors: LineChartResolvedColors;
  readonly appearance: LineChartAppearance;
  readonly options?: LineChartOptions;
}): LineChartDefinition => ({
  type: 'line',
  labels: Array.from(data.labels),
  series: resolveSeries(element, data.series, colors),
  appearance,
  lineChartColors: colors,
  crosshair: options?.crosshair ?? false,
  showLegend: options?.showLegend ?? false,
  boldLabels: options?.boldLabels ?? false,
  boldLegends: options?.boldLegends ?? false,
});

const mergeRecord = (
  baseValue: unknown,
  overrideValue: unknown,
): Record<string, unknown> => ({
  ...asRecord(baseValue),
  ...asRecord(overrideValue),
});

const mergeSeriesItem = (
  baseItem: unknown,
  overrideItem: unknown,
): SeriesOption => {
  const baseRecord = asRecord(baseItem);
  const overrideRecord = asRecord(overrideItem);

  return {
    ...baseRecord,
    ...overrideRecord,
    itemStyle: mergeRecord(
      baseRecord['itemStyle'],
      overrideRecord['itemStyle'],
    ),
    lineStyle: mergeRecord(
      baseRecord['lineStyle'],
      overrideRecord['lineStyle'],
    ),
    label: mergeRecord(
      baseRecord['label'],
      overrideRecord['label'],
    ),
    emphasis: mergeRecord(
      baseRecord['emphasis'],
      overrideRecord['emphasis'],
    ),
  } as SeriesOption;
};

const mergeSeries = (
  generatedSeries: EChartsOption['series'],
  overrideSeries: unknown,
): EChartsOption['series'] => {
  if (!Array.isArray(overrideSeries)) return generatedSeries;

  const baseSeries = Array.isArray(generatedSeries)
    ? generatedSeries
    : [];

  return baseSeries.map((baseItem, index) => {
    const overrideItem = overrideSeries[index];

    return overrideItem === undefined
      ? baseItem
      : mergeSeriesItem(baseItem, overrideItem);
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

export const mergeLineChartOptions = (
  generatedOptions: EChartsOption,
  options?: LineChartOptions,
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
    grid,
    xAxis,
    yAxis,
    axisPointer,
    series,
    ...rest
  } = options;

  const generatedTooltip = asTooltip(generatedOptions.tooltip);
  const customTooltip = asTooltip(tooltip);
  const generatedTooltipPointer = asAxisPointer(
    generatedTooltip.axisPointer,
  );
  const customTooltipPointer = asAxisPointer(
    customTooltip.axisPointer,
  );
  const generatedAxisPointer = asAxisPointer(
    generatedOptions.axisPointer,
  );
  const customAxisPointer = asAxisPointer(axisPointer);

  const mergedOptions: EChartsOption = {
    ...generatedOptions,
    ...rest,
    grid: mergeRecord(generatedOptions.grid, grid),
    xAxis: mergeRecord(generatedOptions.xAxis, xAxis),
    yAxis: mergeRecord(generatedOptions.yAxis, yAxis),
    legend: {
      ...asRecord(generatedOptions.legend),
      ...asRecord(legend),
      ...(showLegend !== undefined
        ? { show: showLegend }
        : {}),
    },
    tooltip: {
      ...generatedTooltip,
      ...customTooltip,
      trigger: resolveTooltipTrigger(
        customTooltip.trigger,
        resolveTooltipTrigger(
          generatedTooltip.trigger,
          'axis',
        ),
      ),
      axisPointer: {
        ...generatedTooltipPointer,
        ...customTooltipPointer,
        type: crosshair
          ? 'cross'
          : resolveAxisPointerType(
            customTooltipPointer.type,
            resolveAxisPointerType(
              generatedTooltipPointer.type,
              'line',
            ),
          ),
      },
    },
    axisPointer: {
      ...generatedAxisPointer,
      ...customAxisPointer,
      show: crosshair,
    },
  };

  const mergedSeries = mergeSeries(
    generatedOptions.series,
    series,
  );

  if (mergedSeries !== undefined) {
    mergedOptions.series = mergedSeries;
  }

  return mergedOptions;
};