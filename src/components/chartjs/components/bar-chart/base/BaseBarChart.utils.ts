// import type { TooltipItem } from 'chart.js';

// import type {
//   ChartJSData,
//   ChartJSDataset,
//   ChartJSOptions,
// } from '@/components/chartjs/ChartJS.types';

// import type { BarChartDataset, BarChartOptions } from '../BarChart.types';

// /* -------------------------------------------------------------------------- */
// /* Shared Bar Chart fallbacks                                                  */
// /*                                                                            */
// /* These MUST match ECharts exactly.                                           */
// /* -------------------------------------------------------------------------- */

// const FALLBACK_PRIMARY_BAR_COLOR = '#763d6c';
// const FALLBACK_SECONDARY_BAR_COLOR = '#316851';

// const FALLBACK_LABEL_COLOR = '#4b5563';
// const FALLBACK_AXIS_COLOR = '#d1d5db';
// const FALLBACK_GRID_COLOR = '#e5e7eb';

// const DEFAULT_BAR_WIDTH = 44;

// const DEFAULT_TOOLTIP_CARET_PADDING = 10;

// const DEFAULT_LEGEND_BOX_WIDTH = 40;
// const DEFAULT_LEGEND_BOX_HEIGHT = 12;
// const DEFAULT_LEGEND_PADDING = 12;

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                     */
// /* -------------------------------------------------------------------------- */

// const isRecord = (value: unknown): value is Record<string, unknown> =>
//   typeof value === 'object' && value !== null && !Array.isArray(value);

// const getRecordConfig = (
//   source: Record<string, unknown> | undefined,
//   key: string,
// ): Record<string, unknown> => {
//   const value = source?.[key];

//   return isRecord(value) ? value : {};
// };

// const resolveCssVariable = (
//   element: HTMLElement | null,
//   variableName: string,
//   fallback: string,
// ): string => {
//   if (!element) {
//     return fallback;
//   }

//   const value = getComputedStyle(element).getPropertyValue(variableName).trim();

//   return value || fallback;
// };

// /* -------------------------------------------------------------------------- */
// /* Shared CSS-variable contract                                                */
// /* -------------------------------------------------------------------------- */

// export const getResolvedBarChartColors = (element: HTMLElement | null) => ({
//   barColors: [
//     resolveCssVariable(element, '--bar-chart-bar-color', FALLBACK_PRIMARY_BAR_COLOR),

//     resolveCssVariable(element, '--bar-chart-secondary-bar-color', FALLBACK_SECONDARY_BAR_COLOR),
//   ],

//   labelColor: resolveCssVariable(element, '--bar-chart-label-color', FALLBACK_LABEL_COLOR),

//   axisColor: resolveCssVariable(element, '--bar-chart-axis-color', FALLBACK_AXIS_COLOR),

//   gridColor: resolveCssVariable(element, '--bar-chart-grid-color', FALLBACK_GRID_COLOR),
// });

// const getDatasetVariableName = ({ index }: { readonly index: number }): string => {
//   if (index === 0) {
//     return '--bar-chart-bar-color';
//   }

//   if (index === 1) {
//     return '--bar-chart-secondary-bar-color';
//   }

//   return `--bar-chart-bar-color-${index + 1}`;
// };

// const getBarColor = ({
//   rootElement,
//   datasetColor,
//   fallbackColor,
//   index,
// }: {
//   readonly rootElement: HTMLElement | null;
//   readonly datasetColor: string | undefined;
//   readonly fallbackColor: string;
//   readonly index: number;
// }): string => {
//   if (datasetColor && !datasetColor.startsWith('var(')) {
//     return datasetColor;
//   }

//   const variableName = getDatasetVariableName({
//     index,
//   });

//   return resolveCssVariable(rootElement, variableName, fallbackColor);
// };

// /* -------------------------------------------------------------------------- */
// /* Options                                                                     */
// /* -------------------------------------------------------------------------- */

// export const createBarChartOptions = ({
//   options,
//   rootElement,
// }: {
//   readonly options?: BarChartOptions;
//   readonly rootElement: HTMLElement | null;
// }): ChartJSOptions => {
//   const optionRecord = isRecord(options) ? options : undefined;

//   const scalesConfig = getRecordConfig(optionRecord, 'scales');

