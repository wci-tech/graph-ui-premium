import type { TooltipItem } from 'chart.js';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import { isRecord } from '@/common/utils/Common.utils';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  BarLineChartAppearance,
  BarLineChartColors,
  BarLineChartDataset,
  BarLineChartOptions,
  BarLineChartResolvedColors,
} from '../BarLineChart.types';

import { BAR_LINE_CHART_CONFIG } from './BaseBarLineChart.constants';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const TREND_COLOR_VARIABLES = {
  up: '--wci-chart-green',
  down: '--wci-chart-red',
} as const;

/* -------------------------------------------------------------------------- */
/* Record helpers                                                              */
/* -------------------------------------------------------------------------- */

const getNestedRecord = (
  source: unknown,
  ...keys: string[]
): Record<string, unknown> => {
  let current: unknown = source;

  for (const key of keys) {
    if (!isRecord(current)) {
      return {};
    }

    current = current[key];
  }

  return isRecord(current) ? current : {};
};

/* -------------------------------------------------------------------------- */
/* Color resolution                                                            */
/* -------------------------------------------------------------------------- */

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(
      `[BarLineChart] Missing required CSS variable "${variableName}".`,
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
    `[BarLineChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  color: string | undefined,
  variableName: string,
): string =>
  color
    ? resolveColor(styles, color)
    : resolveColor(styles, resolveCssVariable(styles, variableName));

export const resolveBarLineChartColors = (
  element: HTMLElement,
  colors?: BarLineChartColors,
): BarLineChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series?.length
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: resolveTokenColor(
      styles,
      colors?.axisText,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    axisLine: resolveTokenColor(
      styles,
      colors?.axisLine,
      CHART_TOKEN_VARIABLES.axisLine,
    ),
    grid: resolveTokenColor(
      styles,
      colors?.grid,
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
    trendUp: resolveTokenColor(
      styles,
      colors?.trendUp,
      TREND_COLOR_VARIABLES.up,
    ),
    trendDown: resolveTokenColor(
      styles,
      colors?.trendDown,
      TREND_COLOR_VARIABLES.down,
    ),
    trendNeutral: resolveTokenColor(
      styles,
      colors?.trendNeutral,
      CHART_TOKEN_VARIABLES.axisText,
    ),
  };
};

/* -------------------------------------------------------------------------- */
/* Dataset helpers                                                             */
/* -------------------------------------------------------------------------- */

const getAppearanceTension = (
  appearance: BarLineChartAppearance,
): number =>
  appearance === 'basic'
    ? BAR_LINE_CHART_CONFIG.basicTension
    : BAR_LINE_CHART_CONFIG.smoothTension;

const getDatasetColor = (
  dataset: BarLineChartDataset,
  index: number,
  colors: BarLineChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) {
    return resolveColor(styles, dataset.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[BarLineChart] At least one series color is required.');
  }

  return color;
};

const getTrendPointColors = (
  values: readonly number[],
  colors: BarLineChartResolvedColors,
): string[] =>
  values.map((value, index) => {
    if (index === 0) {
      return colors.trendNeutral;
    }

    const previousValue = values[index - 1] ?? value;

    if (value > previousValue) {
      return colors.trendUp;
    }

    if (value < previousValue) {
      return colors.trendDown;
    }

    return colors.trendNeutral;
  });

const getReferenceBarValues = (
  data: readonly BarLineChartDataset[],
): readonly number[] | undefined =>
  data.find(({ type }) => type === 'bar')?.data;

const getLineRenderValues = (
  dataset: BarLineChartDataset,
  barValues: readonly number[] | undefined,
  alignLineToBars: boolean,
): number[] => {
  if (!alignLineToBars || !barValues) {
    return Array.from(dataset.data);
  }

  return dataset.data.map(
    (lineValue, index) => barValues[index] ?? lineValue,
  );
};

/* -------------------------------------------------------------------------- */
/* Dataset creation                                                            */
/* -------------------------------------------------------------------------- */

const createLineDataset = ({
  dataset,
  color,
  showTrendPoints,
  renderValues,
  appearance,
  colors,
}: {
  readonly dataset: BarLineChartDataset;
  readonly color: string;
  readonly showTrendPoints: boolean;
  readonly renderValues: number[];
  readonly appearance: BarLineChartAppearance;
  readonly colors: BarLineChartResolvedColors;
}): ChartJSDataset => {
  const pointColors = showTrendPoints
    ? getTrendPointColors(renderValues, colors)
    : color;

  return {
    type: 'line',
    label: dataset.label,
    data: renderValues,
    ...(dataset.yAxisID ? { yAxisID: dataset.yAxisID } : {}),
    order: 0,
    backgroundColor: 'transparent',
    borderColor: color,
    borderWidth:
      dataset.borderWidth ?? BAR_LINE_CHART_CONFIG.lineBorderWidth,
    fill: false,
    tension: dataset.tension ?? getAppearanceTension(appearance),
    spanGaps: true,
    pointRadius:
      dataset.pointRadius ?? BAR_LINE_CHART_CONFIG.pointRadius,
    pointHoverRadius:
      dataset.pointHoverRadius ?? BAR_LINE_CHART_CONFIG.pointHoverRadius,
    pointBackgroundColor: pointColors,
    pointBorderColor: pointColors,
    pointBorderWidth: 0,
    pointHoverBackgroundColor: pointColors,
    pointHoverBorderColor: pointColors,
    pointHoverBorderWidth: 0,
  } as ChartJSDataset;
};

const createBarDataset = ({
  dataset,
  color,
  barWidth,
}: {
  readonly dataset: BarLineChartDataset;
  readonly color: string;
  readonly barWidth: number;
}): ChartJSDataset => {
  const resolvedBarWidth = dataset.barWidth ?? barWidth;

  return {
    type: 'bar',
    label: dataset.label,
    data: Array.from(dataset.data),
    ...(dataset.yAxisID ? { yAxisID: dataset.yAxisID } : {}),
    order: 1,
    backgroundColor: color,
    borderColor: color,
    borderWidth:
      dataset.borderWidth ?? BAR_LINE_CHART_CONFIG.barBorderWidth,
    borderRadius:
      dataset.borderRadius ?? BAR_LINE_CHART_CONFIG.barBorderRadius,
    borderSkipped: false,
    barThickness: resolvedBarWidth,
    maxBarThickness: resolvedBarWidth,
    pointRadius: 0,
  } as ChartJSDataset;
};

/* -------------------------------------------------------------------------- */
/* Chart data                                                                  */
/* -------------------------------------------------------------------------- */

export const createBarLineChartData = ({
  labels,
  data,
  colors,
  rootElement,
  appearance,
  showTrendPoints,
  barWidth,
  alignLineToBars,
}: {
  readonly labels: string[];
  readonly data: BarLineChartDataset[];
  readonly colors: BarLineChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly appearance: BarLineChartAppearance;
  readonly showTrendPoints: boolean;
  readonly barWidth: number;
  readonly alignLineToBars: boolean;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);
  const barValues = getReferenceBarValues(data);

  const datasets = data.map<ChartJSDataset>((dataset, index) => {
    const color = getDatasetColor(dataset, index, colors, styles);

    if (dataset.type === 'line') {
      return createLineDataset({
        dataset,
        color,
        showTrendPoints,
        renderValues: getLineRenderValues(
          dataset,
          barValues,
          alignLineToBars,
        ),
        appearance,
        colors,
      });
    }

    return createBarDataset({
      dataset,
      color,
      barWidth,
    });
  });

  return {
    labels: Array.from(labels),
    datasets,
  };
};

/* -------------------------------------------------------------------------- */
/* Tooltip                                                                     */
/* -------------------------------------------------------------------------- */

const getTooltipLabel = (
  context: TooltipItem<'bar' | 'line'>,
): string => {
  const label = context.dataset.label ?? 'Dataset';

  const parsedValue =
    typeof context.parsed.y === 'number'
      ? context.parsed.y
      : context.parsed.x;

  const value = typeof parsedValue === 'number' ? parsedValue : 0;

  return `${label}: ${value.toLocaleString()}`;
};

/* -------------------------------------------------------------------------- */
/* Chart options                                                               */
/* -------------------------------------------------------------------------- */

export const createBarLineChartOptions = ({
  options,
  colors,
}: {
  readonly options?: BarLineChartOptions;
  readonly colors: BarLineChartResolvedColors;
}): ChartJSOptions => {
  const scales = getNestedRecord(options, 'scales');
  const xScale = getNestedRecord(scales, 'x');
  const yScale = getNestedRecord(scales, 'y');

  const plugins = getNestedRecord(options, 'plugins');
  const legend = getNestedRecord(plugins, 'legend');
  const legendLabels = getNestedRecord(legend, 'labels');
  const tooltip = getNestedRecord(plugins, 'tooltip');
  const tooltipCallbacks = getNestedRecord(tooltip, 'callbacks');

  const interaction = getNestedRecord(options, 'interaction');
  const layout = getNestedRecord(options, 'layout');
  const layoutPadding = getNestedRecord(layout, 'padding');

  const xGrid = getNestedRecord(xScale, 'grid');
  const xBorder = getNestedRecord(xScale, 'border');
  const xTicks = getNestedRecord(xScale, 'ticks');

  const yGrid = getNestedRecord(yScale, 'grid');
  const yBorder = getNestedRecord(yScale, 'border');
  const yTicks = getNestedRecord(yScale, 'ticks');

  const crosshair = getNestedRecord(plugins, 'crosshair');
  const candlestickCrosshair = getNestedRecord(
    plugins,
    'candlestickCrosshair',
  );
  const datalabels = getNestedRecord(plugins, 'datalabels');

  const crosshairEnabled = options?.crosshair ?? false;

  return {
    ...options,
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      ...layout,
      padding: {
        bottom: BAR_LINE_CHART_CONFIG.chartBottomPadding,
        ...layoutPadding,
      },
    },

    interaction: {
      mode: 'index',
      intersect: false,
      axis: 'x',
      ...interaction,
    },

    plugins: {
      ...plugins,

      crosshair: {
        enabled: crosshairEnabled,
        ...crosshair,
      },

      candlestickCrosshair: {
        enabled: crosshairEnabled,
        ...candlestickCrosshair,
      },

      legend: {
        display: options?.showLegend ?? true,
        position: 'top',
        align: 'center',
        ...legend,
        labels: {
          color: colors.axisText,
          font: {
            weight: options?.boldLegends ? 'bold' : 'normal',
          },
          ...legendLabels,
        },
      },

      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        position: 'nearest',
        caretPadding: BAR_LINE_CHART_CONFIG.tooltipCaretPadding,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltip,
        callbacks: {
          label: getTooltipLabel,
          ...tooltipCallbacks,
        },
      },

      datalabels: {
        display: false,
        ...datalabels,
      },
    },

    scales: {
      ...scales,

      x: {
        ...xScale,
        display: true,
        offset: true,

        grid: {
          display: false,
          color: colors.grid,
          ...xGrid,
        },

        border: {
          color: colors.axisLine,
          ...xBorder,
        },

        ticks: {
          display: true,
          color: colors.axisText,
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          padding: BAR_LINE_CHART_CONFIG.xTickPadding,
          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
          },
          ...xTicks,
        },
      },

      y: {
        ...yScale,
        display: true,
        beginAtZero: true,

        grid: {
          color: colors.grid,
          ...yGrid,
        },

        border: {
          color: colors.axisLine,
          ...yBorder,
        },

        ticks: {
          display: true,
          color: colors.axisText,
          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
          },
          ...yTicks,
        },
      },
    },

    onClick: options?.['onClick'],
  };
};