import {
  Chart,
  type ChartEvent,
  type LegendElement,
  type LegendItem,
  type Plugin,
} from 'chart.js';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import { isRecord } from '@/common/utils/Common.utils';
import type { ChartJSData, ChartJSOptions } from '@/components/chartjs/ChartJS.types';

import type {
  FunnelChartAlignment,
  FunnelChartColors,
  FunnelChartOptions,
  FunnelChartResolvedColors,
} from '../FunnelChart.types';

import { FUNNEL_CHART_CONFIG } from './BaseFunnelChart.constants';

type FunnelChartDataset = {
  readonly label: string;
  readonly data: number[];
  readonly backgroundColor: string[];
  readonly borderColor: string[];
  readonly borderWidth: number;
  readonly hoverOffset: number;
  readonly align?: FunnelChartAlignment;
  readonly datalabels: {
    readonly formatter: typeof formatFunnelLabel;
  };
};

type FunnelLabelContext = {
  readonly chart: {
    readonly data: {
      readonly labels?: unknown[];
      readonly datasets: {
        readonly data: unknown[];
      }[];
    };
  };
  readonly dataIndex: number;
};

type FunnelCrosshairOptions = {
  readonly enabled?: boolean;
  readonly horizontal?: boolean;
  readonly color?: string;
  readonly width?: number;
  readonly dash?: number[];
};

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
    throw new Error(
      `[FunnelChart] Missing required CSS variable "${variableName}".`,
    );
  }

  return value;
};

