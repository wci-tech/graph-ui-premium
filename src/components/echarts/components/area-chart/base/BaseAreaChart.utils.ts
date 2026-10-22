import type { EChartsOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import type {
  AreaChartAppearance,
  AreaChartColors,
  AreaChartData,
  AreaChartOptions,
  AreaChartSeries,
} from '../AreaChart.types';

import { AREA_CHART_COLOR_VARIABLES, AREA_CHART_TOKEN_VARIABLES } from './BaseAreaChart.constants';

export interface AreaChartResolvedColors {
  readonly series: readonly string[];

  readonly axisText: string;

  readonly axisLine: string;

  readonly grid: string;

  readonly tooltipBackground: string;

  readonly tooltipText: string;

  readonly tooltipBorder: string;
}

export interface AreaChartResolvedSeries extends AreaChartSeries {
  readonly color: string;

  readonly pointColor: string;
}

/**
 * Internal normalized AreaChart definition.
 *
 * This intentionally does not extend EChartsDefinition.
 * AreaChart has its own strongly typed resolved data structure.
 */
export interface AreaChartDefinition {
  readonly type: 'area';

  readonly labels: string[];

  readonly series: AreaChartResolvedSeries[];

  readonly appearance: AreaChartAppearance;

  readonly areaChartColors: AreaChartResolvedColors;
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
    throw new Error(`[AreaChart] Missing required CSS variable "${variableName}".`);
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

  throw new Error(`[AreaChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  AREA_CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveAreaChartColors = (
  element: HTMLElement,
  colors?: AreaChartColors,
): AreaChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,

    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveCssVariable(styles, AREA_CHART_TOKEN_VARIABLES.axisText),

    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveCssVariable(styles, AREA_CHART_TOKEN_VARIABLES.axisLine),

    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveCssVariable(styles, AREA_CHART_TOKEN_VARIABLES.grid),

    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveCssVariable(styles, AREA_CHART_TOKEN_VARIABLES.tooltipBackground),

    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveCssVariable(styles, AREA_CHART_TOKEN_VARIABLES.tooltipText),

    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveCssVariable(styles, AREA_CHART_TOKEN_VARIABLES.tooltipBorder),
  };
};

const getSeriesColor = (
  item: AreaChartSeries,
  index: number,
  colors: AreaChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[AreaChart] At least one series color is required.');
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly AreaChartSeries[],
  colors: AreaChartResolvedColors,
): AreaChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item, index) => {
    const color = getSeriesColor(item, index, colors, styles);

    const pointColor = item.pointColor ? resolveColor(styles, item.pointColor) : color;

    return {
      ...item,

      color,

      pointColor,
    };
  });
};

export const createAreaChartDefinition = ({
  element,
  data,
  colors,
  appearance,
}: {
  readonly element: HTMLElement;

  readonly data: AreaChartData;

  readonly colors: AreaChartResolvedColors;

  readonly appearance: AreaChartAppearance;
}): AreaChartDefinition => ({
  type: 'area',

  labels: [...data.labels],

  series: resolveSeries(element, data.series, colors),

  appearance,

  areaChartColors: colors,
});

const resolveTooltipTrigger = (value: unknown, fallback: TooltipTrigger): TooltipTrigger =>
  value === 'item' || value === 'axis' || value === 'none' ? value : fallback;

const resolveAxisPointerType = (value: unknown, fallback: AxisPointerType): AxisPointerType =>
  value === 'line' || value === 'shadow' || value === 'none' || value === 'cross'
    ? value
    : fallback;

export const mergeAreaChartOptions = (
  generatedOptions: EChartsOption,
  options?: AreaChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
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
            resolveTooltipTrigger(generatedTooltip.trigger, 'item'),
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
  };
};