//   const xScaleConfig = getRecordConfig(scalesConfig, 'x');

//   const yScaleConfig = getRecordConfig(scalesConfig, 'y');

//   const pluginOptions = getRecordConfig(optionRecord, 'plugins');

//   const legendConfig = getRecordConfig(pluginOptions, 'legend');

//   const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');

//   const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');

//   const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');

//   const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');

//   const crosshairConfig = getRecordConfig(pluginOptions, 'crosshair');

//   const candlestickCrosshairConfig = getRecordConfig(pluginOptions, 'candlestickCrosshair');

//   const interactionConfig = getRecordConfig(optionRecord, 'interaction');

//   const xGridConfig = getRecordConfig(xScaleConfig, 'grid');

//   const yGridConfig = getRecordConfig(yScaleConfig, 'grid');

//   const xTicksConfig = getRecordConfig(xScaleConfig, 'ticks');

//   const yTicksConfig = getRecordConfig(yScaleConfig, 'ticks');

//   const crosshairEnabled = options?.crosshair ?? false;

//   const colors = getResolvedBarChartColors(rootElement);

//   return {
//     ...options,

//     indexAxis: options?.horizontal ? 'y' : 'x',

//     responsive: true,

//     maintainAspectRatio: false,

//     interaction: {
//       mode: 'nearest',

//       intersect: true,

//       ...interactionConfig,
//     },

//     scales: {
//       x: {
//         ...xScaleConfig,

//         grid: {
//           color: colors.gridColor,

//           drawBorder: false,

//           ...xGridConfig,
//         },

//         border: {
//           color: colors.axisColor,

//           ...getRecordConfig(xScaleConfig, 'border'),
//         },

//         ticks: {
//           /*
//            * Labels use --bar-chart-label-color.
//            */
//           color: colors.labelColor,

//           font: {
//             weight: options?.boldLabels ? 'bold' : 'normal',
//           },

//           ...xTicksConfig,
//         },
//       },

//       y: {
//         ...yScaleConfig,

//         beginAtZero: true,

//         grid: {
//           color: colors.gridColor,

//           drawBorder: false,

//           ...yGridConfig,
//         },

//         border: {
//           color: colors.axisColor,

//           ...getRecordConfig(yScaleConfig, 'border'),
//         },

//         ticks: {
//           /*
//            * Labels use --bar-chart-label-color.
//            */
//           color: colors.labelColor,

//           font: {
//             weight: options?.boldLabels ? 'bold' : 'normal',
//           },

//           ...yTicksConfig,
//         },
//       },
//     },

//     plugins: {
//       ...pluginOptions,

//       crosshair: {
//         enabled: crosshairEnabled,

//         ...crosshairConfig,
//       },

//       candlestickCrosshair: {
//         enabled: crosshairEnabled,

//         ...candlestickCrosshairConfig,
//       },

//       legend: {
//         display: options?.showLegend ?? true,

//         position: 'top',

//         align: 'center',

//         ...legendConfig,

//         labels: {
//           usePointStyle: false,

//           boxWidth: DEFAULT_LEGEND_BOX_WIDTH,

//           boxHeight: DEFAULT_LEGEND_BOX_HEIGHT,

//           padding: DEFAULT_LEGEND_PADDING,

//           /*
//            * Legend text is also chart label text.
//            */
//           color: colors.labelColor,

//           font: {
//             weight: options?.boldLegends ? 'bold' : 'normal',
//           },

//           ...legendLabelsConfig,
//         },
//       },

//       tooltip: {
//         mode: 'nearest',

//         intersect: true,

//         position: 'nearest',

//         caretPadding: DEFAULT_TOOLTIP_CARET_PADDING,

//         ...tooltipConfig,

//         callbacks: {
//           label: (context: TooltipItem<'bar'>) => {
//             const datasetLabel = context.dataset.label ?? 'Dataset';

//             const value = options?.horizontal ? context.parsed.x : context.parsed.y;

//             return `${datasetLabel}: ${value}`;
//           },

//           ...tooltipCallbacksConfig,
//         },
//       },

//       datalabels: {
//         display: false,

//         color: colors.labelColor,

//         ...datalabelsConfig,
//       },
//     },

//     onClick: options?.['onClick'],
//   };
// };

