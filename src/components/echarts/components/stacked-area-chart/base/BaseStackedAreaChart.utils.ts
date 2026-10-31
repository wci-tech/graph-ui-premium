import type { EChartsOption, LineSeriesOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  StackedAreaChartAppearance,
  StackedAreaChartColors,
  StackedAreaChartData,
  StackedAreaChartOptions,
  StackedAreaChartResolvedColors,
  StackedAreaChartSeries,
} from '@/components/echarts/components/stacked-area-chart/StackedAreaChart.types';

export interface StackedAreaChartResolvedSeries extends StackedAreaChartSeries {
  readonly color: string;
  readonly pointColor: string;
}

export interface StackedAreaChartDefinition {
  readonly type: 'stacked-area';
  readonly labels: string[];
  readonly series: StackedAreaChartResolvedSeries[];
  readonly appearance: StackedAreaChartAppearance;
  readonly stackedAreaChartColors: StackedAreaChartResolvedColors;
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
    throw new Error(`[StackedAreaChart] Missing required CSS variable "${variableName}".`);
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

  throw new Error(
    `[StackedAreaChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveStackedAreaChartColors = (
  element: HTMLElement,
  colors?: StackedAreaChartColors,
): StackedAreaChartResolvedColors => {
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
  item: StackedAreaChartSeries,
  index: number,
  colors: StackedAreaChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[StackedAreaChart] At least one series color is required.');
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly StackedAreaChartSeries[],
  colors: StackedAreaChartResolvedColors,
): StackedAreaChartResolvedSeries[] => {
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

export const createStackedAreaChartDefinition = ({
  element,
  data,
  colors,
  appearance,
}: {
  readonly element: HTMLElement;
  readonly data: StackedAreaChartData;
  readonly colors: StackedAreaChartResolvedColors;
  readonly appearance: StackedAreaChartAppearance;
}): StackedAreaChartDefinition => ({
  type: 'stacked-area',
  labels: [...data.labels],
  series: resolveSeries(element, data.series, colors),
  appearance,
  stackedAreaChartColors: colors,
});

const resolveTooltipTrigger = (value: unknown, fallback: TooltipTrigger): TooltipTrigger =>
  value === 'item' || value === 'axis' || value === 'none' ? value : fallback;

const resolveAxisPointerType = (value: unknown, fallback: AxisPointerType): AxisPointerType =>
  value === 'line' || value === 'shadow' || value === 'none' || value === 'cross'
    ? value
    : fallback;

const getSeriesArray = (value: EChartsOption['series'] | unknown): LineSeriesOption[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is LineSeriesOption => isRecord(item));
};

const mergeRecord = (generatedValue: unknown, customValue: unknown): Record<string, unknown> => ({
  ...asRecord(generatedValue),
  ...asRecord(customValue),
});

const mergeEmphasis = (generatedValue: unknown, customValue: unknown): Record<string, unknown> => {
  const generatedEmphasis = asRecord(generatedValue);
  const customEmphasis = asRecord(customValue);

  return {
    ...generatedEmphasis,
    ...customEmphasis,
    itemStyle: mergeRecord(generatedEmphasis['itemStyle'], customEmphasis['itemStyle']),
    lineStyle: mergeRecord(generatedEmphasis['lineStyle'], customEmphasis['lineStyle']),
    areaStyle: mergeRecord(generatedEmphasis['areaStyle'], customEmphasis['areaStyle']),
  };
};

const mergeSeriesItem = (
  generatedItem: LineSeriesOption,
  customItem: LineSeriesOption,
): LineSeriesOption => ({
  ...generatedItem,
  ...customItem,
  areaStyle: mergeRecord(generatedItem.areaStyle, customItem.areaStyle),
  lineStyle: mergeRecord(generatedItem.lineStyle, customItem.lineStyle),
  itemStyle: mergeRecord(generatedItem.itemStyle, customItem.itemStyle),
  emphasis: mergeEmphasis(generatedItem.emphasis, customItem.emphasis),
  ...(customItem.data ?? generatedItem.data
    ? {
      data: customItem.data ?? generatedItem.data,
    }
    : {}),
});

const mergeSeries = (
  generatedValue: EChartsOption['series'] | undefined,
  customValue: unknown,
): LineSeriesOption[] => {
  const generatedSeries = getSeriesArray(generatedValue);
  const customSeries = getSeriesArray(customValue);

  if (customSeries.length === 0) {
    return generatedSeries;
  }

  return generatedSeries.map((generatedItem, index) => {
    const customItem = customSeries[index];

    return customItem ? mergeSeriesItem(generatedItem, customItem) : generatedItem;
  });
};

export const mergeStackedAreaChartOptions = (
  generatedOptions: EChartsOption,
  options?: StackedAreaChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    crosshair = false,
    showLegend,
    boldLabels,
    boldLegends,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    grid,
    series,
    ...remainingOptions
  } = options;

  const generatedTooltip = asTooltip(generatedOptions.tooltip);
  const customTooltip = asTooltip(tooltip);
  const generatedAxisPointer = asAxisPointer(generatedTooltip.axisPointer);
  const customAxisPointer = asAxisPointer(customTooltip.axisPointer);
  const generatedLegend = asRecord(generatedOptions.legend);
  const customLegend = asRecord(legend);
  const generatedLegendTextStyle = asRecord(generatedLegend['textStyle']);
  const customLegendTextStyle = asRecord(customLegend['textStyle']);
  const generatedGrid = asRecord(generatedOptions.grid);
  const customGrid = asRecord(grid);
  const generatedTrigger = resolveTooltipTrigger(generatedTooltip.trigger, 'item');
  const customTrigger = resolveTooltipTrigger(customTooltip.trigger, generatedTrigger);
  const generatedAxisPointerType = resolveAxisPointerType(generatedAxisPointer.type, 'line');
  const customAxisPointerType = resolveAxisPointerType(
    customAxisPointer.type,
    generatedAxisPointerType,
  );

  return {
    ...generatedOptions,
    ...remainingOptions,
    grid: {
      ...generatedGrid,
      ...customGrid,
    },
    legend: {
      ...generatedLegend,
      ...customLegend,
      ...(showLegend !== undefined ? { show: showLegend } : {}),
      textStyle: {
        ...generatedLegendTextStyle,
        ...customLegendTextStyle,
        ...(boldLegends !== undefined
          ? {
            fontWeight: boldLegends ? 'bold' : 'normal',
          }
          : {}),
      },
    },
    tooltip: {
      ...generatedTooltip,
      ...customTooltip,
      trigger: crosshair ? 'axis' : customTrigger,
      axisPointer: {
        ...generatedAxisPointer,
        ...customAxisPointer,
        show: crosshair,
        type: crosshair ? 'cross' : customAxisPointerType,
        snap: true,
      },
    },
    xAxis: mergeAxisOptions(generatedOptions.xAxis, options.xAxis, boldLabels),
    yAxis: mergeAxisOptions(generatedOptions.yAxis, options.yAxis, boldLabels),
    series: mergeSeries(generatedOptions.series, series),
  };
};

const mergeAxisOptions = (
  generatedValue: unknown,
  customValue: unknown,
  boldLabels?: boolean,
): Record<string, unknown> => {
  const generatedAxis = asRecord(Array.isArray(generatedValue) ? generatedValue[0] : generatedValue);
  const customAxis = asRecord(Array.isArray(customValue) ? customValue[0] : customValue);
  const generatedAxisLabel = asRecord(generatedAxis['axisLabel']);
  const customAxisLabel = asRecord(customAxis['axisLabel']);

  return {
    ...generatedAxis,
    ...customAxis,
    axisLabel: {
      ...generatedAxisLabel,
      ...customAxisLabel,
      ...(boldLabels !== undefined
        ? {
          fontWeight: boldLabels ? 'bold' : 'normal',
        }
        : {}),
    },
  };
};