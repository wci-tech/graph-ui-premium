import type { EChartsOption } from 'echarts';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  HeatmapCellSizeMode,
  HeatmapChartColors,
  HeatmapChartData,
  HeatmapChartOptions,
  HeatmapChartResolvedColors,
  HeatmapChartSeries,
} from '../HeatmapChart.types';

import { HEATMAP_CHART_CONFIG } from './BaseHeatmapChart.constants';

export interface HeatmapChartResolvedSeries extends HeatmapChartSeries {
  readonly color: string;
}

export interface HeatmapChartDefinition {
  readonly type: 'heatmap';
  readonly xLabels: string[];
  readonly yLabels: string[];
  readonly series: HeatmapChartResolvedSeries[];
  readonly heatmapChartColors: HeatmapChartResolvedColors;
  readonly showLabels: boolean;
  readonly boldLabels: boolean;
  readonly cellSizeMode: HeatmapCellSizeMode;
  readonly cellMinSizeRatio: number;
  readonly cellGap: number;
  readonly cellBorderRadius: number;
  readonly crosshair: boolean;
}

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[HeatmapChart] Missing required CSS variable "${variableName}".`);
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

  throw new Error(`[HeatmapChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveHeatmapChartColors = (
  element: HTMLElement,
  colors?: HeatmapChartColors,
): HeatmapChartResolvedColors => {
  const styles = getComputedStyle(element);

  const resolveToken = (variableName: string): string =>
    resolveColor(styles, resolveCssVariable(styles, variableName));

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveToken(CHART_TOKEN_VARIABLES.axisText),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveToken(CHART_TOKEN_VARIABLES.axisLine),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveToken(CHART_TOKEN_VARIABLES.grid),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveToken(CHART_TOKEN_VARIABLES.tooltipBackground),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveToken(CHART_TOKEN_VARIABLES.tooltipText),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveToken(CHART_TOKEN_VARIABLES.tooltipBorder),
  };
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly HeatmapChartSeries[],
  colors: HeatmapChartResolvedColors,
): HeatmapChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item, index) => {
    const fallbackColor = colors.series[index % colors.series.length];

    if (!fallbackColor) {
      throw new Error('[HeatmapChart] At least one series color is required.');
    }

    return {
      ...item,
      color: item.color ? resolveColor(styles, item.color) : fallbackColor,
    };
  });
};

export const createHeatmapChartDefinition = ({
  element,
  data,
  colors,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: HeatmapChartData;
  readonly colors: HeatmapChartResolvedColors;
  readonly options?: HeatmapChartOptions;
}): HeatmapChartDefinition => ({
  type: 'heatmap',
  xLabels: [...data.xLabels],
  yLabels: [...data.yLabels],
  series: resolveSeries(element, data.series, colors),
  heatmapChartColors: colors,
  showLabels: options?.showLabels ?? false,
  boldLabels: options?.boldLabels ?? false,
  cellSizeMode: options?.cellSizeMode ?? 'equal',
  cellMinSizeRatio: options?.cellMinSizeRatio ?? HEATMAP_CHART_CONFIG.cellMinSizeRatio,
  cellGap: options?.cellGap ?? HEATMAP_CHART_CONFIG.cellGap,
  cellBorderRadius: options?.cellBorderRadius ?? HEATMAP_CHART_CONFIG.cellBorderRadius,
  crosshair: options?.crosshair ?? false,
});

export const mergeHeatmapChartOptions = (
  generatedOptions: EChartsOption,
  options?: HeatmapChartOptions,
): EChartsOption => {
  if (!options) return generatedOptions;

  const {
    showLabels: _showLabels,
    boldLabels: _boldLabels,
    cellSizeMode: _cellSizeMode,
    cellMinSizeRatio: _cellMinSizeRatio,
    cellGap: _cellGap,
    cellBorderRadius: _cellBorderRadius,
    crosshair: _crosshair,
    isBoxVisible: _isBoxVisible,
    xAxis,
    yAxis,
    tooltip,
    visualMap,
    grid,
    ...rest
  } = options;

  return {
    ...generatedOptions,
    ...rest,
    xAxis: {
      ...asRecord(generatedOptions.xAxis),
      ...asRecord(xAxis),
    },
    yAxis: {
      ...asRecord(generatedOptions.yAxis),
      ...asRecord(yAxis),
    },
    tooltip: {
      ...asRecord(generatedOptions.tooltip),
      ...asRecord(tooltip),
    },
    visualMap: {
      ...asRecord(generatedOptions.visualMap),
      ...asRecord(visualMap),
    },
    grid: {
      ...asRecord(generatedOptions.grid),
      ...asRecord(grid),
    },
  };
};