// /* -------------------------------------------------------------------------- */
// /* Data                                                                        */
// /* -------------------------------------------------------------------------- */

// export const createBarChartData = ({
//   labels,
//   data,
//   colors,
//   rootElement,
//   options,
// }: {
//   readonly labels: string[];
//   readonly data: BarChartDataset[];
//   readonly colors: string[];
//   readonly rootElement: HTMLElement | null;
//   readonly options?: BarChartOptions;
// }): ChartJSData => {
//   const resolvedColors = getResolvedBarChartColors(rootElement);

//   return {
//     labels,

//     datasets: data.map<ChartJSDataset>((dataset, index) => {
//       const fallbackColor =
//         resolvedColors.barColors[index] ??
//         colors[index] ??
//         resolvedColors.barColors[0] ??
//         colors[0] ??
//         FALLBACK_PRIMARY_BAR_COLOR;

//       const color = getBarColor({
//         rootElement,

//         datasetColor: dataset.color,

//         fallbackColor,

//         index,
//       });

//       const barWidth = dataset.barWidth ?? options?.barWidth ?? DEFAULT_BAR_WIDTH;

//       return {
//         label: dataset.label,

//         data: Array.from(dataset.data),

//         backgroundColor: color,

//         borderColor: color,

//         borderWidth: dataset.borderWidth ?? 1,

//         borderRadius: dataset.borderRadius ?? 6,

//         borderSkipped: false,

//         barThickness: barWidth,

//         maxBarThickness: dataset.maxBarWidth ?? barWidth,

//         categoryPercentage: dataset.categoryPercentage ?? options?.categoryPercentage ?? 0.8,

//         barPercentage: dataset.barPercentage ?? options?.barPercentage ?? 0.9,
//       };
//     }),
//   } as ChartJSData;
// };

import type { TooltipItem } from 'chart.js';

import type {
  ChartJSData,
  ChartJSDataset,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';
import type { ChartColors } from '@/engines/engine.types';

import type { BarChartDataset, BarChartOptions } from '../BarChart.types';

/* -------------------------------------------------------------------------- */
/* Graph tokens                                                                */
/* -------------------------------------------------------------------------- */

const BAR_CHART_COLOR_VARIABLES = [
  '--wci-chart-blue',
  '--wci-chart-teal',
  '--wci-chart-green',
  '--wci-chart-orange',
  '--wci-chart-red',
  '--wci-chart-purple',
  '--wci-chart-magenta',
  '--wci-chart-cyan',
  '--wci-chart-yellow',
] as const;

const BAR_CHART_TOKEN_VARIABLES = {
  axisText: '--wci-chart-axis-text',
  axisLine: '--wci-chart-axis-line',
  grid: '--wci-chart-grid',
  tooltipBackground: '--wci-chart-tooltip-background',
  tooltipText: '--wci-chart-tooltip-text',
  tooltipBorder: '--wci-chart-tooltip-border',
} as const;

/* -------------------------------------------------------------------------- */
/* Fallbacks                                                                   */
/* -------------------------------------------------------------------------- */

const FALLBACK_SERIES_COLORS = [
  '#0C59C3',
  '#00C7BE',
  '#0A752F',
  '#FF784D',
  '#F5456E',
  '#723EAC',
  '#FF2D96',
  '#3D9EFF',
  '#FFAE00',
] as const;

const FALLBACK_AXIS_TEXT = '#4b5563';
const FALLBACK_AXIS_LINE = '#d1d5db';
const FALLBACK_GRID = '#e5e7eb';

const FALLBACK_TOOLTIP_BACKGROUND = '#ffffff';
const FALLBACK_TOOLTIP_TEXT = '#111827';
const FALLBACK_TOOLTIP_BORDER = '#d1d5db';

const DEFAULT_BAR_WIDTH = 44;

const DEFAULT_TOOLTIP_CARET_PADDING = 10;

const DEFAULT_LEGEND_BOX_WIDTH = 40;
const DEFAULT_LEGEND_BOX_HEIGHT = 12;
const DEFAULT_LEGEND_PADDING = 12;

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface BarChartResolvedColors {
  readonly series: readonly string[];

  readonly axisText: string;
  readonly axisLine: string;
  readonly grid: string;

  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getRecordConfig = (
  source: Record<string, unknown> | undefined,
  key: string,
): Record<string, unknown> => {
  const value = source?.[key];

  return isRecord(value) ? value : {};
};

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const resolveColor = (styles: CSSStyleDeclaration, color: string): string => {
  const normalized = color.trim();

  const match = normalized.match(CSS_VARIABLE_PATTERN);

  if (!match) {
    return normalized;
  }

  const variableName = match[1];

  if (!variableName) {
    return normalized;
  }

  const resolved = styles.getPropertyValue(variableName).trim();

  if (resolved) {
    return resolveColor(styles, resolved);
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(styles, fallback);
  }

  return normalized;
};

const resolveCssVariable = ({
  styles,
  variableName,
  fallback,
}: {
  readonly styles: CSSStyleDeclaration;
  readonly variableName: string;
  readonly fallback: string;
}): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    return fallback;
  }

  return resolveColor(styles, value);
};

