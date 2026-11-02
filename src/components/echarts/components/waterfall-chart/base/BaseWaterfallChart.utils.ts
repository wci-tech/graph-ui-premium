import type { EChartsOption } from 'echarts';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  WaterfallChartColors,
  WaterfallChartData,
  WaterfallChartOptions,
  WaterfallChartResolvedColors,
} from '../WaterfallChart.types';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[WaterfallChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

const resolveColor = (styles: CSSStyleDeclaration, color: string): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(CSS_VARIABLE_PATTERN);

  if (!match) return normalizedColor;

  const variableName = match[1];

  if (!variableName) return normalizedColor;

  const resolvedColor = styles.getPropertyValue(variableName).trim();

  if (resolvedColor) return resolveColor(styles, resolvedColor);

  const fallback = match[2]?.trim();

  if (fallback) return resolveColor(styles, fallback);

  throw new Error(`[WaterfallChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveWaterfallChartColors = (
  element: HTMLElement,
  colors?: WaterfallChartColors,
): WaterfallChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series && colors.series.length > 0
        ? colors.series.map((color) => resolveColor(styles, color))
        : resolveDefaultSeriesColors(styles),
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText)),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine)),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.grid)),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBackground),
      ),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText)),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder)),
  };
};

export interface WaterfallChartPoint {
  readonly value: number;
  readonly start: number;
  readonly end: number;
  readonly change: number;
  readonly isTotal: boolean;
  readonly color: string;
}

export interface WaterfallChartDefinition {
  readonly type: 'waterfall';
  readonly labels: string[];
  readonly points: WaterfallChartPoint[];
  readonly waterfallChartColors: WaterfallChartResolvedColors;
  readonly showDataLabels: boolean;
  readonly boldLabels: boolean;
  readonly boldLegends: boolean;
}

const normalizeTotalIndices = (
  totalIndices: number[] | undefined,
  dataLength: number,
): Set<number> => {
  const source = totalIndices ?? (dataLength > 0 ? [0] : []);

  return new Set(
    source.filter((index) => Number.isInteger(index) && index >= 0 && index < dataLength),
  );
};

const getSeriesColor = (
  colors: WaterfallChartResolvedColors,
  index: number,
  fallbackIndex = 0,
): string => {
  const color = colors.series[index] ?? colors.series[fallbackIndex] ?? colors.series[0];

  if (!color) {
    throw new Error('[WaterfallChart] At least one series color is required.');
  }

  return color;
};

const createWaterfallPoints = (
  data: number[],
  colors: WaterfallChartResolvedColors,
  totalIndices: Set<number>,
): WaterfallChartPoint[] => {
  const totalColor = getSeriesColor(colors, 0);
  const positiveColor = getSeriesColor(colors, 2);
  const negativeColor = getSeriesColor(colors, 4);
  let runningTotal = 0;

  return data.map((value, index) => {
    const isTotal = totalIndices.has(index);

    if (isTotal) {
      runningTotal = value;

      return {
        value,
        start: 0,
        end: value,
        change: value,
        isTotal: true,
        color: totalColor,
      };
    }

    const start = runningTotal;
    const end = start + value;

    runningTotal = end;

    return {
      value,
      start,
      end,
      change: value,
      isTotal: false,
      color: value >= 0 ? positiveColor : negativeColor,
    };
  });
};

export const createWaterfallChartDefinition = ({
  data,
  colors,
  options,
}: {
  readonly data: WaterfallChartData;
  readonly colors: WaterfallChartResolvedColors;
  readonly options?: WaterfallChartOptions;
}): WaterfallChartDefinition => {
  const totalIndices = normalizeTotalIndices(options?.totalIndices, data.data.length);

  return {
    type: 'waterfall',
    labels: [...data.labels],
    points: createWaterfallPoints(data.data, colors, totalIndices),
    waterfallChartColors: colors,
    showDataLabels: options?.showDataLabels ?? true,
    boldLabels: options?.boldLabels ?? false,
    boldLegends: options?.boldLegends ?? false,
  };
};

type TooltipTrigger = 'item' | 'axis' | 'none';
type AxisPointerType = 'line' | 'shadow' | 'none' | 'cross';

const resolveTooltipTrigger = (value: unknown, fallback: TooltipTrigger): TooltipTrigger =>
  value === 'item' || value === 'axis' || value === 'none' ? value : fallback;

const resolveAxisPointerType = (value: unknown, fallback: AxisPointerType): AxisPointerType =>
  value === 'line' || value === 'shadow' || value === 'none' || value === 'cross'
    ? value
    : fallback;

export const mergeWaterfallChartOptions = (
  generatedOptions: EChartsOption,
  options?: WaterfallChartOptions,
): EChartsOption => {
  if (!options) return generatedOptions;

  const {
    totalIndices: _totalIndices,
    crosshair = false,
    showLegend,
    showDataLabels: _showDataLabels,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    barWidth: _barWidth,
    barMaxWidth: _barMaxWidth,
    isBoxVisible: _isBoxVisible,
    chartBackground: _chartBackground,
    tooltip,
    legend,
    grid,
    xAxis,
    yAxis,
    series,
    ...rest
  } = options;

  const generatedTooltip = asRecord(generatedOptions.tooltip);
  const customTooltip = asRecord(tooltip);
  const generatedPointer = asRecord(generatedTooltip['axisPointer']);
  const customPointer = asRecord(customTooltip['axisPointer']);
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
    xAxis: {
      ...asRecord(generatedOptions.xAxis),
      ...asRecord(xAxis),
    },
    yAxis: {
      ...asRecord(generatedOptions.yAxis),
      ...asRecord(yAxis),
    },
    tooltip: {
      ...generatedTooltip,
      ...customTooltip,
      trigger: crosshair
        ? 'axis'
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
    },
    ...(series !== undefined ? { series } : {}),
  };
};