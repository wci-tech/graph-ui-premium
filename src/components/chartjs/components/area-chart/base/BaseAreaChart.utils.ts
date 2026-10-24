import type { ScriptableContext, TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  AreaChartAppearance,
  AreaChartColors,
  AreaChartDataset,
  AreaChartOptions,
} from '../AreaChart.types';

import { AREA_CHART_CONFIG } from './BaseAreaChart.constants';



export interface AreaChartResolvedColors {
  readonly series: readonly string[];
  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;
  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

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
const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[AreaChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

/**
 * Resolves a color before passing it to Chart.js.
 *
 * Canvas APIs cannot understand CSS var() expressions directly,
 * therefore CSS variables are converted to their computed values.
 *
 * Supported examples:
 * - #F5456E
 * - rgb(245, 69, 110)
 * - rgba(245, 69, 110, 0.5)
 * - hsl(...)
 * - red
 * - var(--wci-chart-red)
 * - var(--custom-color, #F5456E)
 */
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

  throw new Error(`[AreaChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

/**
 * Resolves all chart-level colors.
 *
 * Precedence:
 * consumer colors prop -> WCI root chart tokens.
 */
export const resolveAreaChartColors = (
  element: HTMLElement,
  colors?: AreaChartColors,
): AreaChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,

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

/**
 * Resolves the dataset line color.
 *
 * Precedence:
 * dataset.color -> resolved automatic series palette.
 */
const getSeriesColor = (
  dataset: AreaChartDataset,
  index: number,
  colors: AreaChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) {
    return resolveColor(styles, dataset.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[AreaChart] At least one series color is required.');
  }

  return resolveColor(styles, color);
};

/**
 * Applies alpha transparency to a resolved color.
 *
 * Chart root variables currently resolve to hexadecimal colors,
 * while rgb/rgba are also supported for consumer overrides.
 */
const getAlphaColor = (color: string, alpha: number): string => {
  const normalizedColor = color.trim();

  if (/^#[0-9a-fA-F]{6}$/.test(normalizedColor)) {
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0');

    return `${normalizedColor}${alphaHex}`;
  }

  if (/^#[0-9a-fA-F]{8}$/.test(normalizedColor)) {
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0');

    return `${normalizedColor.slice(0, 7)}${alphaHex}`;
  }

  if (normalizedColor.startsWith('rgb(')) {
    return normalizedColor.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }

  if (normalizedColor.startsWith('rgba(')) {
    return normalizedColor.replace(/rgba\((.+),\s*[\d.]+\)/, `rgba($1, ${alpha})`);
  }

  return normalizedColor;
};

export const createAreaGradient = (
  context: ScriptableContext<'line'>,
  color: string,
): CanvasGradient | string => {
  const { chart } = context;
  const { ctx, chartArea } = chart;

  if (!chartArea) {
    return color;
  }

  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

  gradient.addColorStop(0, getAlphaColor(color, AREA_CHART_CONFIG.gradientStartOpacity));

  gradient.addColorStop(1, getAlphaColor(color, AREA_CHART_CONFIG.gradientEndOpacity));

  return gradient;
};

/**
 * Creates the final Chart.js dataset configuration.
 *
 * All CSS variables are resolved before colors reach the canvas.
 */
export const createAreaChartData = ({
  labels,
  data,
  colors,
  rootElement,
  appearance,
}: {
  readonly labels: string[];
  readonly data: AreaChartDataset[];
  readonly colors: AreaChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly appearance: AreaChartAppearance;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);

  const defaultTension =
    appearance === 'basic' ? AREA_CHART_CONFIG.basicTension : AREA_CHART_CONFIG.smoothTension;

  return {
    labels,

    datasets: data.map<ChartJSDataset>((dataset, index) => {
      const lineColor = getSeriesColor(dataset, index, colors, styles);

      const pointColor = dataset.pointColor ? resolveColor(styles, dataset.pointColor) : lineColor;

      return {
        ...dataset,

        borderColor: lineColor,

        backgroundColor: (context: ScriptableContext<'line'>) =>
          createAreaGradient(context, lineColor),

        borderWidth: dataset.borderWidth ?? AREA_CHART_CONFIG.borderWidth,

        pointRadius: dataset.pointRadius ?? AREA_CHART_CONFIG.pointRadius,

        pointHoverRadius: dataset.pointHoverRadius ?? AREA_CHART_CONFIG.pointHoverRadius,

        pointBackgroundColor: pointColor,
        pointBorderColor: pointColor,
        pointBorderWidth: 0,

        pointHoverBackgroundColor: pointColor,
        pointHoverBorderColor: pointColor,
        pointHoverBorderWidth: 0,

        fill: true,

        tension: dataset.tension ?? defaultTension,
      };
    }),
  };
};

/**
 * Creates the final Chart.js options.
 *
 * Precedence:
 * WCI root tokens -> colors prop -> direct Chart.js options.
 */
export const createAreaChartOptions = ({
  options,
  colors,
}: {
  readonly options?: AreaChartOptions;
  readonly colors: AreaChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;

  const scalesConfig = getRecordConfig(optionRecord, 'scales');

  const xScaleConfig = getRecordConfig(scalesConfig, 'x');
  const yScaleConfig = getRecordConfig(scalesConfig, 'y');

  const xGridConfig = getRecordConfig(xScaleConfig, 'grid');
  const yGridConfig = getRecordConfig(yScaleConfig, 'grid');

  const xBorderConfig = getRecordConfig(xScaleConfig, 'border');
  const yBorderConfig = getRecordConfig(yScaleConfig, 'border');

  const xTicksConfig = getRecordConfig(xScaleConfig, 'ticks');
  const yTicksConfig = getRecordConfig(yScaleConfig, 'ticks');

  const pluginOptions = getRecordConfig(optionRecord, 'plugins');

  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');

  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');

  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');

  const crosshairConfig = getRecordConfig(pluginOptions, 'crosshair');

  const candlestickCrosshairConfig = getRecordConfig(pluginOptions, 'candlestickCrosshair');

  const interactionConfig = getRecordConfig(optionRecord, 'interaction');

  const crosshairEnabled = options?.crosshair ?? false;

  return {
    ...options,

    responsive: true,
    maintainAspectRatio: false,
    fill: true,

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
          display: false,
          ...xGridConfig,
        },

        border: {
          color: colors.axisLine,
          ...xBorderConfig,
        },

        ticks: {
          color: colors.axisText,

          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
          },

          ...xTicksConfig,
        },
      },

      y: {
        ...yScaleConfig,

        beginAtZero: true,

        grid: {
          color: colors.grid,
          ...yGridConfig,
        },

        border: {
          color: colors.axisLine,
          ...yBorderConfig,
        },

        ticks: {
          color: colors.axisText,

          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
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
        display: options?.showLegend ?? false,
        position: 'top',
        align: 'center',

        ...legendConfig,

        labels: {
          color: colors.axisText,
          ...legendLabelsConfig,
        },
      },

      tooltip: {
        mode: 'nearest',
        intersect: true,
        position: 'nearest',

        caretPadding: AREA_CHART_CONFIG.tooltipCaretPadding,

        backgroundColor: colors.tooltipBackground,

        titleColor: colors.tooltipText,

        bodyColor: colors.tooltipText,

        borderColor: colors.tooltipBorder,

        ...tooltipConfig,

        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const datasetLabel = context.dataset.label ?? 'Dataset';

            return `${datasetLabel}: ${context.formattedValue}`;
          },

          ...tooltipCallbacksConfig,
        },
      },

      datalabels: {
        display: false,
        ...datalabelsConfig,
      },
    },

    onClick: options?.['onClick'],
  };
};
