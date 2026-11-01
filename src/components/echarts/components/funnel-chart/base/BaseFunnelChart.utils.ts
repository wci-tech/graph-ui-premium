import type { EChartsOption } from 'echarts';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';

import type {
  FunnelChartColors,
  FunnelChartData,
  FunnelChartOptions,
  FunnelChartResolvedColors,
  FunnelChartSeries,
} from '../FunnelChart.types';

import { FUNNEL_CHART_CONFIG } from './BaseFunnelChart.constants';

export interface FunnelChartResolvedSeries extends FunnelChartSeries {
  readonly colors: string[];
}

export interface FunnelChartDefinition {
  readonly type: 'funnel';
  readonly labels: string[];
  readonly series: FunnelChartResolvedSeries[];
  readonly funnelAlign: NonNullable<FunnelChartOptions['funnelAlign']>;
  readonly sort: NonNullable<FunnelChartOptions['sort']>;
  readonly gap: number;
  readonly minSize: string;
  readonly maxSize: string;
  readonly showLegend: boolean;
  readonly boldLabels: boolean;
  readonly boldLegends: boolean;
  readonly funnelChartColors: FunnelChartResolvedColors;
}

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
      `[FunnelChart] Missing required CSS variable "${variableName}".`,
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

  if (!match) return normalizedColor;

  const variableName = match[1];

  if (!variableName) return normalizedColor;

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
    return resolveColor(styles, fallback);
  }

  throw new Error(
    `[FunnelChart] Unable to resolve CSS color variable "${variableName}".`,
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

export const resolveFunnelChartColors = (
  element: HTMLElement,
  colors?: FunnelChartColors,
): FunnelChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series &&
        colors.series.length > 0
        ? colors.series.map((color) =>
          resolveColor(styles, color),
        )
        : resolveDefaultSeriesColors(styles),
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.axisText,
        ),
      ),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.axisLine,
        ),
      ),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.grid,
        ),
      ),
    tooltipBackground:
      colors?.tooltipBackground
        ? resolveColor(
          styles,
          colors.tooltipBackground,
        )
        : resolveColor(
          styles,
          resolveCssVariable(
            styles,
            CHART_TOKEN_VARIABLES.tooltipBackground,
          ),
        ),
    tooltipText: colors?.tooltipText
      ? resolveColor(
        styles,
        colors.tooltipText,
      )
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.tooltipText,
        ),
      ),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(
        styles,
        colors.tooltipBorder,
      )
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.tooltipBorder,
        ),
      ),
  };
};

const getSeriesColor = (
  item: FunnelChartSeries,
  colorIndex: number,
  colors: FunnelChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  const customColor =
    item.colors?.[colorIndex];

  if (customColor) {
    return resolveColor(
      styles,
      customColor,
    );
  }

  const color =
    colors.series[
    colorIndex % colors.series.length
    ];

  if (!color) {
    throw new Error(
      '[FunnelChart] At least one series color is required.',
    );
  }

  return color;
};

const resolveSeries = (
  element: HTMLElement,
  series: FunnelChartSeries[],
  colors: FunnelChartResolvedColors,
): FunnelChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return series.map((item) => ({
    ...item,
    data: Array.from(item.data),
    colors: item.data.map(
      (_, colorIndex) =>
        getSeriesColor(
          item,
          colorIndex,
          colors,
          styles,
        ),
    ),
  }));
};

export const createFunnelChartDefinition = ({
  element,
  data,
  colors,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: FunnelChartData;
  readonly colors: FunnelChartResolvedColors;
  readonly options?: FunnelChartOptions;
}): FunnelChartDefinition => ({
  type: 'funnel',
  labels: Array.from(data.labels),
  series: resolveSeries(
    element,
    data.series,
    colors,
  ),
  funnelAlign:
    options?.funnelAlign ??
    FUNNEL_CHART_CONFIG.funnelAlign,
  sort:
    options?.sort ??
    FUNNEL_CHART_CONFIG.sort,
  gap:
    options?.gap ??
    FUNNEL_CHART_CONFIG.gap,
  minSize:
    options?.minSize ??
    FUNNEL_CHART_CONFIG.minSize,
  maxSize:
    options?.maxSize ??
    FUNNEL_CHART_CONFIG.maxSize,
  showLegend:
    options?.showLegend ?? true,
  boldLabels:
    options?.boldLabels ?? false,
  boldLegends:
    options?.boldLegends ?? false,
  funnelChartColors: colors,
});

const getSeriesArray = (
  value: unknown,
): Record<string, unknown>[] =>
  Array.isArray(value)
    ? value.filter(isRecord)
    : [];

const mergeSeriesItem = (
  generatedItem: Record<string, unknown>,
  customItem: Record<string, unknown>,
): Record<string, unknown> => ({
  ...generatedItem,
  ...customItem,
  label: {
    ...asRecord(generatedItem['label']),
    ...asRecord(customItem['label']),
  },
  labelLine: {
    ...asRecord(
      generatedItem['labelLine'],
    ),
    ...asRecord(
      customItem['labelLine'],
    ),
  },
  itemStyle: {
    ...asRecord(
      generatedItem['itemStyle'],
    ),
    ...asRecord(
      customItem['itemStyle'],
    ),
  },
  emphasis: {
    ...asRecord(
      generatedItem['emphasis'],
    ),
    ...asRecord(
      customItem['emphasis'],
    ),
  },
  ...(customItem['data'] !== undefined
    ? { data: customItem['data'] }
    : generatedItem['data'] !== undefined
      ? { data: generatedItem['data'] }
      : {}),
});

const mergeSeries = (
  generatedValue: unknown,
  customValue: unknown,
): Record<string, unknown>[] => {
  const generatedSeries =
    getSeriesArray(generatedValue);
  const customSeries =
    getSeriesArray(customValue);

  if (customSeries.length === 0) {
    return generatedSeries;
  }

  return generatedSeries.map(
    (generatedItem, index) => {
      const customItem =
        customSeries[index];

      return customItem
        ? mergeSeriesItem(
          generatedItem,
          customItem,
        )
        : generatedItem;
    },
  );
};

export const mergeFunnelChartOptions = (
  generatedOptions: EChartsOption,
  options?: FunnelChartOptions,
): EChartsOption => {
  if (!options) return generatedOptions;

  const {
    funnelAlign: _funnelAlign,
    sort: _sort,
    gap: _gap,
    minSize: _minSize,
    maxSize: _maxSize,
    showLegend,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    crosshair: _crosshair,
    isBoxVisible: _isBoxVisible,
    tooltip,
    legend,
    series,
    ...rest
  } = options;

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
        ? { show: showLegend }
        : {}),
      ...asRecord(legend),
    },
    series: mergeSeries(
      generatedOptions.series,
      series,
    ),
  };
};