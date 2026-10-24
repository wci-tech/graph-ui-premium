import type { EChartsOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import { isRecord } from '@/common/utils/Common.utils';

import type {
  BarChartColors,
  BarChartData,
  BarChartOptions,
  BarChartResolvedColors,
  BarChartSeries,
} from '../BarChart.types';



export interface BarChartResolvedSeries extends BarChartSeries {
  readonly color: string;
}

export interface BarChartDefinition {
  readonly type: 'bar';
  readonly labels: string[];
  readonly series: BarChartResolvedSeries[];
  readonly horizontal: boolean;
  readonly barWidth: number;
  readonly barChartColors: BarChartResolvedColors;
}

type TooltipTrigger = 'item' | 'axis' | 'none';
type AxisPointerType = 'line' | 'shadow' | 'none' | 'cross';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

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
      `[BarChart] Missing required CSS variable "${variableName}".`,
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
    `[BarChart] Unable to resolve CSS color variable "${variableName}".`,
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

export const resolveBarChartColors = (
  element: HTMLElement,
  colors?: BarChartColors,
): BarChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series?.length
      ? colors.series.map((color) =>
        resolveColor(styles, color),
      )
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
  };
};

const getSeriesColor = (
  item: BarChartSeries,
  index: number,
  colors: BarChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error(
      '[BarChart] At least one series color is required.',
    );
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly BarChartSeries[],
  colors: BarChartResolvedColors,
): BarChartResolvedSeries[] => {
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

export const createBarChartDefinition = ({
  element,
  data,
  colors,
  horizontal,
  barWidth,
}: {
  readonly element: HTMLElement;
  readonly data: BarChartData;
  readonly colors: BarChartResolvedColors;
  readonly horizontal: boolean;
  readonly barWidth: number;
}): BarChartDefinition => ({
  type: 'bar',
  labels: [...data.labels],
  series: resolveSeries(
    element,
    data.series,
    colors,
  ),
  horizontal,
  barWidth,
  barChartColors: colors,
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

export const mergeBarChartOptions = (
  generatedOptions: EChartsOption,
  options?: BarChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    horizontal: _horizontal,
    barWidth: _barWidth,
    crosshair = false,
    showLegend,
    boldLabels: _boldLabels,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    grid,
    ...rest
  } = options;

  const generatedTooltip = asTooltip(
    generatedOptions.tooltip,
  );

  const customTooltip = asTooltip(tooltip);

  const generatedPointer = asAxisPointer(
    generatedTooltip.axisPointer,
  );

  const customPointer = asAxisPointer(
    customTooltip.axisPointer,
  );

  const generatedLegend = asRecord(
    generatedOptions.legend,
  );

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
            'item',
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
              'line',
            ),
          ),

        snap: true,

        shadowStyle: {
          ...asRecord(
            generatedPointer.shadowStyle,
          ),

          ...asRecord(
            customPointer.shadowStyle,
          ),

          color: 'transparent',
          opacity: 0,
        },
      },
    },
  };
};