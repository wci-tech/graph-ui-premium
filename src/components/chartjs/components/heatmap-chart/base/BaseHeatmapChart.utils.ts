import { Chart, type Plugin } from 'chart.js';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import type { ChartJSData, ChartJSOptions } from '@/components/chartjs/ChartJS.types';

import type {
  HeatmapChartColors,
  HeatmapChartOptions,
  HeatmapChartResolvedColors,
  HeatmapPoint,
} from '../HeatmapChart.types';

import { HEATMAP_CHART_CONFIG } from './BaseHeatmapChart.constants';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

interface MatrixDataset {
  readonly label: string;
  readonly data: HeatmapPoint[];
  readonly backgroundColor: (context: MatrixDataContext) => string;
  readonly width: (context: MatrixSizeContext) => number;
  readonly height: (context: MatrixSizeContext) => number;
  readonly borderRadius: number;
  readonly borderWidth: number;
  readonly borderColor: string;
}

interface MatrixDataContext {
  readonly dataset: {
    readonly data: HeatmapPoint[];
  };
  readonly dataIndex: number;
}

interface MatrixSizeContext {
  readonly chart: {
    readonly chartArea?: {
      readonly width: number;
      readonly height: number;
    };
  };
  readonly dataset: {
    readonly data: HeatmapPoint[];
  };
  readonly dataIndex: number;
}

interface HeatmapCrosshairOptions {
  readonly enabled?: boolean;
  readonly color?: string;
  readonly width?: number;
  readonly dash?: readonly number[];
  readonly showHorizontal?: boolean;
  readonly showVertical?: boolean;
}

interface CenterPointElement {
  readonly x: number;
  readonly y: number;
  getCenterPoint: (useFinalPosition?: boolean) => {
    readonly x: number;
    readonly y: number;
  };
}

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
const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles.getPropertyValue(variableName).trim();

  if (!value) {
    throw new Error(`[HeatmapChart] Missing required CSS variable "${variableName}".`);
  }

  return value;
};

/**
 * Resolves a color before passing it to Chart.js.
 *
 * Canvas APIs cannot consume CSS var() expressions directly,
 * so custom properties are resolved to computed color values.
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

  throw new Error(`[HeatmapChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): readonly string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

/**
 * Resolves Heatmap colors from consumer overrides and shared chart tokens.
 *
 * Precedence:
 * consumer colors -> shared WCI chart tokens.
 */
export const resolveHeatmapChartColors = (
  element: HTMLElement,
  colors?: HeatmapChartColors,
): HeatmapChartResolvedColors => {
  const styles = getComputedStyle(element);

  const resolveToken = (variableName: string): string =>
    resolveColor(styles, resolveCssVariable(styles, variableName));

  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveToken(CHART_TOKEN_VARIABLES.axisText),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveToken(CHART_TOKEN_VARIABLES.axisLine),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveToken(CHART_TOKEN_VARIABLES.grid),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveToken(CHART_TOKEN_VARIABLES.tooltipBackground),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveToken(CHART_TOKEN_VARIABLES.tooltipText),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveToken(CHART_TOKEN_VARIABLES.tooltipBorder),
  };
};

const getPaletteColor = (value: number, palette: readonly string[]): string => {
  if (palette.length === 0) return '';

  const safeValue = Math.min(Math.max(value, 0), HEATMAP_CHART_CONFIG.maxCellValue);
  const index = Math.min(
    Math.floor((safeValue / HEATMAP_CHART_CONFIG.maxCellValue) * palette.length),
    palette.length - 1,
  );

  return palette[index] ?? palette[0] ?? '';
};

const withAlpha = (color: string, alpha: number): string => {
  const safeAlpha = Math.min(
    Math.max(alpha, HEATMAP_CHART_CONFIG.minCellOpacity),
    1,
  );

  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    const alphaHex = Math.floor(safeAlpha * 255).toString(16).padStart(2, '0');
    return `${color}${alphaHex}`;
  }

  return color;
};

