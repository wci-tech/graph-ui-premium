import type { TooltipItem } from 'chart.js';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  BarChartColors,
  BarChartDataset,
  BarChartOptions,
  BarChartResolvedColors,
} from '../BarChart.types';

import { BAR_CHART_CONFIG } from './BaseBarChart.constants';

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value);

const getRecordConfig = (
  source: Record<string, unknown> | undefined,
  key: string,
): Record<string, unknown> => {
  const value = source?.[key];

  return isRecord(value) ? value : {};
};

/**
 * Reads a required CSS custom property from the chart element.
 */
const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles
    .getPropertyValue(variableName)
    .trim();

  if (!value) {
    throw new Error(
      `[BarChart] Missing required CSS variable "${variableName}".`,
    );
  }

  return value;
};

/**
 * Resolves a color before passing it to Chart.js.
 *
 * Canvas APIs cannot understand CSS var() expressions directly,
 * therefore CSS variables are converted to their computed values.
 */
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
    `[BarChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
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

/**
 * Resolves all chart-level colors.
 *
 * Precedence:
 * consumer colors prop -> WCI root chart tokens.
 */
export const resolveBarChartColors = (
  element: HTMLElement,
  colors?: BarChartColors,
): BarChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series &&
      colors.series.length > 0
      ? colors.series.map((color) =>
        resolveColor(styles, color),
      )
      : resolveDefaultSeriesColors(styles);

  return {
    series,

    axisText: colors?.axisText
      ? resolveColor(
        styles,
        colors.axisText,
      )
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.axisText,
        ),
      ),

    axisLine: colors?.axisLine
      ? resolveColor(
        styles,
        colors.axisLine,
      )
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.axisLine,
        ),
      ),

    grid: colors?.grid
      ? resolveColor(
        styles,
        colors.grid,
      )
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

/**
 * Resolves the dataset bar color.
 *
 * Precedence:
 * dataset.color -> resolved automatic series palette.
 */
const getSeriesColor = (
  dataset: BarChartDataset,
  index: number,
  colors: BarChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) {
    return resolveColor(
      styles,
      dataset.color,
    );
  }

  const color =
    colors.series[
    index % colors.series.length
    ];

  if (!color) {
    throw new Error(
      '[BarChart] At least one series color is required.',
    );
  }

  return resolveColor(
    styles,
    color,
  );
};

/**
 * Creates the final Chart.js BarChart dataset configuration.
 *
 * All CSS variables are resolved before colors reach the canvas.
 */
export const createBarChartData = ({
  labels,
  data,
  colors,
  rootElement,
  options,
}: {
  readonly labels: string[];
  readonly data: BarChartDataset[];
  readonly colors: BarChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly options?: BarChartOptions;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);

  return {
    labels,

    datasets: data.map<ChartJSDataset>(
      (dataset, index) => {
        const barColor = getSeriesColor(
          dataset,
          index,
          colors,
          styles,
        );

        const barWidth =
          dataset.barWidth ??
          options?.barWidth ??
          BAR_CHART_CONFIG.barWidth;

        return {
          ...dataset,

          backgroundColor: barColor,

          borderColor: barColor,

          borderWidth:
            dataset.borderWidth ??
            BAR_CHART_CONFIG.borderWidth,

          borderRadius:
            dataset.borderRadius ??
            BAR_CHART_CONFIG.borderRadius,

          borderSkipped: false,

          barThickness: barWidth,

          maxBarThickness:
            dataset.maxBarWidth ??
            barWidth,

          categoryPercentage:
            dataset.categoryPercentage ??
            options?.categoryPercentage ??
            BAR_CHART_CONFIG.categoryPercentage,

          barPercentage:
            dataset.barPercentage ??
            options?.barPercentage ??
            BAR_CHART_CONFIG.barPercentage,
        };
      },
    ),
  };
};

/**
 * Creates the final Chart.js options.
 *
 * Precedence:
 * WCI root tokens -> colors prop -> direct Chart.js options.
 */
export const createBarChartOptions = ({
  options,
  colors,
}: {
  readonly options?: BarChartOptions;
  readonly colors: BarChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options)
    ? options
    : undefined;

  const scalesConfig = getRecordConfig(
    optionRecord,
    'scales',
  );

  const xScaleConfig = getRecordConfig(
    scalesConfig,
    'x',
  );

  const yScaleConfig = getRecordConfig(
    scalesConfig,
    'y',
  );

  const xGridConfig = getRecordConfig(
    xScaleConfig,
    'grid',
  );

  const yGridConfig = getRecordConfig(
    yScaleConfig,
    'grid',
  );

  const xBorderConfig = getRecordConfig(
    xScaleConfig,
    'border',
  );

  const yBorderConfig = getRecordConfig(
    yScaleConfig,
    'border',
  );

  const xTicksConfig = getRecordConfig(
    xScaleConfig,
    'ticks',
  );

  const yTicksConfig = getRecordConfig(
    yScaleConfig,
    'ticks',
  );

  const pluginOptions = getRecordConfig(
    optionRecord,
    'plugins',
  );

  const legendConfig = getRecordConfig(
    pluginOptions,
    'legend',
  );

  const legendLabelsConfig =
    getRecordConfig(
      legendConfig,
      'labels',
    );

  const tooltipConfig = getRecordConfig(
    pluginOptions,
    'tooltip',
  );

  const tooltipCallbacksConfig =
    getRecordConfig(
      tooltipConfig,
      'callbacks',
    );

  const datalabelsConfig =
    getRecordConfig(
      pluginOptions,
      'datalabels',
    );

  const crosshairConfig = getRecordConfig(
    pluginOptions,
    'crosshair',
  );

  const candlestickCrosshairConfig =
    getRecordConfig(
      pluginOptions,
      'candlestickCrosshair',
    );

  const interactionConfig =
    getRecordConfig(
      optionRecord,
      'interaction',
    );

  const crosshairEnabled =
    options?.crosshair ?? false;

  return {
    ...options,

    indexAxis: options?.horizontal
      ? 'y'
      : 'x',

    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: 'nearest',

      intersect: true,

      ...interactionConfig,
    },

    scales: {
      ...scalesConfig,

      x: {
        ...xScaleConfig,

        grid: {
          color: colors.grid,

          drawBorder: false,

          ...xGridConfig,
        },

        border: {
          color: colors.axisLine,

          ...xBorderConfig,
        },

        ticks: {
          color: colors.axisText,

          font: {
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
          },

          ...xTicksConfig,
        },
      },

      y: {
        ...yScaleConfig,

        beginAtZero: true,

        grid: {
          color: colors.grid,

          drawBorder: false,

          ...yGridConfig,
        },

        border: {
          color: colors.axisLine,

          ...yBorderConfig,
        },

        ticks: {
          color: colors.axisText,

          font: {
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
          },

          ...yTicksConfig,
        },
      },
    },

    plugins: {
      ...pluginOptions,

      crosshair: {
        enabled: crosshairEnabled,

        ...crosshairConfig,
      },

      candlestickCrosshair: {
        enabled: crosshairEnabled,

        ...candlestickCrosshairConfig,
      },

      legend: {
        display:
          options?.showLegend ?? true,

        position: 'top',

        align: 'center',

        ...legendConfig,

        labels: {
          usePointStyle: false,

          boxWidth:
            BAR_CHART_CONFIG.legendBoxWidth,

          boxHeight:
            BAR_CHART_CONFIG.legendBoxHeight,

          padding:
            BAR_CHART_CONFIG.legendPadding,

          color: colors.axisText,

          font: {
            weight: options?.boldLegends
              ? 'bold'
              : 'normal',
          },

          ...legendLabelsConfig,
        },
      },

      tooltip: {
        mode: 'nearest',

        intersect: true,

        position: 'nearest',

        caretPadding:
          BAR_CHART_CONFIG.tooltipCaretPadding,

        backgroundColor:
          colors.tooltipBackground,

        titleColor:
          colors.tooltipText,

        bodyColor:
          colors.tooltipText,

        borderColor:
          colors.tooltipBorder,

        ...tooltipConfig,

        callbacks: {
          label: (
            context: TooltipItem<'bar'>,
          ) => {
            const datasetLabel =
              context.dataset.label ??
              'Dataset';

            const value =
              options?.horizontal
                ? context.parsed.x
                : context.parsed.y;

            return `${datasetLabel}: ${value}`;
          },

          ...tooltipCallbacksConfig,
        },
      },

      datalabels: {
        display: false,

        color: colors.axisText,

        ...datalabelsConfig,
      },
    },

    onClick: options?.['onClick'],
  };
};