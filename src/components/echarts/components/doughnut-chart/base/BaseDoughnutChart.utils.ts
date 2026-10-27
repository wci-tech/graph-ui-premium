import type { EChartsOption } from 'echarts';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';

import type {
  DoughnutChartColors,
  DoughnutChartData,
  DoughnutChartOptions,
  DoughnutChartResolvedColors,
  DoughnutChartSeries,
} from '../DoughnutChart.types';

export interface DoughnutChartResolvedSeries
  extends DoughnutChartSeries {
  readonly color?: string;
}

export interface DoughnutChartDefinition {
  readonly type: 'doughnut';
  readonly labels: string[];
  readonly series: DoughnutChartResolvedSeries[];
  readonly doughnutChartColors: DoughnutChartResolvedColors;
  readonly doughnutChartOptions?: DoughnutChartOptions;
}

const CHART_NAME = 'DoughnutChart';

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value);

const asRecord = (
  value: unknown,
): Record<string, unknown> =>
  isRecord(value) ? value : {};

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles
    .getPropertyValue(variableName)
    .trim();

  if (!value) {
    throw new Error(
      `[${CHART_NAME}] Missing required CSS variable "${variableName}".`,
    );
  }

  return value;
};

const resolveColor = (
  styles: CSSStyleDeclaration,
  color: string,
): string => {
  const normalizedColor = color.trim();

  const match = normalizedColor.match(
    CSS_VARIABLE_PATTERN,
  );

  if (!match) {
    return normalizedColor;
  }

  const variableName = match[1];

  if (!variableName) {
    return normalizedColor;
  }

  const resolvedColor = styles
    .getPropertyValue(variableName)
    .trim();

  if (resolvedColor) {
    return resolveColor(
      styles,
      resolvedColor,
    );
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(
      styles,
      fallback,
    );
  }

  throw new Error(
    `[${CHART_NAME}] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): string[] =>
  CHART_COLOR_VARIABLES.map(
    (variableName) =>
      resolveColor(
        styles,
        resolveCssVariable(
          styles,
          variableName,
        ),
      ),
  );

const resolveSeriesColors = (
  styles: CSSStyleDeclaration,
  colors?: string[],
): string[] =>
  colors?.length
    ? colors.map((color) =>
      resolveColor(
        styles,
        color,
      ),
    )
    : resolveDefaultSeriesColors(styles);

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  color: string | undefined,
  variableName: string,
): string =>
  color
    ? resolveColor(
      styles,
      color,
    )
    : resolveColor(
      styles,
      resolveCssVariable(
        styles,
        variableName,
      ),
    );

export const resolveDoughnutChartColors = (
  element: HTMLElement,
  colors?: DoughnutChartColors,
): DoughnutChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series: resolveSeriesColors(
      styles,
      colors?.series,
    ),
    legendText: resolveTokenColor(
      styles,
      colors?.legendText,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    border: resolveTokenColor(
      styles,
      colors?.border,
      CHART_TOKEN_VARIABLES.tooltipBackground,
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

const resolveSeries = (
  element: HTMLElement,
  series: DoughnutChartSeries[],
): DoughnutChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item) => ({
    ...item,
    ...(item.color
      ? {
        color: resolveColor(
          styles,
          item.color,
        ),
      }
      : {}),
  }));
};

export const createDoughnutChartDefinition = ({
  element,
  data,
  colors,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: DoughnutChartData;
  readonly colors: DoughnutChartResolvedColors;
  readonly options?: DoughnutChartOptions;
}): DoughnutChartDefinition => ({
  type: 'doughnut',
  labels: [...data.labels],
  series: resolveSeries(
    element,
    data.series,
  ),
  doughnutChartColors: colors,
  ...(options
    ? {
      doughnutChartOptions: options,
    }
    : {}),
});

export const mergeDoughnutChartOptions = (
  generatedOptions: EChartsOption,
  options?: DoughnutChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    showLegend,
    boldLabels: _boldLabels,
    isBoxVisible: _isBoxVisible,
    innerRadius: _innerRadius,
    outerRadius: _outerRadius,
    tooltip,
    legend,
    series,
    ...rest
  } = options;

  const generatedSeries = Array.isArray(
    generatedOptions.series,
  )
    ? generatedOptions.series
    : [];

  const customSeries = Array.isArray(series)
    ? series
    : [];

  const mergedSeries = generatedSeries.map(
    (seriesItem, index) => {
      const customItem = customSeries[index];

      if (
        !isRecord(seriesItem) ||
        !isRecord(customItem)
      ) {
        return seriesItem;
      }

      const generatedEmphasis = asRecord(
        seriesItem['emphasis'],
      );

      const customEmphasis = asRecord(
        customItem['emphasis'],
      );

      return {
        ...seriesItem,
        ...customItem,
        itemStyle: {
          ...asRecord(
            seriesItem['itemStyle'],
          ),
          ...asRecord(
            customItem['itemStyle'],
          ),
        },
        label: {
          ...asRecord(
            seriesItem['label'],
          ),
          ...asRecord(
            customItem['label'],
          ),
        },
        labelLine: {
          ...asRecord(
            seriesItem['labelLine'],
          ),
          ...asRecord(
            customItem['labelLine'],
          ),
        },
        emphasis: {
          ...generatedEmphasis,
          ...customEmphasis,
          label: {
            ...asRecord(
              generatedEmphasis['label'],
            ),
            ...asRecord(
              customEmphasis['label'],
            ),
          },
        },
      };
    },
  );

  return {
    ...generatedOptions,
    ...rest,
    tooltip: {
      ...asRecord(
        generatedOptions.tooltip,
      ),
      ...asRecord(tooltip),
    },
    legend: {
      ...asRecord(
        generatedOptions.legend,
      ),
      ...(showLegend !== undefined
        ? {
          show: showLegend,
        }
        : {}),
      ...asRecord(legend),
    },
    series: mergedSeries,
  };
};