const resolveConsumerColor = ({
  styles,
  color,
  fallback,
}: {
  readonly styles: CSSStyleDeclaration;
  readonly color: string | undefined;
  readonly fallback: string;
}): string => {
  if (!color) {
    return fallback;
  }

  const resolved = resolveColor(styles, color);

  return resolved.startsWith('var(') ? fallback : resolved;
};

/* -------------------------------------------------------------------------- */
/* Colors                                                                      */
/* -------------------------------------------------------------------------- */

export const resolveBarChartColors = (
  element: HTMLElement,
  colors?: ChartColors,
): BarChartResolvedColors => {
  const styles = getComputedStyle(element);

  const rootSeries = BAR_CHART_COLOR_VARIABLES.map((variableName, index) =>
    resolveCssVariable({
      styles,
      variableName,
      fallback: FALLBACK_SERIES_COLORS[index] ?? FALLBACK_SERIES_COLORS[0],
    }),
  );

  const series = rootSeries.map((rootColor, index) =>
    resolveConsumerColor({
      styles,
      color: colors?.series?.[index],
      fallback: rootColor,
    }),
  );

  return {
    series,

    axisText: resolveConsumerColor({
      styles,
      color: colors?.axisText,
      fallback: resolveCssVariable({
        styles,
        variableName: BAR_CHART_TOKEN_VARIABLES.axisText,
        fallback: FALLBACK_AXIS_TEXT,
      }),
    }),

    axisLine: resolveConsumerColor({
      styles,
      color: colors?.axisLine,
      fallback: resolveCssVariable({
        styles,
        variableName: BAR_CHART_TOKEN_VARIABLES.axisLine,
        fallback: FALLBACK_AXIS_LINE,
      }),
    }),

    grid: resolveConsumerColor({
      styles,
      color: colors?.grid,
      fallback: resolveCssVariable({
        styles,
        variableName: BAR_CHART_TOKEN_VARIABLES.grid,
        fallback: FALLBACK_GRID,
      }),
    }),

    tooltipBackground: resolveConsumerColor({
      styles,
      color: colors?.tooltipBackground,
      fallback: resolveCssVariable({
        styles,
        variableName: BAR_CHART_TOKEN_VARIABLES.tooltipBackground,
        fallback: FALLBACK_TOOLTIP_BACKGROUND,
      }),
    }),

    tooltipText: resolveConsumerColor({
      styles,
      color: colors?.tooltipText,
      fallback: resolveCssVariable({
        styles,
        variableName: BAR_CHART_TOKEN_VARIABLES.tooltipText,
        fallback: FALLBACK_TOOLTIP_TEXT,
      }),
    }),

    tooltipBorder: resolveConsumerColor({
      styles,
      color: colors?.tooltipBorder,
      fallback: resolveCssVariable({
        styles,
        variableName: BAR_CHART_TOKEN_VARIABLES.tooltipBorder,
        fallback: FALLBACK_TOOLTIP_BORDER,
      }),
    }),
  };
};

const resolveDatasetColor = ({
  rootElement,
  datasetColor,
  fallbackColor,
}: {
  readonly rootElement: HTMLElement;
  readonly datasetColor: string | undefined;
  readonly fallbackColor: string;
}): string => {
  if (!datasetColor) {
    return fallbackColor;
  }

  const styles = getComputedStyle(rootElement);

  return resolveConsumerColor({
    styles,
    color: datasetColor,
    fallback: fallbackColor,
  });
};

