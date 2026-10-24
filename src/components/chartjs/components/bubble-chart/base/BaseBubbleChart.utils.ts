import type { TooltipItem } from 'chart.js';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import { isRecord } from '@/common/utils/Common.utils';
import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  BubbleChartColors,
  BubbleChartDataset,
  BubbleChartOptions,
  BubbleChartResolvedColors,
} from '../BubbleChart.types';

import { BUBBLE_CHART_CONFIG } from './BaseBubbleChart.constants';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

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
    throw new Error(`[BubbleChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

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

  throw new Error(`[BubbleChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveBubbleChartColors = (
  element: HTMLElement,
  colors?: BubbleChartColors,
): BubbleChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series && colors.series.length > 0
        ? colors.series.map((color) => resolveColor(styles, color))
        : resolveDefaultSeriesColors(styles),
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
  dataset: BubbleChartDataset,
  index: number,
  colors: BubbleChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (dataset.color) {
    return resolveColor(styles, dataset.color);
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[BubbleChart] At least one series color is required.');
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

export const createBubbleChartData = ({
  data,
  colors,
  rootElement,
}: {
  readonly data: BubbleChartDataset[];
  readonly colors: BubbleChartResolvedColors;
  readonly rootElement: HTMLElement;
}): ChartJSData => {
  const styles = getComputedStyle(rootElement);

  return {
    datasets: data.map<ChartJSDataset>((dataset, index) => {
      const color = getSeriesColor(dataset, index, colors, styles);
      const borderColor = dataset.borderColor
        ? resolveColor(styles, dataset.borderColor)
        : color;

      return {
        type: 'bubble',
        label: dataset.label,
        data: Array.from(dataset.data),
        backgroundColor: getAlphaColor(color, BUBBLE_CHART_CONFIG.backgroundOpacity),
        borderColor,
        borderWidth: dataset.borderWidth ?? BUBBLE_CHART_CONFIG.borderWidth,
        clip: false,
        parsing: true,
      };
    }),
  };
};

export const createBubbleChartOptions = ({
  options,
  colors,
}: {
  readonly options?: BubbleChartOptions;
  readonly colors: BubbleChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;
  const scalesConfig = getRecordConfig(optionRecord, 'scales');
  const xScaleConfig = getRecordConfig(scalesConfig, 'x');
  const yScaleConfig = getRecordConfig(scalesConfig, 'y');
  const xTitleConfig = getRecordConfig(xScaleConfig, 'title');
  const yTitleConfig = getRecordConfig(yScaleConfig, 'title');
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
  const layoutConfig = getRecordConfig(optionRecord, 'layout');
  const animationsConfig = getRecordConfig(optionRecord, 'animations');
  const crosshairEnabled = options?.crosshair ?? false;

  return {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: BUBBLE_CHART_CONFIG.layoutPadding,
      ...layoutConfig,
    },
    interaction: {
      mode: 'nearest',
      intersect: true,
      ...interactionConfig,
    },
    scales: {
      ...scalesConfig,
      x: {
        ...xScaleConfig,
        type: 'linear',
        grace: BUBBLE_CHART_CONFIG.axisGrace,
        title: {
          display: Boolean(options?.xAxisTitle),
          text: options?.xAxisTitle,
          color: colors.axisText,
          ...xTitleConfig,
        },
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
          font: {
            weight: options?.boldLabels ? 'bold' : 'normal',
          },
          ...xTicksConfig,
        },
      },
      y: {
        ...yScaleConfig,
        type: 'linear',
        grace: BUBBLE_CHART_CONFIG.axisGrace,
        title: {
          display: Boolean(options?.yAxisTitle),
          text: options?.yAxisTitle,
          color: colors.axisText,
          ...yTitleConfig,
        },
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
          font: {
            weight: options?.boldLegends ? 'bold' : 'normal',
          },
          ...legendLabelsConfig,
        },
      },
      tooltip: {
        mode: 'nearest',
        intersect: true,
        position: 'nearest',
        caretPadding: BUBBLE_CHART_CONFIG.tooltipCaretPadding,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltipConfig,
        callbacks: {
          label: (context: TooltipItem<'bubble'>) => {
            const datasetLabel = context.dataset.label ?? 'Dataset';
            const raw = context.raw;

            if (isRecord(raw)) {
              const x = raw['x'];
              const y = raw['y'];
              const r = raw['r'];

              if (
                typeof x === 'number' &&
                typeof y === 'number' &&
                typeof r === 'number'
              ) {
                return `${datasetLabel}: x ${x}, y ${y}, radius ${r}`;
              }
            }

            return datasetLabel;
          },
          ...tooltipCallbacksConfig,
        },
      },
      datalabels: {
        display: false,
        ...datalabelsConfig,
      },
    },
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'r'],
      },
      show: {
        animations: {
          r: {
            from: 0,
          },
        },
      },
      ...animationsConfig,
    },
    onClick: options?.['onClick'],
  };
};