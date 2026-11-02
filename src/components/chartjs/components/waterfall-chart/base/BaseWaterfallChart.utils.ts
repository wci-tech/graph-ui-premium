import type { TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  WaterfallChartColors,
  WaterfallChartOptions,
  WaterfallChartResolvedColors,
} from '../WaterfallChart.types';

import { WATERFALL_CHART_CONFIG } from './BaseWaterfallChart.constants';

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
    throw new Error(`[WaterfallChart] Missing required CSS variable "${variableName}".`);
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

  throw new Error(`[WaterfallChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveWaterfallChartColors = (
  element: HTMLElement,
  colors?: WaterfallChartColors,
): WaterfallChartResolvedColors => {
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

const normalizeTotalIndices = (
  totalIndices: number[] | undefined,
  dataLength: number,
): Set<number> => {
  const source = totalIndices ?? (dataLength > 0 ? [0] : []);

  return new Set(
    source.filter((index) => Number.isInteger(index) && index >= 0 && index < dataLength),
  );
};

const getRange = (value: unknown): [number, number] => {
  if (!Array.isArray(value)) return [0, 0];

  const start = typeof value[0] === 'number' ? value[0] : 0;
  const end = typeof value[1] === 'number' ? value[1] : start;

  return [start, end];
};

const getDisplayTotal = (range: [number, number]): number => range[1];

const getSeriesColor = (
  colors: WaterfallChartResolvedColors,
  index: number,
  fallbackIndex: number,
): string => {
  const color = colors.series[index] ?? colors.series[fallbackIndex] ?? colors.series[0];

  if (!color) {
    throw new Error('[WaterfallChart] At least one series color is required.');
  }

  return color;
};

export const createWaterfallChartData = ({
  labels,
  data,
  colors,
  options,
}: {
  readonly labels: string[];
  readonly data: number[];
  readonly colors: WaterfallChartResolvedColors;
  readonly options?: WaterfallChartOptions;
}): ChartJSData => {
  const positiveColor = getSeriesColor(colors, 2, 0);
  const negativeColor = getSeriesColor(colors, 4, 0);
  const totalColor = getSeriesColor(colors, 0, 0);
  const totalIndices = normalizeTotalIndices(options?.totalIndices, data.length);
  const ranges: [number, number][] = [];
  const backgroundColors: string[] = [];
  let runningTotal = 0;

  data.forEach((value, index) => {
    if (totalIndices.has(index)) {
      ranges.push([0, value]);
      backgroundColors.push(totalColor);
      runningTotal = value;
      return;
    }

    const start = runningTotal;
    const end = start + value;

    ranges.push([start, end]);
    backgroundColors.push(value >= 0 ? positiveColor : negativeColor);
    runningTotal = end;
  });

  const dataset: ChartJSDataset = {
    label: 'Waterfall',
    data: ranges,
    backgroundColor: (context) => backgroundColors[context.dataIndex] ?? totalColor,
    borderWidth: WATERFALL_CHART_CONFIG.borderWidth,
    borderRadius: WATERFALL_CHART_CONFIG.borderRadius,
    borderSkipped: false,
    ...(options?.barWidth !== undefined
      ? {
        barThickness: options.barWidth,
      }
      : {
        maxBarThickness: options?.barMaxWidth ?? WATERFALL_CHART_CONFIG.defaultBarMaxWidth,
        barPercentage: WATERFALL_CHART_CONFIG.barPercentage,
        categoryPercentage: WATERFALL_CHART_CONFIG.categoryPercentage,
      }),
  };

  return {
    labels: Array.from(labels),
    datasets: [dataset],
  };
};

export const createWaterfallChartOptions = ({
  options,
  colors,
  dataLength,
}: {
  readonly options?: WaterfallChartOptions;
  readonly colors: WaterfallChartResolvedColors;
  readonly dataLength: number;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;
  const scalesConfig = getRecordConfig(optionRecord, 'scales');
  const xScaleConfig = getRecordConfig(scalesConfig, 'x');
  const yScaleConfig = getRecordConfig(scalesConfig, 'y');
  const xBorderConfig = getRecordConfig(xScaleConfig, 'border');
  const yBorderConfig = getRecordConfig(yScaleConfig, 'border');
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
  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const dataLabelFontConfig = getRecordConfig(datalabelsConfig, 'font');
  const crosshairConfig = getRecordConfig(pluginOptions, 'crosshair');
  const candlestickCrosshairConfig = getRecordConfig(pluginOptions, 'candlestickCrosshair');
  const interactionConfig = getRecordConfig(optionRecord, 'interaction');
  const totalIndices = normalizeTotalIndices(options?.totalIndices, dataLength);
  const crosshairEnabled = options?.crosshair === true;

  const {
    totalIndices: _totalIndices,
    showLegend: _showLegend,
    showDataLabels: _showDataLabels,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    barWidth: _barWidth,
    barMaxWidth: _barMaxWidth,
    crosshair: _crosshair,
    height: _height,
    isBoxVisible: _isBoxVisible,
    chartBackground: _chartBackground,
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
            ...xTickFontConfig,
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
            ...yTickFontConfig,
          },
        },
      },
    },
    plugins: {
      ...pluginOptions,
      crosshair: {
        ...crosshairConfig,
        enabled: crosshairEnabled,
      },
      candlestickCrosshair: {
        ...candlestickCrosshairConfig,
        enabled: crosshairEnabled,
      },
      legend: {
        position: 'bottom',
        ...legendConfig,
        display: options?.showLegend ?? false,
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
        mode: 'index',
        intersect: false,
        position: 'nearest',
        caretPadding: WATERFALL_CHART_CONFIG.tooltipCaretPadding,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        footerColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltipConfig,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const range = getRange(context.raw);
            const total = getDisplayTotal(range);

            if (totalIndices.has(context.dataIndex)) {
              return `Total: ${total}`;
            }

            const change = range[1] - range[0];

            return `Change: ${change > 0 ? '+' : ''}${change} (Total: ${total})`;
          },
          ...tooltipCallbacksConfig,
        },
      },
      datalabels: {
        display: options?.showDataLabels ?? true,
        color: colors.tooltipText,
        ...datalabelsConfig,
        font: {
          weight: 'bold',
          ...dataLabelFontConfig,
        },
        formatter: (
          value: unknown,
          context: {
            dataIndex: number;
          },
        ) => {
          const range = getRange(value);

          if (totalIndices.has(context.dataIndex)) {
            return getDisplayTotal(range);
          }

          const change = range[1] - range[0];

          return `${change > 0 ? '+' : ''}${change}`;
        },
      },
    },
    onClick: options?.onClick,
  };
};