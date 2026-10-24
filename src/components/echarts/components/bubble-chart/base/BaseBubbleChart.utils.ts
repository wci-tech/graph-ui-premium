import type { EChartsOption, TooltipComponentOption } from 'echarts';
import type { AxisPointerOption } from 'echarts/types/dist/shared';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import { isRecord } from '@/common/utils/Common.utils';

import type {
  BubbleChartColors,
  BubbleChartData,
  BubbleChartOptions,
  BubbleChartResolvedColors,
  BubbleSeriesDefinition,
} from '../BubbleChart.types';

import { BUBBLE_CHART_CONFIG } from './BaseBubbleChart.constants';

export interface BubbleChartResolvedSeries extends BubbleSeriesDefinition {
  readonly color: string;
}

export interface BubbleChartDefinition {
  readonly type: 'bubble';
  readonly series: BubbleChartResolvedSeries[];
  readonly sizeMultiplier: number;
  readonly bubbleChartColors: BubbleChartResolvedColors;
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
      `[BubbleChart] Missing required CSS variable "${variableName}".`,
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
    `[BubbleChart] Unable to resolve CSS color variable "${variableName}".`,
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

export const resolveBubbleChartColors = (
  element: HTMLElement,
  colors?: BubbleChartColors,
): BubbleChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series && colors.series.length > 0
        ? colors.series.map((color) =>
          resolveColor(styles, color),
        )
        : resolveDefaultSeriesColors(styles),
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveCssVariable(
        styles,
        CHART_TOKEN_VARIABLES.axisText,
      ),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveCssVariable(
        styles,
        CHART_TOKEN_VARIABLES.axisLine,
      ),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveCssVariable(
        styles,
        CHART_TOKEN_VARIABLES.grid,
      ),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveCssVariable(
        styles,
        CHART_TOKEN_VARIABLES.tooltipBackground,
      ),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveCssVariable(
        styles,
        CHART_TOKEN_VARIABLES.tooltipText,
      ),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveCssVariable(
        styles,
        CHART_TOKEN_VARIABLES.tooltipBorder,
      ),
  };
};

const getBubbleSeries = (
  data?: BubbleChartData,
  series?: BubbleSeriesDefinition[],
): BubbleSeriesDefinition[] =>
  data?.series ??
  data?.datasets ??
  series ??
  [];

const getSeriesColor = (
  item: BubbleSeriesDefinition,
  index: number,
  colors: BubbleChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) {
    return resolveColor(styles, item.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error(
      '[BubbleChart] At least one series color is required.',
    );
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: readonly BubbleSeriesDefinition[],
  colors: BubbleChartResolvedColors,
): BubbleChartResolvedSeries[] => {
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

export const createBubbleChartDefinition = ({
  element,
  data,
  series,
  colors,
  sizeMultiplier,
}: {
  readonly element: HTMLElement;
  readonly data?: BubbleChartData;
  readonly series?: BubbleSeriesDefinition[];
  readonly colors: BubbleChartResolvedColors;
  readonly sizeMultiplier?: number;
}): BubbleChartDefinition => ({
  type: 'bubble',
  series: resolveSeries(
    element,
    getBubbleSeries(data, series),
    colors,
  ),
  sizeMultiplier:
    data?.sizeMultiplier ??
    sizeMultiplier ??
    BUBBLE_CHART_CONFIG.sizeMultiplier,
  bubbleChartColors: colors,
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

const mergeAxisOptions = ({
  generatedAxis,
  customAxis,
  title,
  boldLabels,
}: {
  readonly generatedAxis: unknown;
  readonly customAxis: unknown;
  readonly title: string | undefined;
  readonly boldLabels: boolean;
}): Record<string, unknown> => {
  const generated = asRecord(generatedAxis);
  const custom = asRecord(customAxis);
  const generatedLabel = asRecord(
    generated['axisLabel'],
  );
  const customLabel = asRecord(
    custom['axisLabel'],
  );
  const generatedNameStyle = asRecord(
    generated['nameTextStyle'],
  );
  const customNameStyle = asRecord(
    custom['nameTextStyle'],
  );

  return {
    ...generated,
    ...custom,
    ...(title
      ? {
        name: title,
        nameLocation: 'middle',
        nameGap: BUBBLE_CHART_CONFIG.axisTitleGap,
      }
      : {}),
    axisLabel: {
      ...generatedLabel,
      ...customLabel,
      fontWeight: boldLabels
        ? 'bold'
        : 'normal',
    },
    nameTextStyle: {
      ...generatedNameStyle,
      ...customNameStyle,
      fontWeight: boldLabels
        ? 'bold'
        : 'normal',
    },
  };
};

export const mergeBubbleChartOptions = (
  generatedOptions: EChartsOption,
  options?: BubbleChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    crosshair = false,
    showLegend,
    boldLabels = false,
    boldLegends = false,
    xAxisTitle,
    yAxisTitle,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    grid,
    xAxis,
    yAxis,
    series,
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
  const customLegend = asRecord(legend);
  const generatedLegendText = asRecord(
    generatedLegend['textStyle'],
  );
  const customLegendText = asRecord(
    customLegend['textStyle'],
  );
  const resolvedSeries =
    series ?? generatedOptions.series;

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
      ...customLegend,
      textStyle: {
        ...generatedLegendText,
        ...customLegendText,
        fontWeight: boldLegends
          ? 'bold'
          : 'normal',
      },
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
      },
    },
    xAxis: mergeAxisOptions({
      generatedAxis: generatedOptions.xAxis,
      customAxis: xAxis,
      title: xAxisTitle,
      boldLabels,
    }),
    yAxis: mergeAxisOptions({
      generatedAxis: generatedOptions.yAxis,
      customAxis: yAxis,
      title: yAxisTitle,
      boldLabels,
    }),
    ...(resolvedSeries !== undefined
      ? {
        series: resolvedSeries,
      }
      : {}),
  };
};