import type { EChartsOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import { isRecord } from '@/common/utils/Common.utils';

import type {
  BarLineChartAppearance,
  BarLineChartColors,
  BarLineChartData,
  BarLineChartOptions,
  BarLineChartResolvedColors,
  BarLineChartSeries,
} from '../BarLineChart.types';



export interface BarLineChartResolvedSeries extends BarLineChartSeries {
  readonly color: string;
}

export interface BarLineChartDefinition {
  readonly type: 'bar-line';
  readonly labels: string[];
  readonly series: BarLineChartResolvedSeries[];
  readonly appearance: BarLineChartAppearance;
  readonly showTrendPoints: boolean;
  readonly barWidth: number;
  readonly touchBarTop: boolean;
  readonly barLineChartColors: BarLineChartResolvedColors;
}

type TooltipTrigger = 'item' | 'axis' | 'none';
type AxisPointerType = 'line' | 'shadow' | 'none' | 'cross';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const TREND_COLOR_VARIABLES = {
  up: '--wci-chart-green',
  down: '--wci-chart-red',
} as const;

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
    throw new Error(
      `[BarLineChart] Missing required CSS variable "${variableName}".`,
    );
  }

  return value;
};

const resolveColor = (
  styles: CSSStyleDeclaration,
  color: string,
): string => {
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

  throw new Error(
    `[BarLineChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(
      styles,
      resolveCssVariable(styles, variableName),
    ),
  );

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  color: string | undefined,
  variableName: string,
): string =>
  color
    ? resolveColor(styles, color)
    : resolveColor(
      styles,
      resolveCssVariable(styles, variableName),
    );

export const resolveBarLineChartColors = (
  element: HTMLElement,
  colors?: BarLineChartColors,
): BarLineChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series?.length
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: resolveTokenColor(
      styles,
      colors?.axisText,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    axisLine: resolveTokenColor(
      styles,
      colors?.axisLine,
      CHART_TOKEN_VARIABLES.axisLine,
    ),
    grid: resolveTokenColor(
      styles,
      colors?.grid,
      CHART_TOKEN_VARIABLES.grid,
    ),
    tooltipBackground: resolveTokenColor(
      styles,
      colors?.tooltipBackground,
      CHART_TOKEN_VARIABLES.tooltipBackground,
    ),
    tooltipText: resolveTokenColor(
      styles,
      colors?.tooltipText,
      CHART_TOKEN_VARIABLES.tooltipText,
    ),
    tooltipBorder: resolveTokenColor(
      styles,
      colors?.tooltipBorder,
      CHART_TOKEN_VARIABLES.tooltipBorder,
    ),
    trendUp: resolveTokenColor(
      styles,
      colors?.trendUp,
      TREND_COLOR_VARIABLES.up,
    ),
    trendDown: resolveTokenColor(
      styles,
      colors?.trendDown,
      TREND_COLOR_VARIABLES.down,
    ),
    trendNeutral: resolveTokenColor(
      styles,
      colors?.trendNeutral,
      CHART_TOKEN_VARIABLES.axisText,
    ),
  };
};

const getSeriesColor = (
  item: BarLineChartSeries,
  index: number,
  colors: BarLineChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error(
      '[BarLineChart] At least one series color is required.',
    );
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly BarLineChartSeries[],
  colors: BarLineChartResolvedColors,
): BarLineChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item, index) => ({
    ...item,
    color: getSeriesColor(
      item,
      index,
      colors,
      styles,
    ),
  }));
};

export const createBarLineChartDefinition = ({
  element,
  data,
  colors,
  appearance,
  showTrendPoints,
  barWidth,
  touchBarTop,
}: {
  readonly element: HTMLElement;
  readonly data: BarLineChartData;
  readonly colors: BarLineChartResolvedColors;
  readonly appearance: BarLineChartAppearance;
  readonly showTrendPoints: boolean;
  readonly barWidth: number;
  readonly touchBarTop: boolean;
}): BarLineChartDefinition => ({
  type: 'bar-line',
  labels: [...data.labels],
  series: resolveSeries(
    element,
    data.series,
    colors,
  ),
  appearance,
  showTrendPoints,
  barWidth,
  touchBarTop,
  barLineChartColors: colors,
});

const resolveTooltipTrigger = (
  value: unknown,
  fallback: TooltipTrigger,
): TooltipTrigger =>
  value === 'item' ||
    value === 'axis' ||
    value === 'none'
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

export const mergeBarLineChartOptions = (
  generatedOptions: EChartsOption,
  options?: BarLineChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    barWidth: _barWidth,
    touchBarTop: _touchBarTop,
    crosshair = false,
    showLegend,
    boldLabels: _boldLabels,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    grid,
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
      ...(showLegend !== undefined
        ? {
          show: showLegend,
        }
        : {}),
      ...asRecord(legend),
    },
    tooltip: {
      ...generatedTooltip,
      ...customTooltip,
      trigger: crosshair
        ? 'axis'
        : resolveTooltipTrigger(
          customTooltip.trigger,
          resolveTooltipTrigger(
            generatedTooltip.trigger,
            'axis',
          ),
        ),
      axisPointer: {
        ...generatedPointer,
        ...customPointer,
        show: crosshair,
        type: crosshair
          ? 'cross'
          : resolveAxisPointerType(
            customPointer.type,
            resolveAxisPointerType(
              generatedPointer.type,
              'none',
            ),
          ),
        snap: true,
      },
    },
  };
};