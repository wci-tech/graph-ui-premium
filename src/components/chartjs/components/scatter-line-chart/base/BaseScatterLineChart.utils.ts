import type { TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  ScatterLineChartAppearance,
  ScatterLineChartColors,
  ScatterLineChartDataset,
  ScatterLineChartOptions,
  ScatterLineChartResolvedColors,
} from '../ScatterLineChart.types';

import { SCATTER_LINE_CHART_CONFIG } from './BaseScatterLineChart.constants';

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

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[ScatterLineChart] CSS variable "${variableName}" is not defined.`);
  }

  return value;
};

const resolveColor = (
  styles: CSSStyleDeclaration,
  color: string,
): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(CSS_VARIABLE_PATTERN);

  if (!match) return normalizedColor;

  const variableName = match[1];

  if (!variableName) return normalizedColor;

  const resolvedColor = styles.getPropertyValue(variableName).trim();

  if (resolvedColor) return resolveColor(styles, resolvedColor);

  const fallback = match[2]?.trim();

  if (fallback) return resolveColor(styles, fallback);

  throw new Error(
    `[ScatterLineChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

/**
 * Resolves Scatter Line chart colors.
 *
 * Precedence:
 * consumer colors prop -> shared WCI chart tokens.
 */
export const resolveScatterLineChartColors = (
  element: HTMLElement,
  colors?: ScatterLineChartColors,
): ScatterLineChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText),
      ),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
      ),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.grid),
      ),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveColor(
        styles,
        resolveCssVariable(
          styles,
          CHART_TOKEN_VARIABLES.tooltipBackground,
        ),
      ),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText),
      ),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder),
      ),
  };
};

/**
 * Resolves a dataset series color.
 *
 * Precedence:
 * dataset color -> shared resolved series palette.
 */
const getSeriesColor = (
  dataset: ScatterLineChartDataset,
  index: number,
  colors: ScatterLineChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) return resolveColor(styles, dataset.color);

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[ScatterLineChart] At least one series color is required.');
  }

  return resolveColor(styles, color);
};

/**
 * Creates the final Chart.js Scatter Line datasets.
 */
export const createScatterLineChartData = ({
  data,
  colors,
  rootElement,
  appearance,
  options,
}: {
  readonly data: ScatterLineChartDataset[];
  readonly colors: ScatterLineChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly appearance: ScatterLineChartAppearance;
  readonly options?: ScatterLineChartOptions;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);
  const appearanceTension =
    appearance === 'basic'
      ? SCATTER_LINE_CHART_CONFIG.basicTension
      : SCATTER_LINE_CHART_CONFIG.smoothTension;

  return {
    datasets: data.map<ChartJSDataset>((dataset, index) => {
      const lineColor = getSeriesColor(dataset, index, colors, styles);
      const pointColor = dataset.pointColor
        ? resolveColor(styles, dataset.pointColor)
        : lineColor;

      return {
        label: dataset.label,
        data: Array.from(dataset.data),
        type: 'scatter',
        showLine: true,
        fill: false,
        backgroundColor: pointColor,
        pointBackgroundColor: pointColor,
        pointBorderColor: pointColor,
        pointHoverBackgroundColor: pointColor,
        pointHoverBorderColor: pointColor,
        borderColor: lineColor,
        borderWidth:
          dataset.borderWidth ??
          options?.borderWidth ??
          SCATTER_LINE_CHART_CONFIG.borderWidth,
        tension: dataset.tension ?? appearanceTension,
        cubicInterpolationMode:
          appearance === 'smooth' ? 'monotone' : 'default',
        stepped: false,
        pointRadius:
          dataset.pointRadius ??
          options?.pointRadius ??
          SCATTER_LINE_CHART_CONFIG.pointRadius,
        pointHoverRadius:
          dataset.pointHoverRadius ??
          options?.pointHoverRadius ??
          SCATTER_LINE_CHART_CONFIG.pointHoverRadius,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        pointStyle: dataset.pointStyle ?? options?.pointStyle ?? 'circle',
      };
    }),
  };
};

/**
 * Creates the final Chart.js Scatter Line options.
 *
 * Precedence:
 * WCI root tokens -> colors prop -> direct Chart.js options.
 */
export const createScatterLineChartOptions = ({
  options,
  colors,
}: {
  readonly options?: ScatterLineChartOptions;
  readonly colors: ScatterLineChartResolvedColors;
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

  const candlestickCrosshairConfig = getRecordConfig(
    pluginOptions,
    'candlestickCrosshair',
  );

  const interactionConfig = getRecordConfig(optionRecord, 'interaction');

  const crosshairEnabled = options?.crosshair ?? false;

  return {
    ...options,
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
        type: 'linear',
        position: 'bottom',
        ...xScaleConfig,
        grid: {
          color: colors.grid,
          ...xGridConfig,
        },
        border: {
          color: colors.axisLine,
          ...xBorderConfig,
        },
        ticks: {
          color: colors.axisText,
          ...xTicksConfig,
          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
            ...getRecordConfig(xTicksConfig, 'font'),
          },
        },
      },
      y: {
        type: 'linear',
        ...yScaleConfig,
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
          ...yTicksConfig,
          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
            ...getRecordConfig(yTicksConfig, 'font'),
          },
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
        display: options?.showLegend ?? true,
        position: 'bottom',
        ...legendConfig,
        labels: {
          usePointStyle: true,
          boxWidth: SCATTER_LINE_CHART_CONFIG.legendBoxWidth,
          boxHeight: SCATTER_LINE_CHART_CONFIG.legendBoxHeight,
          pointStyleWidth: SCATTER_LINE_CHART_CONFIG.legendPointStyleWidth,
          padding: SCATTER_LINE_CHART_CONFIG.legendPadding,
          color: colors.axisText,
          ...legendLabelsConfig,
          font: {
            weight: options?.boldLegends ? 'bold' : 'normal',
            ...getRecordConfig(legendLabelsConfig, 'font'),
          },
        },
      },
      tooltip: {
        mode: 'nearest',
        intersect: true,
        position: 'nearest',
        caretPadding: SCATTER_LINE_CHART_CONFIG.tooltipCaretPadding,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltipConfig,
        callbacks: {
          label: (context: TooltipItem<'scatter'>) =>
            `${context.dataset.label ?? 'Dataset'}: (${context.parsed.x}, ${context.parsed.y})`,
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