const resolveColor = (
  styles: CSSStyleDeclaration,
  color: string,
): string => {
  const match = color.match(/^var\(\s*(--[^,\s)]+)(?:\s*,\s*([^)]+))?\s*\)$/);

  if (!match) return color;

  const variableName = match[1];
  const fallback = match[2]?.trim();

  if (!variableName) return color;

  const value = styles.getPropertyValue(variableName).trim();

  if (value) return value;
  if (fallback) return fallback;

  throw new Error(
    `[FunnelChart] Missing required CSS variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveFunnelChartColors = (
  element: HTMLElement,
  colors?: FunnelChartColors,
): FunnelChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series:
      colors?.series && colors.series.length > 0
        ? colors.series.map((color) => resolveColor(styles, color))
        : resolveDefaultSeriesColors(styles),
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

const getPercentage = (
  value: number,
  values: number[],
): number => {
  const maxValue = Math.max(...values);

  if (!Number.isFinite(maxValue) || maxValue <= 0) return 0;
  if (maxValue <= 1) return Math.round(value * 100);

  return Math.round((value / maxValue) * 100);
};

const formatFunnelLabel = (
  value: unknown,
  context: FunnelLabelContext,
): string => {
  const numberValue =
    typeof value === 'number' ? value : Number(value);
  const label =
    context.chart.data.labels?.[context.dataIndex];
  const rawData =
    context.chart.data.datasets[0]?.data ?? [];
  const numericData =
    rawData.map(Number).filter(Number.isFinite);
  const percentage =
    getPercentage(numberValue, numericData);

  return `${String(label ?? '')}\n${percentage}%`;
};

const isHorizontalFunnel = (
  options?: FunnelChartOptions,
): boolean =>
  options?.['indexAxis'] === 'x';

const getDatasetBackgroundColors = (
  backgroundColor: unknown,
  fallbackColors: string[],
): string[] => {
  if (Array.isArray(backgroundColor)) {
    return backgroundColor.map(String);
  }

  if (typeof backgroundColor === 'string') {
    return [backgroundColor];
  }

  return fallbackColors;
};

const funnelCrosshairPlugin: Plugin<'funnel'> = {
  id: 'funnelCrosshair',
  afterDatasetsDraw: (chart) => {
    const plugins = isRecord(chart.options.plugins)
      ? chart.options.plugins
      : undefined;
    const config = getRecordConfig(
      plugins,
      'funnelCrosshair',
    ) as FunnelCrosshairOptions;

    if (config.enabled !== true) return;

    const activeElement =
      chart.getActiveElements()[0]?.element;

    if (!activeElement) return;

    const { ctx, chartArea } = chart;
    const chartCenterX =
      chartArea.left +
      (chartArea.right - chartArea.left) / 2;
    const chartCenterY =
      chartArea.top +
      (chartArea.bottom - chartArea.top) / 2;
    const horizontal = config.horizontal ?? false;
    const crosshairX =
      horizontal ? activeElement.x : chartCenterX;
    const crosshairY =
      horizontal ? chartCenterY : activeElement.y;

    ctx.save();
    ctx.strokeStyle =
      config.color ?? '#000000';
    ctx.lineWidth =
      config.width ?? FUNNEL_CHART_CONFIG.crosshairWidth;
    ctx.setLineDash(
      config.dash ??
      Array.from(FUNNEL_CHART_CONFIG.crosshairDash),
    );
    ctx.beginPath();
    ctx.moveTo(chartArea.left, crosshairY);
    ctx.lineTo(chartArea.right, crosshairY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(crosshairX, chartArea.top);
    ctx.lineTo(crosshairX, chartArea.bottom);
    ctx.stroke();
    ctx.restore();
  },
};

Chart.register(funnelCrosshairPlugin);

export const createFunnelChartData = ({
  labels,
  data,
  colors,
  options,
}: {
  readonly labels: string[];
  readonly data: number[];
  readonly colors: FunnelChartResolvedColors;
  readonly options?: FunnelChartOptions;
}): ChartJSData => {
  const dataset: FunnelChartDataset = {
    label: 'Funnel',
    data: Array.from(data),
    backgroundColor: data.map(
      (_, index) =>
        colors.series[index % colors.series.length],
    ),
    borderColor: data.map(() => colors.axisLine),
    borderWidth: FUNNEL_CHART_CONFIG.borderWidth,
    hoverOffset: FUNNEL_CHART_CONFIG.hoverOffset,
    align: options?.align ?? 'center',
    datalabels: {
      formatter: formatFunnelLabel,
    },
  };

  return {
    labels: Array.from(labels),
    datasets: [dataset],
  } as unknown as ChartJSData;
};

export const createFunnelChartOptions = ({
  options,
  colors,
}: {
  readonly options?: FunnelChartOptions;
  readonly colors: FunnelChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord =
    isRecord(options) ? options : undefined;
  const pluginOptions =
    getRecordConfig(optionRecord, 'plugins');
  const datalabelsConfig =
    getRecordConfig(pluginOptions, 'datalabels');
  const tooltipConfig =
    getRecordConfig(pluginOptions, 'tooltip');
  const legendConfig =
    getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig =
    getRecordConfig(legendConfig, 'labels');
  const genericCrosshairConfig =
    getRecordConfig(pluginOptions, 'crosshair');
  const candlestickCrosshairConfig =
    getRecordConfig(pluginOptions, 'candlestickCrosshair');
  const funnelCrosshairConfig =
    getRecordConfig(pluginOptions, 'funnelCrosshair');
  const scalesConfig =
    getRecordConfig(optionRecord, 'scales');
  const horizontal =
    isHorizontalFunnel(options);

  const {
    crosshair = false,
    showLegend = true,
    boldLegends = false,
    plugins: _plugins,
    scales: _scales,
    interaction: _interaction,
    layout: _layout,
    ...remainingOptions
  } = options ?? {};

  const crosshairEnabled = crosshair === true;

  return {
    ...remainingOptions,
    indexAxis: horizontal ? 'x' : 'y',
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: true,
      axis: 'xy',
      ...getRecordConfig(optionRecord, 'interaction'),
    },
    layout: {
      padding: {
        ...FUNNEL_CHART_CONFIG.layoutPadding,
        bottom: showLegend
          ? FUNNEL_CHART_CONFIG.layoutPadding.bottom
          : 10,
      },
      ...getRecordConfig(optionRecord, 'layout'),
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
      funnelCrosshair: {
        horizontal,
        color: colors.axisText,
        width: FUNNEL_CHART_CONFIG.crosshairWidth,
        dash: Array.from(
          FUNNEL_CHART_CONFIG.crosshairDash,
        ),
        ...funnelCrosshairConfig,
        enabled: crosshairEnabled,
      },
      legend: {
        position: 'bottom',
        align: 'center',
        ...legendConfig,
        display: showLegend,
        labels: {
          boxWidth:
            FUNNEL_CHART_CONFIG.legendBoxWidth,
          boxHeight:
            FUNNEL_CHART_CONFIG.legendBoxHeight,
          padding:
            FUNNEL_CHART_CONFIG.legendPadding,
          color: colors.axisText,
          font: {
            size:
              FUNNEL_CHART_CONFIG.legendFontSize,
            weight: boldLegends
              ? 'bold'
              : 'normal',
            ...getRecordConfig(
              legendLabelsConfig,
              'font',
            ),
          },
          ...legendLabelsConfig,
          generateLabels: (
            chart: Chart<'funnel'>,
          ): LegendItem[] => {
            const labels =
              chart.data.labels ?? [];
            const dataset =
              chart.data.datasets[0];
            const datasetColors =
              getDatasetBackgroundColors(
                dataset?.backgroundColor,
                colors.series,
              );

            return labels.map(
              (
                label: unknown,
                dataIndex: number,
              ): LegendItem => {
                const color =
                  datasetColors[
                  dataIndex %
                  datasetColors.length
                  ];

                return {
                  text: String(label ?? ''),
                  fillStyle: color,
                  strokeStyle: color,
                  lineWidth: 0,
                  fontColor: colors.axisText,
                  hidden:
                    !chart.getDataVisibility(
                      dataIndex,
                    ),
                  datasetIndex: 0,
                  index: dataIndex,
                };
              },
            );
          },
        },
        onClick: (
          _event: ChartEvent,
          legendItem: LegendItem,
          legend: LegendElement<'funnel'>,
        ): void => {
          const dataIndex = legendItem.index;

          if (typeof dataIndex !== 'number') return;

          const chart = legend.chart;

          chart.toggleDataVisibility(dataIndex);
          chart.update();
        },
      },
      tooltip: {
        enabled: true,
        displayColors: true,
        backgroundColor:
          colors.tooltipBackground,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        callbacks: {
          title: (
            items: {
              readonly label?: string;
            }[],
          ): string =>
            items[0]?.label ?? '',
          label: (context: {
            readonly parsed?: unknown;
            readonly raw?: unknown;
          }): string => {
            const value =
              typeof context.raw === 'number'
                ? context.raw
                : typeof context.parsed ===
                  'number'
                  ? context.parsed
                  : Number(
                    context.raw ??
                    context.parsed ??
                    0,
                  );

            return Number.isFinite(value)
              ? value.toLocaleString()
              : String(context.raw ?? '');
          },
        },
        ...tooltipConfig,
      },
      datalabels: {
        ...datalabelsConfig,
        display: horizontal,
        color: colors.tooltipText,
        font: {
          weight:
            options?.boldLabels === false
              ? '500'
              : 'bold',
          size:
            FUNNEL_CHART_CONFIG.labelFontSize,
          lineHeight: 1.2,
          ...getRecordConfig(
            datalabelsConfig,
            'font',
          ),
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
        ...getRecordConfig(scalesConfig, 'x'),
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
        ...getRecordConfig(scalesConfig, 'y'),
      },
    },
  };
};

export const createFunnelChartCenterLabelPlugin = ({
  options,
  colors,
}: {
  readonly options?: FunnelChartOptions;
  readonly colors: FunnelChartResolvedColors;
}): Plugin<'funnel'> => ({
  id: 'funnelVerticalCenterLabels',
  afterDatasetsDraw: (chart) => {
    if (isHorizontalFunnel(options)) return;

    const { ctx, chartArea } = chart;
    const labels = chart.data.labels ?? [];
    const dataset = chart.data.datasets[0];
    const data = dataset?.data ?? [];
    const numericData =
      data.map(Number).filter(Number.isFinite);
    const centerX =
      chartArea.left +
      (chartArea.right - chartArea.left) / 2;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.fillStyle = colors.tooltipText;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${options?.boldLabels === false
      ? '500'
      : '700'
      } ${FUNNEL_CHART_CONFIG.labelFontSize}px sans-serif`;

    meta.data.forEach((element, index) => {
      if (!chart.getDataVisibility(index)) return;

      const value = Number(data[index]);

      if (!Number.isFinite(value)) return;

      const percentage =
        getPercentage(value, numericData);
      const label =
        String(labels[index] ?? '');

      ctx.fillText(
        `${percentage}%`,
        centerX,
        element.y - 8,
      );
      ctx.fillText(
        label,
        centerX,
        element.y + 9,
      );
    });

    ctx.restore();
  },
});