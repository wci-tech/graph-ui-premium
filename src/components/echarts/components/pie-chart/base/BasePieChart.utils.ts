import type { EChartsOption, PieSeriesOption, TooltipComponentOption } from 'echarts';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  PieChartColors,
  PieChartData,
  PieChartOptions,
  PieChartResolvedColors,
} from '../PieChart.types';

export interface PieChartDefinition {
  readonly type: 'pie';
  readonly labels: string[];
  readonly data: number[];
  readonly pieChartColors: PieChartResolvedColors;
}

type PieRadius = NonNullable<PieSeriesOption['radius']>;
type PieCenter = NonNullable<PieSeriesOption['center']>;

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const asTooltip = (value: unknown): TooltipComponentOption =>
  isRecord(value) ? (value as TooltipComponentOption) : {};

const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[PieChart] Missing required CSS variable "${variableName}".`);
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

  throw new Error(`[PieChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolvePieChartColors = (
  element: HTMLElement,
  colors?: PieChartColors,
): PieChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series && colors.series.length > 0
        ? colors.series.map((color) => resolveColor(styles, color))
        : resolveDefaultSeriesColors(styles),
    label: colors?.label
      ? resolveColor(styles, colors.label)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText),
    border: colors?.border
      ? resolveColor(styles, colors.border)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
    crosshair: colors?.crosshair
      ? resolveColor(styles, colors.crosshair)
      : resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
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

export const createPieChartDefinition = ({
  data,
  colors,
}: {
  readonly data: PieChartData;
  readonly colors: PieChartResolvedColors;
}): PieChartDefinition => ({
  type: 'pie',
  labels: [...data.labels],
  data: [...data.data],
  pieChartColors: colors,
});

const isPieRadius = (value: unknown): value is PieRadius => {
  if (typeof value === 'string' || typeof value === 'number') {
    return true;
  }

  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string' || typeof item === 'number')
  );
};

const isPieCenter = (value: unknown): value is PieCenter =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every((item) => typeof item === 'string' || typeof item === 'number');

export const resolvePieRadius = (value: unknown, fallback: PieRadius): PieRadius =>
  isPieRadius(value) ? value : fallback;

export const resolvePieCenter = (value: unknown, fallback: PieCenter): PieCenter =>
  isPieCenter(value) ? value : fallback;

export const mergePieChartOptions = (
  generatedOptions: EChartsOption,
  options?: PieChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    crosshair: _crosshair,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    isBoxVisible: _isBoxVisible,
    chartBackground,
    tooltip,
    legend,
    series,
    ...rest
  } = options;

  const generatedSeries = Array.isArray(generatedOptions.series) ? generatedOptions.series : [];
  const customSeries = Array.isArray(series) ? series : [];
  const generatedPieSeries = asRecord(generatedSeries[0]);
  const customPieSeries = asRecord(customSeries[0]);

  const generatedItemStyle = asRecord(generatedPieSeries['itemStyle']);
  const customItemStyle = asRecord(customPieSeries['itemStyle']);
  const generatedEmphasis = asRecord(generatedPieSeries['emphasis']);
  const customEmphasis = asRecord(customPieSeries['emphasis']);
  const generatedLabel = asRecord(generatedPieSeries['label']);
  const customLabel = asRecord(customPieSeries['label']);
  const generatedLabelLine = asRecord(generatedPieSeries['labelLine']);
  const customLabelLine = asRecord(customPieSeries['labelLine']);

  return {
    ...generatedOptions,
    ...rest,
    ...(chartBackground
      ? {
        backgroundColor: chartBackground,
      }
      : {}),
    tooltip: {
      ...asTooltip(generatedOptions.tooltip),
      ...asTooltip(tooltip),
    },
    legend: {
      ...asRecord(generatedOptions.legend),
      ...asRecord(legend),
      textStyle: {
        ...asRecord(asRecord(generatedOptions.legend)['textStyle']),
        ...asRecord(asRecord(legend)['textStyle']),
      },
    },
    series: [
      {
        ...generatedPieSeries,
        ...customPieSeries,
        itemStyle: {
          ...generatedItemStyle,
          ...customItemStyle,
        },
        emphasis: {
          ...generatedEmphasis,
          ...customEmphasis,
          itemStyle: {
            ...asRecord(generatedEmphasis['itemStyle']),
            ...asRecord(customEmphasis['itemStyle']),
          },
        },
        label: {
          ...generatedLabel,
          ...customLabel,
        },
        labelLine: {
          ...generatedLabelLine,
          ...customLabelLine,
        },
        data: generatedPieSeries['data'],
      },
    ],
  };
};