const getCellSizeRatio = (value: number, options?: HeatmapChartOptions): number => {
  if (options?.cellSizeMode !== 'value') return 1;

  const minRatio = options.cellMinSizeRatio ?? HEATMAP_CHART_CONFIG.cellMinSizeRatio;
  const safeMinRatio = Math.min(
    Math.max(minRatio, HEATMAP_CHART_CONFIG.minCellSizeRatio),
    1,
  );
  const safeValue =
    Math.min(Math.max(value, 0), HEATMAP_CHART_CONFIG.maxCellValue) /
    HEATMAP_CHART_CONFIG.maxCellValue;

  return safeMinRatio + safeValue * (1 - safeMinRatio);
};

const heatmapCrosshairPlugin: Plugin<'matrix'> = {
  id: 'heatmapCrosshair',

  afterDatasetsDraw: (chart) => {
    const plugins = isRecord(chart.options.plugins) ? chart.options.plugins : undefined;
    const config = getRecordConfig(
      plugins,
      'heatmapCrosshair',
    ) as HeatmapCrosshairOptions;

    if (config.enabled !== true) return;

    const activeElement = chart.getActiveElements()[0]?.element;

    if (!activeElement) return;

    const matrixElement = activeElement as unknown as CenterPointElement;
    const { x, y } = matrixElement.getCenterPoint(true);
    const { ctx, chartArea } = chart;

    ctx.save();
    ctx.strokeStyle = config.color ?? '';
    ctx.lineWidth = config.width ?? HEATMAP_CHART_CONFIG.crosshairWidth;
    ctx.setLineDash([...(config.dash ?? HEATMAP_CHART_CONFIG.crosshairDash)]);

    if (config.showHorizontal !== false) {
      ctx.beginPath();
      ctx.moveTo(chartArea.left, y);
      ctx.lineTo(chartArea.right, y);
      ctx.stroke();
    }

    if (config.showVertical !== false) {
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
    }

    ctx.restore();
  },
};

Chart.register(heatmapCrosshairPlugin);

/**
 * Creates the Chart.js matrix dataset used by the Heatmap.
 */
export const createHeatmapChartData = ({
  data,
  xLabels,
  yLabels,
  colors,
  options,
}: {
  readonly data: HeatmapPoint[];
  readonly xLabels: string[];
  readonly yLabels: string[];
  readonly colors: HeatmapChartResolvedColors;
  readonly options?: HeatmapChartOptions;
}): ChartJSData => {
  const gap = options?.cellGap ?? HEATMAP_CHART_CONFIG.cellGap;
  const primaryColor = colors.series[0] ?? colors.axisLine;

  const dataset: MatrixDataset = {
    label: 'Heatmap',
    data,

    backgroundColor: (context) => {
      const item = context.dataset.data[context.dataIndex];
      const value = item?.v ?? 0;

      if (item?.color) return item.color;

      if (options?.usePalette) {
        return getPaletteColor(value, colors.series);
      }

      return withAlpha(
        primaryColor,
        value / HEATMAP_CHART_CONFIG.maxCellValue,
      );
    },

    width: ({ chart, dataset: currentDataset, dataIndex }) => {
      if (!chart.chartArea || xLabels.length === 0) return 0;

      const value = currentDataset.data[dataIndex]?.v ?? 0;
      const baseWidth = Math.max(chart.chartArea.width / xLabels.length - gap, 0);

      return baseWidth * getCellSizeRatio(value, options);
    },

    height: ({ chart, dataset: currentDataset, dataIndex }) => {
      if (!chart.chartArea || yLabels.length === 0) return 0;

      const value = currentDataset.data[dataIndex]?.v ?? 0;
      const baseHeight = Math.max(chart.chartArea.height / yLabels.length - gap, 0);

      return baseHeight * getCellSizeRatio(value, options);
    },

    borderRadius: options?.cellBorderRadius ?? HEATMAP_CHART_CONFIG.cellBorderRadius,
    borderWidth: gap > 0 ? 1 : 0,
    borderColor: colors.grid,
  };

  return {
    datasets: [dataset],
  } as unknown as ChartJSData;
};

/**
 * Creates the Chart.js options used by the Heatmap.
 */
