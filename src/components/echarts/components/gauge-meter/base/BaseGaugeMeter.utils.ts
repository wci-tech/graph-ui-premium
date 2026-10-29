import type { EChartsOption } from 'echarts';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';

import type {
  GaugeMeterColors,
  GaugeMeterOptions,
  GaugeMeterResolvedColors,
} from '../GaugeMeter.types';

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

export interface GaugeMeterDefinition {
  readonly type: 'gauge';
  readonly labels: string[];
  readonly data: number[];
  readonly value: number;
  readonly gaugeMeterColors: GaugeMeterResolvedColors;
  readonly gaugeMeterOptions?: GaugeMeterOptions;
}

const isRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> =>
  isRecord(value) ? value : {};

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(
      `[GaugeMeter] Missing required CSS variable "${variableName}".`,
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
    `[GaugeMeter] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  color: string | undefined,
  variableName: string,
): string =>
  color
    ? resolveColor(styles, color)
    : resolveColor(styles, resolveCssVariable(styles, variableName));

const resolveSeriesColors = (
  styles: CSSStyleDeclaration,
  colors?: string[],
): string[] =>
  colors?.length
    ? colors.map((color) => resolveColor(styles, color))
    : CHART_COLOR_VARIABLES.map((variableName) =>
      resolveColor(styles, resolveCssVariable(styles, variableName)),
    );

export const resolveGaugeMeterColors = (
  element: HTMLElement,
  colors?: GaugeMeterColors,
): GaugeMeterResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series: resolveSeriesColors(styles, colors?.series),
    needle: resolveTokenColor(
      styles,
      colors?.needle,
      CHART_TOKEN_VARIABLES.axisLine,
    ),
    label: resolveTokenColor(
      styles,
      colors?.label,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    score: resolveTokenColor(
      styles,
      colors?.score,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    scoreLabel: resolveTokenColor(
      styles,
      colors?.scoreLabel,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    axisLine: resolveTokenColor(
      styles,
      colors?.axisLine,
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

export const getGaugeMeterTotal = (data: readonly number[]): number =>
  data.reduce((total, currentValue) => total + Math.max(0, currentValue), 0);

export const resolveGaugeMeterValue = (
  data: readonly number[],
  value?: number,
  max?: number,
): number => {
  const total = max ?? getGaugeMeterTotal(data);
  const resolvedValue = value ?? data[0] ?? 0;
  const minimumValue = Math.max(resolvedValue, 0);

  return total > 0 ? Math.min(minimumValue, total) : minimumValue;
};

export const createGaugeMeterDefinition = ({
  labels,
  data,
  value,
  colors,
  options,
}: {
  readonly labels: string[];
  readonly data: number[];
  readonly value?: number;
  readonly colors: GaugeMeterResolvedColors;
  readonly options?: GaugeMeterOptions;
}): GaugeMeterDefinition => {
  const resolvedValue = resolveGaugeMeterValue(
    data,
    value ?? options?.value,
    options?.max,
  );

  return {
    type: 'gauge',
    labels: Array.from(labels),
    data: Array.from(data),
    value: resolvedValue,
    gaugeMeterColors: colors,
    ...(options ? { gaugeMeterOptions: options } : {}),
  };
};

export const mergeGaugeMeterOptions = (
  generatedOptions: EChartsOption,
  options?: GaugeMeterOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    value: _value,
    unit: _unit,
    label: _label,
    min: _min,
    max: _max,
    splitNumber: _splitNumber,
    startAngle: _startAngle,
    endAngle: _endAngle,
    radius: _radius,
    center: _center,
    axisLineWidth: _axisLineWidth,
    pointerLength: _pointerLength,
    pointerWidth: _pointerWidth,
    showBoundaryLabels: _showBoundaryLabels,
    showSegmentLabels: _showSegmentLabels,
    boldScore: _boldScore,
    isBoxVisible: _isBoxVisible,
    tooltip,
    ...rest
  } = options;

  return {
    ...generatedOptions,
    ...rest,
    tooltip: {
      ...asRecord(generatedOptions.tooltip),
      ...asRecord(tooltip),
    },
  };
};