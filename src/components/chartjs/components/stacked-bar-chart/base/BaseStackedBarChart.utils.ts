import type { TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  StackedBarChartColors,
  StackedBarChartDataset,
  StackedBarChartOptions,
  StackedBarChartResolvedColors,
} from '../StackedBarChart.types';

import { STACKED_BAR_CHART_CONFIG } from './BaseStackedBarChart.constants';

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

const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[StackedBarChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

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

  throw new Error(`[StackedBarChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveStackedBarChartColors = (
  element: HTMLElement,
  colors?: StackedBarChartColors,
): StackedBarChartResolvedColors => {
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
  dataset: StackedBarChartDataset,
  index: number,
  colors: StackedBarChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) return resolveColor(styles, dataset.color);

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[StackedBarChart] At least one series color is required.');
  }

  return resolveColor(styles, color);
};

const getTooltipRawValue = (value: unknown): number => {
  if (typeof value === 'number') return value;

  if (Array.isArray(value)) {
    for (let index = value.length - 1; index >= 0; index -= 1) {
      const item = value[index];

      if (typeof item === 'number') return item;
    }

    return 0;
  }

  if (isRecord(value)) {
    const yValue = value['y'];
    const xValue = value['x'];

    if (typeof yValue === 'number') return yValue;
    if (typeof xValue === 'number') return xValue;
  }

  return 0;
};

export const createStackedBarChartData = ({
  labels,
  data,
  colors,
  rootElement,
  horizontal,
  barWidth,
  maxBarWidth,
}: {
  readonly labels: string[];
  readonly data: StackedBarChartDataset[];
  readonly colors: StackedBarChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly horizontal: boolean;
  readonly barWidth?: number;
  readonly maxBarWidth?: number;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);

  return {
    labels: Array.from(labels),
    datasets: data.map<ChartJSDataset>((dataset, index) => {
      const color = getSeriesColor(dataset, index, colors, styles);
      const isTerminalDataset = index === data.length - 1;
      const borderRadius = dataset.borderRadius ?? STACKED_BAR_CHART_CONFIG.borderRadius;

      return {
        label: dataset.label,
        data: Array.from(dataset.data),
        stack: STACKED_BAR_CHART_CONFIG.stackId,
        backgroundColor: color,
        borderColor: color,
        borderWidth: STACKED_BAR_CHART_CONFIG.borderWidth,
        borderSkipped: false,
        ...(barWidth !== undefined
          ? { barThickness: barWidth }
          : {
            maxBarThickness:
              maxBarWidth ?? STACKED_BAR_CHART_CONFIG.maxBarWidth,
          }),
        borderRadius: isTerminalDataset
          ? horizontal
            ? {
              topRight: borderRadius,
              bottomRight: borderRadius,
            }
            : {
              topLeft: borderRadius,
              topRight: borderRadius,
            }
          : 0,
      };
    }),
  };
};

export const createStackedBarChartOptions = ({
  options,
  colors,
}: {
  readonly options?: StackedBarChartOptions;
  readonly colors: StackedBarChartResolvedColors;
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
  const pluginOptions = getRecordConfig(optionRecord, 'plugins');
  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');
  const legendFontConfig = getRecordConfig(legendLabelsConfig, 'font');
  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');
  const dataLabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const dataLabelFontConfig = getRecordConfig(dataLabelsConfig, 'font');
  const crosshairConfig = getRecordConfig(pluginOptions, 'crosshair');
  const candlestickCrosshairConfig = getRecordConfig(pluginOptions, 'candlestickCrosshair');
  const interactionConfig = getRecordConfig(optionRecord, 'interaction');
  const crosshairEnabled = options?.crosshair ?? false;
  const horizontal = options?.horizontal ?? false;

  const {
    horizontal: _horizontal,
    barWidth: _barWidth,
    maxBarWidth: _maxBarWidth,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    showLegend: _showLegend,
    showDataLabels: _showDataLabels,
    isBoxVisible: _isBoxVisible,
    crosshair: _crosshair,
    height: _height,
    plugins: _plugins,
    scales: _scales,
    interaction: _interaction,
    ...remainingOptions
  } = options ?? {};

  return {
    ...remainingOptions,
    indexAxis: horizontal ? 'y' : 'x',
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
      axis: horizontal ? 'y' : 'x',
      ...interactionConfig,
    },
    scales: {
      ...scalesConfig,
      x: {
        ...xScaleConfig,
        stacked: true,
        ...(horizontal ? { beginAtZero: true } : {}),
        border: {
          color: colors.axisLine,
          ...getRecordConfig(xScaleConfig, 'border'),
        },
        grid: {
          display: horizontal,
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
        ...yScaleConfig,
        stacked: true,
        ...(!horizontal ? { beginAtZero: true } : {}),
        border: {
          color: colors.axisLine,
          ...getRecordConfig(yScaleConfig, 'border'),
        },
        grid: {
          display: !horizontal,
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
        enabled: crosshairEnabled,
        color: colors.axisText,
        ...crosshairConfig,
      },
      candlestickCrosshair: {
        enabled: crosshairEnabled,
        color: colors.axisText,
        ...candlestickCrosshairConfig,
      },
      legend: {
        position: 'bottom',
        ...legendConfig,
        display: options?.showLegend ?? true,
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
        backgroundColor: colors.tooltipBackground,
        borderColor: colors.tooltipBorder,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        footerColor: colors.tooltipText,
        ...tooltipConfig,
        mode: 'index',
        intersect: false,
        position: 'nearest',
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const datasetLabel = context.dataset.label ?? 'Dataset';
            return `${datasetLabel}: ${getTooltipRawValue(context.raw)}`;
          },
          footer: (items: TooltipItem<'bar'>[]) => {
            const total = items.reduce(
              (sum, item) => sum + getTooltipRawValue(item.raw),
              0,
            );

            return `Total: ${total}`;
          },
          ...tooltipCallbacksConfig,
        },
      },
      datalabels: {
        display: options?.showDataLabels ?? true,
        color: colors.tooltipText,
        ...dataLabelsConfig,
        font: {
          weight: 'bold',
          ...dataLabelFontConfig,
        },
        formatter: (value: unknown) => getTooltipRawValue(value),
      },
    },
    onClick: options?.onClick,
  };
};