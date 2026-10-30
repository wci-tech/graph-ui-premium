import type { TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  RadarChartColors,
  RadarChartDataset,
  RadarChartOptions,
  RadarChartResolvedColors,
} from '../RadarChart.types';

import { RADAR_CHART_CONFIG } from './BaseRadarChart.constants';

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
    throw new Error(`[RadarChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

/**
 * Resolves CSS variables before passing colors to Chart.js Canvas.
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

  throw new Error(`[RadarChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

/**
 * Resolves all Radar Chart colors.
 *
 * Precedence:
 * consumer colors prop -> WCI chart tokens.
 */
export const resolveRadarChartColors = (
  element: HTMLElement,
  colors?: RadarChartColors,
): RadarChartResolvedColors => {
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

const getSeriesColor = (
  dataset: RadarChartDataset,
  index: number,
  colors: RadarChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) return resolveColor(styles, dataset.color);

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[RadarChart] At least one series color is required.');
  }

  return resolveColor(styles, color);
};

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

/**
 * Creates the final Chart.js Radar datasets.
 */
export const createRadarChartData = ({
  labels,
  data,
  colors,
  rootElement,
}: {
  readonly labels: string[];
  readonly data: RadarChartDataset[];
  readonly colors: RadarChartResolvedColors;
  readonly rootElement: HTMLElement;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);

  return {
    labels,
    datasets: data.map<ChartJSDataset>((dataset, index) => {
      const seriesColor = getSeriesColor(dataset, index, colors, styles);
      const pointColor = dataset.pointColor
        ? resolveColor(styles, dataset.pointColor)
        : seriesColor;

      return {
        ...dataset,
        data: Array.from(dataset.data),
        backgroundColor: getAlphaColor(seriesColor, RADAR_CHART_CONFIG.backgroundOpacity),
        borderColor: seriesColor,
        borderWidth: dataset.borderWidth ?? RADAR_CHART_CONFIG.borderWidth,
        pointBackgroundColor: pointColor,
        pointBorderColor: pointColor,
        pointBorderWidth: RADAR_CHART_CONFIG.pointBorderWidth,
        pointHoverBackgroundColor: pointColor,
        pointHoverBorderColor: pointColor,
        pointHoverBorderWidth: RADAR_CHART_CONFIG.pointHoverBorderWidth,
        pointRadius: dataset.pointRadius ?? RADAR_CHART_CONFIG.pointRadius,
        pointHoverRadius: dataset.pointHoverRadius ?? RADAR_CHART_CONFIG.pointHoverRadius,
      };
    }),
  };
};

/**
 * Creates the final Chart.js Radar options.
 *
 * Radar uses only the radial scale. Cartesian axis lines are hidden.
 */
export const createRadarChartOptions = ({
  options,
  colors,
}: {
  readonly options?: RadarChartOptions;
  readonly colors: RadarChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;

  const scalesConfig = getRecordConfig(optionRecord, 'scales');
  const rScaleConfig = getRecordConfig(scalesConfig, 'r');
  const angleLinesConfig = getRecordConfig(rScaleConfig, 'angleLines');
  const gridConfig = getRecordConfig(rScaleConfig, 'grid');
  const pointLabelsConfig = getRecordConfig(rScaleConfig, 'pointLabels');
  const pointLabelsFontConfig = getRecordConfig(pointLabelsConfig, 'font');
  const ticksConfig = getRecordConfig(rScaleConfig, 'ticks');

  const pluginOptions = getRecordConfig(optionRecord, 'plugins');
  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');
  const legendLabelsFontConfig = getRecordConfig(legendLabelsConfig, 'font');
  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');
  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const crosshairConfig = getRecordConfig(pluginOptions, 'crosshair');
  const candlestickCrosshairConfig = getRecordConfig(pluginOptions, 'candlestickCrosshair');
  const interactionConfig = getRecordConfig(optionRecord, 'interaction');

  const crosshairEnabled = options?.crosshair ?? false;

  const {
    crosshair: _crosshair,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    showLegend: _showLegend,
    plugins: _plugins,
    scales: _scales,
    interaction: _interaction,
    ...remainingOptions
  } = options ?? {};

  return {
    ...remainingOptions,
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: true,
      axis: 'xy',
      ...interactionConfig,
    },
    scales: {
      ...scalesConfig,
      r: {
        ...rScaleConfig,
        angleLines: {
          display: false,
          color: colors.axisLine,
          ...angleLinesConfig,
        },
        grid: {
          display: true,
          color: colors.grid,
          ...gridConfig,
        },
        pointLabels: {
          color: colors.axisText,
          ...pointLabelsConfig,
          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
            ...pointLabelsFontConfig,
          },
        },
        ticks: {
          color: colors.axisText,
          backdropColor: 'transparent',
          ...ticksConfig,
        },
        border: {
          display: false,
        },
      },
      x: {
        display: false,
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
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
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      ...pluginOptions,
      crosshair: {
        enabled: crosshairEnabled,
        color: colors.axisLine,
        ...crosshairConfig,
      },
      candlestickCrosshair: {
        enabled: crosshairEnabled,
        color: colors.axisLine,
        ...candlestickCrosshairConfig,
      },
      legend: {
        display: options?.showLegend ?? true,
        position: 'bottom',
        ...legendConfig,
        labels: {
          color: colors.axisText,
          ...legendLabelsConfig,
          font: {
            weight: options?.boldLegends ? 'bold' : 'normal',
            ...legendLabelsFontConfig,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: true,
        position: 'nearest',
        caretPadding: RADAR_CHART_CONFIG.tooltipCaretPadding,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltipConfig,
        callbacks: {
          label: (context: TooltipItem<'radar'>) => {
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
    onClick: options?.onClick,
  };
};