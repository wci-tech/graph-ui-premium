import type { Plugin, TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  ScatterChartColors,
  ScatterChartDataset,
  ScatterChartOptions,
  ScatterChartResolvedColors,
} from '../ScatterChart.types';

import { SCATTER_CHART_CONFIG } from './BaseScatterChart.constants';

type ScatterCrosshairOptions = {
  readonly enabled?: boolean;
  readonly color?: string;
  readonly width?: number;
  readonly dash?: readonly number[];
  readonly showHorizontal?: boolean;
  readonly showVertical?: boolean;
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
 *
 * @param styles - Computed chart styles.
 * @param variableName - CSS variable name.
 * @returns Resolved CSS variable value.
 */
const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[ScatterChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

/**
 * Resolves a CSS color before passing it to the Canvas API.
 *
 * @param styles - Computed chart styles.
 * @param color - Color or CSS variable expression.
 * @returns Resolved color.
 */
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

  if (resolvedColor) {
    return resolveColor(styles, resolvedColor);
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(styles, fallback);
  }

  throw new Error(
    `[ScatterChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

/**
 * Resolves Scatter Chart colors from consumer overrides and shared chart tokens.
 *
 * Precedence:
 * colors prop -> WCI chart tokens.
 *
 * @param element - Scatter Chart root element.
 * @param colors - Optional consumer color overrides.
 * @returns Resolved Canvas-safe colors.
 */
export const resolveScatterChartColors = (
  element: HTMLElement,
  colors?: ScatterChartColors,
): ScatterChartResolvedColors => {
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
 * Resolves the final dataset color.
 *
 * Precedence:
 * dataset.color -> resolved series palette.
 *
 * @param dataset - Scatter dataset.
 * @param index - Dataset index.
 * @param colors - Resolved Scatter colors.
 * @param styles - Computed chart styles.
 * @returns Resolved dataset color.
 */
const getSeriesColor = (
  dataset: ScatterChartDataset,
  index: number,
  colors: ScatterChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) {
    return resolveColor(styles, dataset.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[ScatterChart] At least one series color is required.');
  }

  return resolveColor(styles, color);
};

/**
 * Scatter-specific crosshair plugin.
 */
export const scatterCrosshairPlugin: Plugin<'scatter'> = {
  id: 'scatterCrosshair',

  afterDatasetsDraw: (chart) => {
    const plugins = isRecord(chart.options.plugins)
      ? chart.options.plugins
      : undefined;

    const config = getRecordConfig(
      plugins,
      'scatterCrosshair',
    ) as ScatterCrosshairOptions;

    if (config.enabled !== true) return;

    const activeElement = chart.getActiveElements()[0]?.element;

    if (!activeElement) return;

    const { ctx, chartArea } = chart;
    const crosshairX = activeElement.x;
    const crosshairY = activeElement.y;

    ctx.save();

    ctx.strokeStyle = config.color ?? '';
    ctx.lineWidth = config.width ?? SCATTER_CHART_CONFIG.crosshairWidth;
    ctx.setLineDash([
      ...(config.dash ?? SCATTER_CHART_CONFIG.crosshairDash),
    ]);

    if (config.showHorizontal !== false) {
      ctx.beginPath();
      ctx.moveTo(chartArea.left, crosshairY);
      ctx.lineTo(chartArea.right, crosshairY);
      ctx.stroke();
    }

    if (config.showVertical !== false) {
      ctx.beginPath();
      ctx.moveTo(crosshairX, chartArea.top);
      ctx.lineTo(crosshairX, chartArea.bottom);
      ctx.stroke();
    }

    ctx.restore();
  },
};

/**
 * Creates Chart.js Scatter datasets.
 *
 * @param data - Scatter datasets.
 * @param colors - Resolved chart colors.
 * @param rootElement - Scatter Chart root element.
 * @param options - Scatter Chart options.
 * @returns Chart.js data configuration.
 */
export const createScatterChartData = ({
  data,
  colors,
  rootElement,
  options,
}: {
  readonly data: ScatterChartDataset[];
  readonly colors: ScatterChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly options?: ScatterChartOptions;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);

  return {
    datasets: data.map<ChartJSDataset>((dataset, index) => {
      const color = getSeriesColor(
        dataset,
        index,
        colors,
        styles,
      );

      return {
        label: dataset.label,
        data: Array.from(dataset.data),
        backgroundColor: color,
        borderColor: color,
        pointBackgroundColor: color,
        pointHoverBackgroundColor: color,
        pointBorderColor: color,
        pointHoverBorderColor: color,
        pointBorderWidth: SCATTER_CHART_CONFIG.pointBorderWidth,
        pointHoverBorderWidth:
          SCATTER_CHART_CONFIG.pointHoverBorderWidth,
        pointRadius:
          dataset.pointRadius ??
          options?.pointRadius ??
          SCATTER_CHART_CONFIG.pointRadius,
        pointHoverRadius:
          dataset.pointHoverRadius ??
          options?.pointHoverRadius ??
          SCATTER_CHART_CONFIG.pointHoverRadius,
        pointStyle:
          dataset.pointStyle ??
          options?.pointStyle ??
          'circle',
      };
    }),
  };
};

/**
 * Creates the final Chart.js Scatter options.
 *
 * Precedence:
 * WCI chart tokens -> colors prop -> direct Chart.js options.
 *
 * @param options - Scatter Chart options.
 * @param colors - Resolved chart colors.
 * @returns Chart.js options.
 */
export const createScatterChartOptions = ({
  options,
  colors,
}: {
  readonly options?: ScatterChartOptions;
  readonly colors: ScatterChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;

  const scalesConfig = getRecordConfig(optionRecord, 'scales');

  const xScaleConfig = getRecordConfig(scalesConfig, 'x');
  const yScaleConfig = getRecordConfig(scalesConfig, 'y');

  const xGridConfig = getRecordConfig(xScaleConfig, 'grid');
  const yGridConfig = getRecordConfig(yScaleConfig, 'grid');

  const xTicksConfig = getRecordConfig(xScaleConfig, 'ticks');
  const yTicksConfig = getRecordConfig(yScaleConfig, 'ticks');

  const xTickFontConfig = getRecordConfig(xTicksConfig, 'font');
  const yTickFontConfig = getRecordConfig(yTicksConfig, 'font');

  const xBorderConfig = getRecordConfig(xScaleConfig, 'border');
  const yBorderConfig = getRecordConfig(yScaleConfig, 'border');

  const pluginOptions = getRecordConfig(optionRecord, 'plugins');

  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');
  const legendFontConfig = getRecordConfig(legendLabelsConfig, 'font');

  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const tooltipCallbacksConfig = getRecordConfig(
    tooltipConfig,
    'callbacks',
  );

  const datalabelsConfig = getRecordConfig(
    pluginOptions,
    'datalabels',
  );

  const genericCrosshairConfig = getRecordConfig(
    pluginOptions,
    'crosshair',
  );

  const candlestickCrosshairConfig = getRecordConfig(
    pluginOptions,
    'candlestickCrosshair',
  );

  const lineCrosshairConfig = getRecordConfig(
    pluginOptions,
    'lineCrosshair',
  );

  const scatterCrosshairConfig = getRecordConfig(
    pluginOptions,
    'scatterCrosshair',
  );

  const interactionConfig = getRecordConfig(
    optionRecord,
    'interaction',
  );

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

        border: {
          display: true,
          color: colors.axisLine,
          ...xBorderConfig,
        },

        grid: {
          color: colors.grid,
          ...xGridConfig,
        },

        ticks: {
          color: colors.axisText,
          ...xTicksConfig,

          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
            ...xTickFontConfig,
          },
        },
      },

      y: {
        beginAtZero: true,
        ...yScaleConfig,

        border: {
          display: true,
          color: colors.axisLine,
          ...yBorderConfig,
        },

        grid: {
          color: colors.grid,
          ...yGridConfig,
        },

        ticks: {
          color: colors.axisText,
          ...yTicksConfig,

          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
            ...yTickFontConfig,
          },
        },
      },
    },

    plugins: {
      ...pluginOptions,

      crosshair: {
        ...genericCrosshairConfig,
        enabled: false,
      },

      candlestickCrosshair: {
        ...candlestickCrosshairConfig,
        enabled: false,
      },

      lineCrosshair: {
        ...lineCrosshairConfig,
        enabled: false,
      },

      scatterCrosshair: {
        color: colors.axisLine,
        width: SCATTER_CHART_CONFIG.crosshairWidth,
        dash: SCATTER_CHART_CONFIG.crosshairDash,
        showHorizontal: true,
        showVertical: true,
        ...scatterCrosshairConfig,
        enabled: crosshairEnabled,
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
            ...legendFontConfig,
          },
        },
      },

      tooltip: {
        mode: 'nearest',
        intersect: true,
        position: 'nearest',
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        caretPadding: SCATTER_CHART_CONFIG.tooltipCaretPadding,
        ...tooltipConfig,

        callbacks: {
          label: (context: TooltipItem<'scatter'>) =>
            `(${context.parsed.x}, ${context.parsed.y})`,
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