export const createHeatmapChartOptions = ({
  options,
  xLabels,
  yLabels,
  colors,
}: {
  readonly options?: HeatmapChartOptions;
  readonly xLabels: string[];
  readonly yLabels: string[];
  readonly colors: HeatmapChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;
  const scalesConfig = getRecordConfig(optionRecord, 'scales');
  const xScaleConfig = getRecordConfig(scalesConfig, 'x');
  const yScaleConfig = getRecordConfig(scalesConfig, 'y');
  const xTicksConfig = getRecordConfig(xScaleConfig, 'ticks');
  const yTicksConfig = getRecordConfig(yScaleConfig, 'ticks');
  const xGridConfig = getRecordConfig(xScaleConfig, 'grid');
  const yGridConfig = getRecordConfig(yScaleConfig, 'grid');
  const xBorderConfig = getRecordConfig(xScaleConfig, 'border');
  const yBorderConfig = getRecordConfig(yScaleConfig, 'border');
  const xTickFontConfig = getRecordConfig(xTicksConfig, 'font');
  const yTickFontConfig = getRecordConfig(yTicksConfig, 'font');

  const pluginOptions = getRecordConfig(optionRecord, 'plugins');
  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');
  const legendFontConfig = getRecordConfig(legendLabelsConfig, 'font');
  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');
  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const datalabelsFontConfig = getRecordConfig(datalabelsConfig, 'font');
  const heatmapCrosshairConfig = getRecordConfig(pluginOptions, 'heatmapCrosshair');

  const hoverConfig = getRecordConfig(optionRecord, 'hover');
  const interactionConfig = getRecordConfig(optionRecord, 'interaction');

  const isHoverEnabled = options?.enableHover ?? true;
  const showLabels = options?.showLabels ?? true;
  const crosshairEnabled = options?.crosshair === true;

  const {
    crosshair: _crosshair,
    plugins: _plugins,
    scales: _scales,
    hover: _hover,
    interaction: _interaction,
    enableHover: _enableHover,
    showLabels: _showLabels,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    isBoxVisible: _isBoxVisible,
    cellSizeMode: _cellSizeMode,
    cellMinSizeRatio: _cellMinSizeRatio,
    cellGap: _cellGap,
    cellBorderRadius: _cellBorderRadius,
    usePalette: _usePalette,
    ...remainingOptions
  } = options ?? {};

  return {
    ...remainingOptions,
    responsive: true,
    maintainAspectRatio: false,

    events: isHoverEnabled
      ? ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']
      : [],

    hover: {
      mode: isHoverEnabled ? 'nearest' : undefined,
      ...hoverConfig,
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
        type: 'category',
        labels: xLabels,
        offset: true,

        grid: {
          display: false,
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
            ...xTickFontConfig,
          },
        },
      },

      y: {
        ...yScaleConfig,
        type: 'category',
        labels: yLabels,
        offset: true,

        grid: {
          display: false,
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
            ...yTickFontConfig,
          },
        },
      },
    },

    plugins: {
      ...pluginOptions,

      heatmapCrosshair: {
        color: colors.axisLine,
        width: HEATMAP_CHART_CONFIG.crosshairWidth,
        dash: HEATMAP_CHART_CONFIG.crosshairDash,
        showHorizontal: true,
        showVertical: true,
        ...heatmapCrosshairConfig,
        enabled: crosshairEnabled,
      },

      legend: {
        display: false,
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
        enabled: isHoverEnabled,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltipConfig,

        callbacks: {
          label: (context: {
            readonly dataset: {
              readonly data: HeatmapPoint[];
            };
            readonly dataIndex: number;
          }): string => {
            const point = context.dataset.data[context.dataIndex];

            return `${point?.x ?? ''} / ${point?.y ?? ''}: ${point?.v ?? 0}`;
          },

          ...tooltipCallbacksConfig,
        },
      },

      datalabels: {
        display: showLabels,
        ...datalabelsConfig,

        color: (context: {
          readonly dataset: {
            readonly data: HeatmapPoint[];
          };
          readonly dataIndex: number;
        }): string => {
          const value = context.dataset.data[context.dataIndex]?.v ?? 0;

          return value >= HEATMAP_CHART_CONFIG.labelContrastThreshold
            ? colors.tooltipText
            : colors.axisText;
        },

        font: {
          weight: options?.boldLabels ? 'bold' : 'normal',
          size: HEATMAP_CHART_CONFIG.labelFontSize,
          ...datalabelsFontConfig,
        },

        formatter: (value: HeatmapPoint): number => value.v,
        anchor: 'center',
        align: 'center',
      },
    },

    onClick: options?.onClick,
  };
};