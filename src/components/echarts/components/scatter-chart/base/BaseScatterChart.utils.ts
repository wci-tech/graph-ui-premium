import type { EChartsOption } from 'echarts';
import type { AxisPointerOption, TooltipOption } from 'echarts/types/dist/shared';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import type {
  ScatterChartColors,
  ScatterChartData,
  ScatterChartOptions,
  ScatterChartResolvedColors,
  ScatterChartSeries,
} from '../ScatterChart.types';

export type ScatterChartResolvedSeries = {
  readonly label: string;
  readonly data: readonly (readonly [number, number])[];
  readonly color: string;
  readonly pointRadius?: number;
};

export type ScatterChartDefinition = Omit<EChartsDefinition, 'type' | 'series'> & {
  readonly type: 'scatter';
  readonly series: ScatterChartResolvedSeries[];
  readonly scatterChartColors: ScatterChartResolvedColors;
};

type TooltipTrigger = NonNullable<TooltipOption['trigger']>;
type AxisPointerType = NonNullable<AxisPointerOption['type']>;

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const asTooltip = (value: unknown): TooltipOption =>
  isRecord(value) ? (value as TooltipOption) : {};

const asAxisPointer = (value: unknown): AxisPointerOption =>
  isRecord(value) ? (value as AxisPointerOption) : {};

/**
 * Resolves a CSS custom property from the Scatter Chart root element.
 *
 * @param styles - Computed Scatter Chart styles.
 * @param variableName - CSS variable name.
 * @returns Resolved CSS variable value.
 */
const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[ScatterChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

/**
 * Resolves a color or CSS variable expression into an ECharts-safe color.
 *
 * @param styles - Computed Scatter Chart styles.
 * @param color - Color value or CSS variable expression.
 * @returns Resolved color.
 */
const resolveColor = (styles: CSSStyleDeclaration, color: string): string => {
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

  throw new Error(`[ScatterChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

/**
 * Resolves Scatter Chart colors from consumer overrides and shared chart tokens.
 *
 * Precedence:
 * colors prop -> shared WCI chart CSS variables.
 *
 * @param element - Scatter Chart root element.
 * @param colors - Optional consumer color overrides.
 * @returns Fully resolved Scatter Chart colors.
 */
export const resolveScatterChartColors = (
  element: HTMLElement,
  colors?: ScatterChartColors,
): ScatterChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series && colors.series.length > 0
        ? colors.series.map((color) => resolveColor(styles, color))
        : resolveDefaultSeriesColors(styles),
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

/**
 * Resolves the final Scatter Chart series color.
 *
 * Precedence:
 * series color -> resolved shared series palette.
 *
 * @param item - Scatter Chart series.
 * @param index - Series index.
 * @param colors - Resolved Scatter Chart colors.
 * @param styles - Computed Scatter Chart styles.
 * @returns Resolved series color.
 */
const getSeriesColor = (
  item: ScatterChartSeries,
  index: number,
  colors: ScatterChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[ScatterChart] At least one series color is required.');
  }

  return color;
};

/**
 * Resolves Scatter Chart series into the normalized ECharts Scatter format.
 *
 * @param element - Scatter Chart root element.
 * @param series - Scatter Chart series.
 * @param colors - Resolved Scatter Chart colors.
 * @returns Resolved Scatter Chart series.
 */
const resolveSeries = (
  element: HTMLElement,
  series: readonly ScatterChartSeries[],
  colors: ScatterChartResolvedColors,
): ScatterChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item) => {
    const index = series.indexOf(item);

    return {
      label: item.label,
      data: item.data.map(([x, y]) => [x, y] as const),
      color: getSeriesColor(item, index, colors, styles),
      ...(item.pointRadius !== undefined ? { pointRadius: item.pointRadius } : {}),
    };
  });
};

/**
 * Creates the normalized Scatter Chart definition consumed by the common
 * ECharts configuration dispatcher.
 *
 * @param element - Scatter Chart root element.
 * @param data - Scatter Chart data.
 * @param colors - Resolved Scatter Chart colors.
 * @returns Normalized Scatter Chart definition.
 */
export const createScatterChartDefinition = ({
  element,
  data,
  colors,
}: {
  readonly element: HTMLElement;
  readonly data: ScatterChartData;
  readonly colors: ScatterChartResolvedColors;
}): ScatterChartDefinition => ({
  type: 'scatter',
  series: resolveSeries(element, data.series, colors),
  scatterChartColors: colors,
});

const resolveTooltipTrigger = (value: unknown, fallback: TooltipTrigger): TooltipTrigger =>
  value === 'item' || value === 'axis' || value === 'none' ? value : fallback;

const resolveAxisPointerType = (value: unknown, fallback: AxisPointerType): AxisPointerType =>
  value === 'line' || value === 'shadow' || value === 'cross' || value === 'none'
    ? value
    : fallback;

/**
 * Merges generated Scatter Chart options with consumer ECharts options.
 *
 * Consumer ECharts options take precedence over generated defaults.
 * Scatter-specific wrapper options are removed before forwarding options.
 *
 * @param generatedOptions - Generated Scatter Chart options.
 * @param options - Optional consumer configuration.
 * @returns Final ECharts configuration.
 */
export const mergeScatterChartOptions = (
  generatedOptions: EChartsOption,
  options?: ScatterChartOptions,
): EChartsOption => {
  if (!options) return generatedOptions;

  const {
    crosshair = false,
    showLegend,
    boldLabels,
    boldLegends,
    isBoxVisible: _isBoxVisible,
    pointRadius: _pointRadius,
    tooltip,
    legend,
    grid,
    xAxis,
    yAxis,
    ...rest
  } = options;

  const generatedTooltip = asTooltip(generatedOptions.tooltip);
  const customTooltip = asTooltip(tooltip);

  const generatedPointer = asAxisPointer(generatedTooltip.axisPointer);
  const customPointer = asAxisPointer(customTooltip.axisPointer);

  const generatedLegend = asRecord(generatedOptions.legend);
  const customLegend = asRecord(legend);

  const generatedLegendTextStyle = asRecord(generatedLegend['textStyle']);
  const customLegendTextStyle = asRecord(customLegend['textStyle']);

  const generatedXAxis = asRecord(generatedOptions.xAxis);
  const customXAxis = asRecord(xAxis);

  const generatedXAxisLabel = asRecord(generatedXAxis['axisLabel']);
  const customXAxisLabel = asRecord(customXAxis['axisLabel']);

  const generatedYAxis = asRecord(generatedOptions.yAxis);
  const customYAxis = asRecord(yAxis);

  const generatedYAxisLabel = asRecord(generatedYAxis['axisLabel']);
  const customYAxisLabel = asRecord(customYAxis['axisLabel']);

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
      ...customLegend,
      textStyle: {
        ...generatedLegendTextStyle,
        ...(boldLegends !== undefined
          ? { fontWeight: boldLegends ? 'bold' : 'normal' }
          : {}),
        ...customLegendTextStyle,
      },
    },
    xAxis: {
      ...generatedXAxis,
      ...customXAxis,
      axisLabel: {
        ...generatedXAxisLabel,
        ...(boldLabels !== undefined
          ? { fontWeight: boldLabels ? 'bold' : 'normal' }
          : {}),
        ...customXAxisLabel,
      },
    },
    yAxis: {
      ...generatedYAxis,
      ...customYAxis,
      axisLabel: {
        ...generatedYAxisLabel,
        ...(boldLabels !== undefined
          ? { fontWeight: boldLabels ? 'bold' : 'normal' }
          : {}),
        ...customYAxisLabel,
      },
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
        snap: crosshair,
      },
    },
  };
};