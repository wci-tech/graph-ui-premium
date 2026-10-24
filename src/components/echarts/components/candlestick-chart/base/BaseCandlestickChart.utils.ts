import type { EChartsOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';

import type {
  CandlestickChartColors,
  CandlestickChartData,
  CandlestickChartOptions,
  CandlestickChartPoint,
  CandlestickChartResolvedColors,
} from '../CandlestickChart.types';

export interface CandlestickChartDefinition {
  readonly type: 'candlestick';
  readonly labels: string[];
  readonly series: readonly CandlestickChartPoint[];
  readonly candlestickChartColors: CandlestickChartResolvedColors;
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
    throw new Error(
      `[CandlestickChart] Missing required CSS variable "${variableName}".`,
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
    `[CandlestickChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  variableName: string,
  override?: string,
): string =>
  resolveColor(
    styles,
    override ?? resolveCssVariable(styles, variableName),
  );

export const resolveCandlestickChartColors = (
  element: HTMLElement,
  colors?: CandlestickChartColors,
): CandlestickChartResolvedColors => {
  const styles = getComputedStyle(element);

  const up = resolveTokenColor(
    styles,
    CHART_COLOR_VARIABLES[2],
    colors?.up,
  );

  const down = resolveTokenColor(
    styles,
    CHART_COLOR_VARIABLES[4],
    colors?.down,
  );

  const unchanged = resolveTokenColor(
    styles,
    CHART_TOKEN_VARIABLES.axisText,
    colors?.unchanged,
  );

  return {
    up,
    down,
    unchanged,
    volumeUp: colors?.volumeUp
      ? resolveColor(styles, colors.volumeUp)
      : up,
    volumeDown: colors?.volumeDown
      ? resolveColor(styles, colors.volumeDown)
      : down,
    axisText: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.axisText,
      colors?.axisText,
    ),
    axisLine: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.axisLine,
      colors?.axisLine,
    ),
    grid: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.grid,
      colors?.grid,
    ),
    crosshair: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.axisText,
      colors?.crosshair,
    ),
    crosshairLabelBackground: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipBackground,
      colors?.crosshairLabelBackground,
    ),
    crosshairLabelText: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipText,
      colors?.crosshairLabelText,
    ),
    tooltipBackground: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipBackground,
      colors?.tooltipBackground,
    ),
    tooltipText: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipText,
      colors?.tooltipText,
    ),
    tooltipBorder: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipBorder,
      colors?.tooltipBorder,
    ),
  };
};

export const createCandlestickChartDefinition = ({
  data,
  colors,
}: {
  readonly data: CandlestickChartData;
  readonly colors: CandlestickChartResolvedColors;
}): CandlestickChartDefinition => ({
  type: 'candlestick',
  labels: [...data.labels],
  series: data.series,
  candlestickChartColors: colors,
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

export const mergeCandlestickChartOptions = (
  generatedOptions: EChartsOption,
  options?: CandlestickChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    crosshair = true,
    showLegend,
    boldLabels: _boldLabels,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    axisPointer,
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
  const generatedAxisPointer = asRecord(
    generatedOptions.axisPointer,
  );
  const customAxisPointer = asRecord(axisPointer);
  const generatedLegend = asRecord(generatedOptions.legend);

  return {
    ...generatedOptions,
    ...rest,
    legend: {
      ...generatedLegend,
      ...(showLegend !== undefined
        ? { show: showLegend }
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
};