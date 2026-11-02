import { Chart, type Plugin } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  LineChartAppearance,
  LineChartColors,
  LineChartDataset,
  LineChartOptions,
  LineChartResolvedColors,
} from '../LineChart.types';

import {
  LINE_CHART_APPEARANCE_CONFIG,
  LINE_CHART_CONFIG,
} from './BaseLineChart.constants';

interface LineCrosshairOptions {
  readonly enabled?: boolean;
  readonly color?: string;
  readonly width?: number;
  readonly dash?: number[];
  readonly showHorizontal?: boolean;
  readonly showVertical?: boolean;
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

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[LineChart] Missing required CSS variable "${variableName}".`);
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

  if (resolvedColor) {
    return resolveColor(styles, resolvedColor);
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(styles, fallback);
  }

  throw new Error(`[LineChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveLineChartColors = (
  element: HTMLElement,
  colors?: LineChartColors,
): LineChartResolvedColors => {
  const styles = getComputedStyle(element);
  const defaultSeries = resolveDefaultSeriesColors(styles);

  return {
    series:
      colors?.series?.length
        ? colors.series.map((color) => resolveColor(styles, color))
        : defaultSeries,
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
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBackground),
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

const resolveDatasetColor = (
  styles: CSSStyleDeclaration,
  color: string | undefined,
  fallback: string,
): string => (color ? resolveColor(styles, color) : fallback);

const getSeriesColor = (
  colors: LineChartResolvedColors,
  index: number,
): string => {
  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[LineChart] Unable to resolve series color.');
  }

  return color;
};

const lineCrosshairPlugin: Plugin<'line'> = {
  id: 'lineCrosshair',
  afterDatasetsDraw: (chart) => {
    const plugins = isRecord(chart.options.plugins)
      ? chart.options.plugins
      : undefined;
    const config = getRecordConfig(
      plugins,
      'lineCrosshair',
    ) as LineCrosshairOptions;

    if (config.enabled !== true) return;

    const activeElement = chart.getActiveElements()[0]?.element;

    if (!activeElement) return;

    const { ctx, chartArea } = chart;
    const crosshairX = activeElement.x;
    const crosshairY = activeElement.y;

    ctx.save();
    ctx.strokeStyle = config.color ?? '#000000';
    ctx.lineWidth = config.width ?? LINE_CHART_CONFIG.crosshairWidth;
    ctx.setLineDash([
      ...(config.dash ?? LINE_CHART_CONFIG.crosshairDash),
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

Chart.register(lineCrosshairPlugin);

export const createLineChartData = ({
  labels,
  data,
  colors,
  rootElement,
  appearance,
}: {
  readonly labels: string[];
  readonly data: LineChartDataset[];
  readonly colors: LineChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly appearance: LineChartAppearance;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);

  return {
    labels: Array.from(labels),
    datasets: data.map<ChartJSDataset>((dataset, index) => {
      const fallbackColor = getSeriesColor(colors, index);
      const lineColor = resolveDatasetColor(
        styles,
        dataset.color,
        fallbackColor,
      );
      const pointColor = resolveDatasetColor(
        styles,
        dataset.pointColor,
        lineColor,
      );
      const resolvedAppearance =
        LINE_CHART_APPEARANCE_CONFIG[dataset.appearance ?? appearance];

      return {
        label: dataset.label,
        data: Array.from(dataset.data),
        borderDash: resolvedAppearance.borderDash,
        stepped: resolvedAppearance.stepped,
        tension: dataset.tension ?? resolvedAppearance.tension,
        borderColor: lineColor,
        backgroundColor: lineColor,
        borderWidth:
          dataset.borderWidth ?? LINE_CHART_CONFIG.borderWidth,
        fill: false,
        pointRadius:
          dataset.pointRadius ?? LINE_CHART_CONFIG.pointRadius,
        pointHoverRadius:
          dataset.pointHoverRadius ??
          LINE_CHART_CONFIG.pointHoverRadius,
        pointBackgroundColor: pointColor,
        pointHoverBackgroundColor: pointColor,
        pointBorderColor: pointColor,
        pointHoverBorderColor: pointColor,
        pointBorderWidth: LINE_CHART_CONFIG.pointBorderWidth,
        pointHoverBorderWidth:
          LINE_CHART_CONFIG.pointHoverBorderWidth,
      };
    }),
  };
};

export const createLineChartOptions = ({
  options,
  colors,
}: {
  readonly options?: LineChartOptions;
  readonly colors: LineChartResolvedColors;
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
  const interactionConfig = getRecordConfig(
    optionRecord,
    'interaction',
  );
  const crosshairEnabled = options?.crosshair === true;

  const {
    crosshair: _crosshair,
    plugins: _plugins,
    scales: _scales,
    interaction: _interaction,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    showLegend: _showLegend,
    ...remainingOptions
  } = options ?? {};

  return {
    ...remainingOptions,
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
      ...interactionConfig,
    },
    scales: {
      ...scalesConfig,
      x: {
        ...xScaleConfig,
        border: {
          color: colors.axisLine,
          ...xBorderConfig,
        },
        grid: {
          display: false,
          ...xGridConfig,
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
        ...yScaleConfig,
        beginAtZero: true,
        border: {
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
            ...getRecordConfig(yTicksConfig, 'font'),
          },
        },
      },
    },
    plugins: {
      ...pluginOptions,
      crosshair: {
        ...genericCrosshairConfig,
        enabled: crosshairEnabled,
      },
      candlestickCrosshair: {
        ...candlestickCrosshairConfig,
        enabled: crosshairEnabled,
      },
      lineCrosshair: {
        color: colors.axisText,
        width: LINE_CHART_CONFIG.crosshairWidth,
        dash: Array.from(LINE_CHART_CONFIG.crosshairDash),
        showHorizontal: true,
        showVertical: true,
        ...lineCrosshairConfig,
        enabled: crosshairEnabled,
      },
      legend: {
        ...legendConfig,
        display: options?.showLegend ?? false,
        labels: {
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
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        ...tooltipConfig,
        caretPadding: LINE_CHART_CONFIG.tooltipCaretPadding,
        callbacks: {
          ...tooltipCallbacksConfig,
        },
      },
      datalabels: {
        display: false,
        ...datalabelsConfig,
      },
    },
  };
};