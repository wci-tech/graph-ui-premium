import type { TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type { ChartJSData, ChartJSOptions } from '@/components/chartjs/ChartJS.types';

import type {
  PieChartColors,
  PieChartOptions,
  PieChartResolvedColors,
} from '../PieChart.types';

import { PIE_CHART_CONFIG } from './BasePieChart.constants';

type PieChartDataset = {
  readonly label: string;
  readonly data: number[];
  readonly backgroundColor: string[];
  readonly borderColor: string[];
  readonly borderWidth: number;
  readonly hoverBorderColor: string;
  readonly hoverBorderWidth: number;
  readonly hoverOffset: number;
};

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
    throw new Error(`[PieChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

/**
 * Resolves a color before passing it to Chart.js.
 *
 * Canvas APIs cannot understand CSS var() expressions directly,
 * therefore CSS variables are converted to their computed values.
 */
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

  throw new Error(`[PieChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

/**
 * Resolves all Pie Chart colors.
 *
 * Precedence:
 * consumer colors prop -> WCI root chart tokens.
 */
export const resolvePieChartColors = (
  element: HTMLElement,
  colors?: PieChartColors,
): PieChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  const axisText = resolveColor(
    styles,
    resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText),
  );

  const axisLine = resolveColor(
    styles,
    resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
  );

  return {
    series,
    label: colors?.label ? resolveColor(styles, colors.label) : axisText,
    border: colors?.border ? resolveColor(styles, colors.border) : axisLine,
    crosshair: colors?.crosshair ? resolveColor(styles, colors.crosshair) : axisLine,
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

const getSeriesColor = (colors: PieChartResolvedColors, index: number): string => {
  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[PieChart] At least one series color is required.');
  }

  return color;
};

const hiddenScales = {
  x: {
    display: false,
    grid: {
      display: false,
      drawOnChartArea: false,
      drawTicks: false,
    },
    ticks: {
      display: false,
    },
    border: {
      display: false,
    },
  },
  y: {
    display: false,
    grid: {
      display: false,
      drawOnChartArea: false,
      drawTicks: false,
    },
    ticks: {
      display: false,
    },
    border: {
      display: false,
    },
  },
};

/**
 * Creates the final Chart.js Pie Chart dataset.
 */
export const createPieChartData = ({
  labels,
  data,
  colors,
}: {
  readonly labels: string[];
  readonly data: number[];
  readonly colors: PieChartResolvedColors;
}): ChartJSData => {
  const backgroundColor = data.map((_, index) => getSeriesColor(colors, index));

  const dataset: PieChartDataset = {
    label: 'Pie',
    data,
    backgroundColor,
    borderColor: data.map(() => colors.border),
    borderWidth: PIE_CHART_CONFIG.borderWidth,
    hoverBorderColor: colors.border,
    hoverBorderWidth: PIE_CHART_CONFIG.borderWidth,
    hoverOffset: PIE_CHART_CONFIG.hoverOffset,
  };

  return {
    labels,
    datasets: [dataset],
  } as unknown as ChartJSData;
};

/**
 * Creates the final Chart.js Pie Chart options.
 *
 * Precedence:
 * WCI root tokens -> colors prop -> direct Chart.js options.
 */
export const createPieChartOptions = ({
  options,
  colors,
}: {
  readonly options?: PieChartOptions;
  readonly colors: PieChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;

  const pluginOptions = getRecordConfig(optionRecord, 'plugins');

  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');
  const legendFontConfig = getRecordConfig(legendLabelsConfig, 'font');

  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');

  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const datalabelsFontConfig = getRecordConfig(datalabelsConfig, 'font');

  const crosshairConfig = getRecordConfig(pluginOptions, 'crosshair');
  const candlestickCrosshairConfig = getRecordConfig(pluginOptions, 'candlestickCrosshair');

  const animationConfig = getRecordConfig(optionRecord, 'animation');
  const layoutConfig = getRecordConfig(optionRecord, 'layout');
  const hoverConfig = getRecordConfig(optionRecord, 'hover');

  const crosshairEnabled = options?.crosshair ?? false;

  const {
    crosshair: _crosshair,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    isBoxVisible: _isBoxVisible,
    chartBackground: _chartBackground,
    plugins: _plugins,
    animation: _animation,
    layout: _layout,
    hover: _hover,
    ...chartOptions
  } = options ?? {};

  return {
    ...chartOptions,
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: PIE_CHART_CONFIG.layoutPadding,
      ...layoutConfig,
    },

    hover: {
      mode: 'nearest',
      intersect: true,
      ...hoverConfig,
    },

    animation: {
      duration: PIE_CHART_CONFIG.animationDuration,
      animateRotate: true,
      animateScale: true,
      ...animationConfig,
    },

    plugins: {
      ...pluginOptions,

      crosshair: {
        enabled: crosshairEnabled,
        color: colors.crosshair,
        ...crosshairConfig,
      },

      candlestickCrosshair: {
        enabled: crosshairEnabled,
        color: colors.crosshair,
        ...candlestickCrosshairConfig,
      },

      legend: {
        display: true,
        position: 'bottom',
        ...legendConfig,
        labels: {
          color: colors.label,
          boxWidth: PIE_CHART_CONFIG.legendBoxWidth,
          boxHeight: PIE_CHART_CONFIG.legendBoxHeight,
          padding: PIE_CHART_CONFIG.legendPadding,
          ...legendLabelsConfig,
          font: {
            weight: options?.boldLegends ? 'bold' : 'normal',
            ...legendFontConfig,
          },
        },
      },

      tooltip: {
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        ...tooltipConfig,
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || 'Value';

            return `${label}: ${context.formattedValue}`;
          },
          ...tooltipCallbacksConfig,
        },
      },

      datalabels: {
        display: true,
        color: colors.label,
        anchor: 'center',
        align: 'center',
        clamp: true,
        clip: false,
        formatter: (value: unknown) => {
          const numericValue = typeof value === 'number' ? value : Number(value);

          if (!Number.isFinite(numericValue)) return '';

          return `${numericValue}%`;
        },
        ...datalabelsConfig,
        font: {
          size: PIE_CHART_CONFIG.labelFontSize,
          weight: options?.boldLabels ? 'bold' : 'normal',
          ...datalabelsFontConfig,
        },
      },
    },

    /**
     * Pie charts should never inherit shared Cartesian scales.
     */
    scales: hiddenScales,

    onClick: options?.onClick,
  } as unknown as ChartJSOptions;
};