import type { ScriptableContext, TooltipItem } from 'chart.js';

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
  StackedAreaChartAppearance,
  StackedAreaChartColors,
  StackedAreaChartDataset,
  StackedAreaChartOptions,
  StackedAreaChartResolvedColors,
} from '../StackedAreaChart.types';

import { STACKED_AREA_CHART_CONFIG, STACKED_AREA_CHART_STACK_ID } from './BaseStackedAreaChart.constants';



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
 * @param variableName - CSS custom property name.
 * @returns Resolved CSS custom property value.
 */
const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(
      `[StackedAreaChart] Missing required CSS variable "${variableName}".`,
    );
  }

  return value;
};

/**
 * Resolves a color before passing it to the Canvas API.
 *
 * Chart.js Canvas APIs cannot resolve CSS var() expressions directly.
 *
 * @param styles - Computed chart styles.
 * @param color - Color value or CSS variable expression.
 * @returns Resolved Canvas-compatible color.
 */
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
    `[StackedAreaChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(
      styles,
      resolveCssVariable(styles, variableName),
    ),
  );

/**
 * Resolves all Stacked Area chart colors.
 *
 * Consumer overrides take precedence over shared WCI chart tokens.
 *
 * @param element - Stacked Area chart root element.
 * @param colors - Optional consumer color overrides.
 * @returns Fully resolved chart colors.
 */
export const resolveStackedAreaChartColors = (
  element: HTMLElement,
  colors?: StackedAreaChartColors,
): StackedAreaChartResolvedColors => {
  const styles = getComputedStyle(element);

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: resolveColor(
      styles,
      colors?.axisText ??
      resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText),
    ),
    axisLine: resolveColor(
      styles,
      colors?.axisLine ??
      resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine),
    ),
    grid: resolveColor(
      styles,
      colors?.grid ??
      resolveCssVariable(styles, CHART_TOKEN_VARIABLES.grid),
    ),
    tooltipBackground: resolveColor(
      styles,
      colors?.tooltipBackground ??
      resolveCssVariable(
        styles,
        CHART_TOKEN_VARIABLES.tooltipBackground,
      ),
    ),
    tooltipText: resolveColor(
      styles,
      colors?.tooltipText ??
      resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText),
    ),
    tooltipBorder: resolveColor(
      styles,
      colors?.tooltipBorder ??
      resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder),
    ),
  };
};

const clampOpacity = (value: number): number =>
  Math.min(1, Math.max(0, value));

const getAlphaColor = (
  color: string,
  opacity: number,
): string => {
  const resolvedOpacity = clampOpacity(opacity);

  if (color.startsWith('#') && color.length === 7) {
    const alpha = Math.round(resolvedOpacity * 255)
      .toString(16)
      .padStart(2, '0');

    return `${color}${alpha}`;
  }

  if (color.startsWith('rgb(')) {
    return color
      .replace('rgb(', 'rgba(')
      .replace(')', `, ${resolvedOpacity})`);
  }

  if (color.startsWith('rgba(')) {
    return color.replace(
      /rgba\((.+),\s*[\d.]+\)/,
      `rgba($1, ${resolvedOpacity})`,
    );
  }

  return color;
};

const resolveDatasetColor = ({
  dataset,
  colors,
  index,
  rootElement,
}: {
  readonly dataset: StackedAreaChartDataset;
  readonly colors: StackedAreaChartResolvedColors;
  readonly index: number;
  readonly rootElement: HTMLElement;
}): string => {
  const styles = getComputedStyle(rootElement);
  const paletteColor =
    colors.series[index % colors.series.length] ??
    colors.series[0];

  if (!paletteColor) {
    throw new Error(
      '[StackedAreaChart] At least one series color is required.',
    );
  }

  return dataset.color
    ? resolveColor(styles, dataset.color)
    : paletteColor;
};

const resolveDatasetPointColor = ({
  dataset,
  lineColor,
  rootElement,
}: {
  readonly dataset: StackedAreaChartDataset;
  readonly lineColor: string;
  readonly rootElement: HTMLElement;
}): string => {
  if (!dataset.pointColor) {
    return lineColor;
  }

  return resolveColor(
    getComputedStyle(rootElement),
    dataset.pointColor,
  );
};

const resolveTension = (
  dataset: StackedAreaChartDataset,
  appearance: StackedAreaChartAppearance,
): number =>
  dataset.tension ??
  (appearance === 'basic'
    ? STACKED_AREA_CHART_CONFIG.basicTension
    : STACKED_AREA_CHART_CONFIG.smoothTension);

const createStackedAreaGradient = ({
  context,
  color,
  topOpacity,
}: {
  readonly context: ScriptableContext<'line'>;
  readonly color: string;
  readonly topOpacity: number;
}): CanvasGradient | string => {
  const { chart } = context;
  const { ctx, chartArea } = chart;

  if (!chartArea) {
    return getAlphaColor(color, topOpacity);
  }

  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom,
  );

  gradient.addColorStop(
    0,
    getAlphaColor(color, topOpacity),
  );

  gradient.addColorStop(
    1,
    getAlphaColor(
      color,
      STACKED_AREA_CHART_CONFIG.fillBottomOpacity,
    ),
  );

  return gradient;
};

const getTooltipRawValue = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  }

  if (Array.isArray(value)) {
    const lastValue = value[value.length - 1];

    return typeof lastValue === 'number'
      ? lastValue
      : 0;
  }

  if (
    isRecord(value) &&
    typeof value['y'] === 'number'
  ) {
    return value['y'];
  }

  return 0;
};

export const createStackedAreaChartData = ({
  labels,
  data,
  colors,
  rootElement,
  appearance,
  fillOpacity,
}: {
  readonly labels: string[];
  readonly data: StackedAreaChartDataset[];
  readonly colors: StackedAreaChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly appearance: StackedAreaChartAppearance;
  readonly fillOpacity?: number;
}): ChartJSData => {
  const resolvedFillOpacity =
    fillOpacity ??
    STACKED_AREA_CHART_CONFIG.fillOpacity;

  return {
    labels: Array.from(labels),
    datasets: data.map<ChartJSDataset>(
      (dataset, index) => {
        const lineColor = resolveDatasetColor({
          dataset,
          colors,
          index,
          rootElement,
        });

        const pointColor = resolveDatasetPointColor({
          dataset,
          lineColor,
          rootElement,
        });

        return {
          label: dataset.label,
          data: Array.from(dataset.data),
          stack: STACKED_AREA_CHART_STACK_ID,
          fill: true,
          tension: resolveTension(
            dataset,
            appearance,
          ),
          borderColor: lineColor,
          borderWidth:
            dataset.borderWidth ??
            STACKED_AREA_CHART_CONFIG.borderWidth,
          pointRadius:
            dataset.pointRadius ??
            STACKED_AREA_CHART_CONFIG.pointRadius,
          pointHoverRadius:
            dataset.pointHoverRadius ??
            STACKED_AREA_CHART_CONFIG.pointHoverRadius,
          pointBackgroundColor: pointColor,
          pointHoverBackgroundColor: pointColor,
          pointBorderColor: pointColor,
          pointHoverBorderColor: pointColor,
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          backgroundColor: (
            context: ScriptableContext<'line'>,
          ) =>
            createStackedAreaGradient({
              context,
              color: lineColor,
              topOpacity: resolvedFillOpacity,
            }),
        };
      },
    ),
  };
};

export const createStackedAreaChartOptions = ({
  options,
  colors,
}: {
  readonly options?: StackedAreaChartOptions;
  readonly colors: StackedAreaChartResolvedColors;
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

  const xBorderConfig = getRecordConfig(
    xScaleConfig,
    'border',
  );

  const yBorderConfig = getRecordConfig(
    yScaleConfig,
    'border',
  );

  const xGridConfig = getRecordConfig(
    xScaleConfig,
    'grid',
  );

  const yGridConfig = getRecordConfig(
    yScaleConfig,
    'grid',
  );

  const xTicksConfig = getRecordConfig(
    xScaleConfig,
    'ticks',
  );

  const yTicksConfig = getRecordConfig(
    yScaleConfig,
    'ticks',
  );

  const xTicksFontConfig = getRecordConfig(
    xTicksConfig,
    'font',
  );

  const yTicksFontConfig = getRecordConfig(
    yTicksConfig,
    'font',
  );

  const pluginOptions = getRecordConfig(
    optionRecord,
    'plugins',
  );

  const legendConfig = getRecordConfig(
    pluginOptions,
    'legend',
  );

  const legendLabelsConfig = getRecordConfig(
    legendConfig,
    'labels',
  );

  const legendLabelsFontConfig = getRecordConfig(
    legendLabelsConfig,
    'font',
  );

  const tooltipConfig = getRecordConfig(
    pluginOptions,
    'tooltip',
  );

  const tooltipCallbacksConfig = getRecordConfig(
    tooltipConfig,
    'callbacks',
  );

  const crosshairConfig = getRecordConfig(
    pluginOptions,
    'crosshair',
  );

  const candlestickCrosshairConfig = getRecordConfig(
    pluginOptions,
    'candlestickCrosshair',
  );

  const datalabelsConfig = getRecordConfig(
    pluginOptions,
    'datalabels',
  );

  const interactionConfig = getRecordConfig(
    optionRecord,
    'interaction',
  );

  const crosshairEnabled =
    options?.crosshair ?? false;

  const {
    crosshair: _crosshair,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    showLegend: _showLegend,
    fillOpacity: _fillOpacity,
    isBoxVisible: _isBoxVisible,
    height: _height,
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
      mode: 'index',
      intersect: false,
      ...interactionConfig,
    },
    scales: {
      ...scalesConfig,
      x: {
        ...xScaleConfig,
        stacked: true,
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
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
            ...xTicksFontConfig,
          },
        },
      },
      y: {
        ...yScaleConfig,
        stacked: true,
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
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
            ...yTicksFontConfig,
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
        position: 'top',
        align: 'center',
        ...legendConfig,
        labels: {
          color: colors.axisText,
          ...legendLabelsConfig,
          font: {
            weight: options?.boldLegends
              ? 'bold'
              : 'normal',
            ...legendLabelsFontConfig,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        position: 'nearest',
        caretPadding:
          STACKED_AREA_CHART_CONFIG.tooltipCaretPadding,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        footerColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltipConfig,
        callbacks: {
          footer: (
            items: TooltipItem<'line'>[],
          ) => {
            const total = items.reduce(
              (sum, item) =>
                sum +
                getTooltipRawValue(item.raw),
              0,
            );

            return `Total: ${total}`;
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