/* -------------------------------------------------------------------------- */
/* Options                                                                     */
/* -------------------------------------------------------------------------- */

export const createBarChartOptions = ({
  options,
  colors,
}: {
  readonly options?: BarChartOptions;
  readonly colors: BarChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;

  const scalesConfig = getRecordConfig(optionRecord, 'scales');

  const xScaleConfig = getRecordConfig(scalesConfig, 'x');

  const yScaleConfig = getRecordConfig(scalesConfig, 'y');

  const pluginOptions = getRecordConfig(optionRecord, 'plugins');

  const legendConfig = getRecordConfig(pluginOptions, 'legend');

  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');

  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');

  const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');

  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');

  const crosshairConfig = getRecordConfig(pluginOptions, 'crosshair');

  const candlestickCrosshairConfig = getRecordConfig(pluginOptions, 'candlestickCrosshair');

  const interactionConfig = getRecordConfig(optionRecord, 'interaction');

  const xGridConfig = getRecordConfig(xScaleConfig, 'grid');

  const yGridConfig = getRecordConfig(yScaleConfig, 'grid');

  const xTicksConfig = getRecordConfig(xScaleConfig, 'ticks');

  const yTicksConfig = getRecordConfig(yScaleConfig, 'ticks');

  const crosshairEnabled = options?.crosshair ?? false;

  return {
    ...options,

    indexAxis: options?.horizontal ? 'y' : 'x',

    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: 'nearest',
      intersect: true,
      ...interactionConfig,
    },

    scales: {
      x: {
        ...xScaleConfig,

        grid: {
          color: colors.grid,
          drawBorder: false,
          ...xGridConfig,
        },

        border: {
          color: colors.axisLine,

          ...getRecordConfig(xScaleConfig, 'border'),
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
          drawBorder: false,
          ...yGridConfig,
        },

        border: {
          color: colors.axisLine,

          ...getRecordConfig(yScaleConfig, 'border'),
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
        display: options?.showLegend ?? true,

        position: 'top',

        align: 'center',

        ...legendConfig,

        labels: {
          usePointStyle: false,

          boxWidth: DEFAULT_LEGEND_BOX_WIDTH,

          boxHeight: DEFAULT_LEGEND_BOX_HEIGHT,

          padding: DEFAULT_LEGEND_PADDING,

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

        caretPadding: DEFAULT_TOOLTIP_CARET_PADDING,

        backgroundColor: colors.tooltipBackground,

        titleColor: colors.tooltipText,

        bodyColor: colors.tooltipText,

        borderColor: colors.tooltipBorder,

        borderWidth: 1,

        ...tooltipConfig,

        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const datasetLabel = context.dataset.label ?? 'Dataset';

            const value = options?.horizontal ? context.parsed.x : context.parsed.y;

            return `${datasetLabel}: ${value}`;
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

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

export const createBarChartData = ({
  labels,
  data,
  colors,
  rootElement,
  options,
}: {
  readonly labels: string[];
  readonly data: BarChartDataset[];
  readonly colors: BarChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly options?: BarChartOptions;
}): ChartJSData => ({
  labels: Array.from(labels),

  datasets: data.map<ChartJSDataset>((dataset, index) => {
    const fallbackColor = colors.series[index] ?? colors.series[0] ?? FALLBACK_SERIES_COLORS[0];

    const color = resolveDatasetColor({
      rootElement,
      datasetColor: dataset.color,
      fallbackColor,
    });

    const barWidth = dataset.barWidth ?? options?.barWidth ?? DEFAULT_BAR_WIDTH;

    return {
      label: dataset.label,

      data: Array.from(dataset.data),

      backgroundColor: color,

      borderColor: color,

      borderWidth: dataset.borderWidth ?? 1,

      borderRadius: dataset.borderRadius ?? 6,

      borderSkipped: false,

      barThickness: barWidth,

      maxBarThickness: dataset.maxBarWidth ?? barWidth,

      categoryPercentage: dataset.categoryPercentage ?? options?.categoryPercentage ?? 0.8,

      barPercentage: dataset.barPercentage ?? options?.barPercentage ?? 0.9,
    };
  }),
});
