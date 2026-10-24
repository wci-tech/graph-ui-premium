import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  CandlestickChartColors,
  CandlestickChartOptions,
  CandlestickChartPoint,
  CandlestickChartResolvedColors,
} from '../CandlestickChart.types';

import { CANDLESTICK_CHART_CONFIG } from './BaseCandlestickChart.constants';

type FinancialCandleColor = {
  readonly up: string;
  readonly down: string;
  readonly unchanged: string;
};

type FinancialCandlestickPoint = {
  readonly x: number;
  readonly o: number;
  readonly h: number;
  readonly l: number;
  readonly c: number;
};

type FinancialCandlestickDataset = {
  readonly type: 'candlestick';
  readonly label: string;
  readonly yAxisID: string;
  readonly data: FinancialCandlestickPoint[];
  readonly color: FinancialCandleColor;
  readonly backgroundColors: FinancialCandleColor;
  readonly borderColors: FinancialCandleColor;
  readonly wickColor: FinancialCandleColor;
};

type VolumeDataset = {
  readonly type: 'bar';
  readonly label: string;
  readonly yAxisID: string;
  readonly data: Array<{
    readonly x: number;
    readonly y: number;
  }>;
  readonly backgroundColor: string[];
  readonly borderWidth: number;
  readonly barPercentage: number;
  readonly categoryPercentage: number;
  readonly order: number;
};

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value);

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
  const value = styles
    .getPropertyValue(variableName)
    .trim();

  if (!value) {
    throw new Error(
      `[CandlestickChart] Missing required CSS variable "${variableName}".`,
    );
  }

  return value;
};

const resolveColor = (
  styles: CSSStyleDeclaration,
  color: string,
): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(
    CSS_VARIABLE_PATTERN,
  );

  if (!match) {
    return normalizedColor;
  }

  const variableName = match[1];

  if (!variableName) {
    return normalizedColor;
  }

  const resolvedColor = styles
    .getPropertyValue(variableName)
    .trim();

  if (resolvedColor) {
    return resolveColor(styles, resolvedColor);
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(styles, fallback);
  }

  throw new Error(
    `[CandlestickChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  variableName: string,
  override?: string,
): string =>
  resolveColor(
    styles,
    override ??
    resolveCssVariable(styles, variableName),
  );

export const resolveCandlestickChartColors = (
  element: HTMLElement,
  colors?: CandlestickChartColors,
): CandlestickChartResolvedColors => {
  const styles = getComputedStyle(element);

  const up = resolveTokenColor(
    styles,
    CHART_COLOR_VARIABLES[2],
    colors?.up,
  );

  const down = resolveTokenColor(
    styles,
    CHART_COLOR_VARIABLES[4],
    colors?.down,
  );

  const unchanged = resolveTokenColor(
    styles,
    CHART_TOKEN_VARIABLES.axisText,
    colors?.unchanged,
  );

  return {
    up,
    down,
    unchanged,
    volumeUp: resolveColor(
      styles,
      colors?.volumeUp ?? up,
    ),
    volumeDown: resolveColor(
      styles,
      colors?.volumeDown ?? down,
    ),
    axisText: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.axisText,
      colors?.axisText,
    ),
    axisLine: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.axisLine,
      colors?.axisLine,
    ),
    grid: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.grid,
      colors?.grid,
    ),
    crosshair: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.axisText,
      colors?.crosshair,
    ),
    crosshairLabelBackground:
      resolveTokenColor(
        styles,
        CHART_TOKEN_VARIABLES.tooltipBackground,
        colors?.crosshairLabelBackground,
      ),
    crosshairLabelText: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipText,
      colors?.crosshairLabelText,
    ),
    tooltipBackground: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipBackground,
      colors?.tooltipBackground,
    ),
    tooltipText: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipText,
      colors?.tooltipText,
    ),
    tooltipBorder: resolveTokenColor(
      styles,
      CHART_TOKEN_VARIABLES.tooltipBorder,
      colors?.tooltipBorder,
    ),
  };
};

const toTimestamp = (
  value: CandlestickChartPoint['t'],
): number => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === 'number') {
    return value;
  }

  return new Date(value).getTime();
};

const toNumber = (
  value: string | number,
): number =>
  Number.parseFloat(String(value));

const toFinancialDataPoint = (
  point: CandlestickChartPoint,
): FinancialCandlestickPoint => ({
  x: toTimestamp(point.t),
  o: toNumber(point.o),
  h: toNumber(point.h),
  l: toNumber(point.l),
  c: toNumber(point.c),
});

const getDefaultVolumeScaleMax = (
  data: CandlestickChartPoint[],
): number => {
  const maxVolume = Math.max(
    ...data.map((item) => toNumber(item.v)),
  );

  const resolvedMax =
    Number.isFinite(maxVolume) && maxVolume > 0
      ? maxVolume
      : 1;

  return (
    resolvedMax *
    CANDLESTICK_CHART_CONFIG.volumeScaleMultiplier
  );
};

export const createCandlestickChartOptions = ({
  data,
  options,
  colors,
}: {
  readonly data: CandlestickChartPoint[];
  readonly options?: CandlestickChartOptions;
  readonly colors: CandlestickChartResolvedColors;
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

  const volumeScaleConfig = getRecordConfig(
    scalesConfig,
    'volume',
  );

  const pluginOptions = getRecordConfig(
    optionRecord,
    'plugins',
  );

  const legendConfig = getRecordConfig(
    pluginOptions,
    'legend',
  );

  const tooltipConfig = getRecordConfig(
    pluginOptions,
    'tooltip',
  );

  return {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    parsing: false,
    interaction: {
      mode: 'index',
      intersect: false,
      axis: 'x',
      ...getRecordConfig(
        optionRecord,
        'interaction',
      ),
    },
    scales: {
      x: {
        ...xScaleConfig,
        type: 'time',
        time: {
          unit: options?.timeUnit ?? 'day',
          ...getRecordConfig(
            xScaleConfig,
            'time',
          ),
        },
        border: {
          display: true,
          color: colors.axisLine,
          ...getRecordConfig(
            xScaleConfig,
            'border',
          ),
        },
        grid: {
          display: true,
          drawTicks: true,
          color: colors.grid,
          ...getRecordConfig(
            xScaleConfig,
            'grid',
          ),
        },
        ticks: {
          color: colors.axisText,
          font: {
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
          },
          ...getRecordConfig(
            xScaleConfig,
            'ticks',
          ),
        },
      },
      y: {
        ...yScaleConfig,
        beginAtZero: false,
        position:
          yScaleConfig['position'] ?? 'right',
        border: {
          display: true,
          color: colors.axisLine,
          ...getRecordConfig(
            yScaleConfig,
            'border',
          ),
        },
        grid: {
          display: true,
          drawTicks: true,
          color: colors.grid,
          ...getRecordConfig(
            yScaleConfig,
            'grid',
          ),
        },
        ticks: {
          color: colors.axisText,
          font: {
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
          },
          ...getRecordConfig(
            yScaleConfig,
            'ticks',
          ),
        },
      },
      volume: {
        type: 'linear',
        position: 'right',
        display: false,
        min: 0,
        max: getDefaultVolumeScaleMax(data),
        ...volumeScaleConfig,
        grid: {
          display: false,
          ...getRecordConfig(
            volumeScaleConfig,
            'grid',
          ),
        },
      },
    },
    plugins: {
      ...pluginOptions,
      candlestickCrosshair: {
        enabled: options?.crosshair ?? true,
        color: colors.crosshair,
        labelBackground:
          colors.crosshairLabelBackground,
        labelColor:
          colors.crosshairLabelText,
        ...getRecordConfig(
          pluginOptions,
          'candlestickCrosshair',
        ),
      },
      legend: {
        ...legendConfig,
        display: options?.showLegend ?? false,
        labels: {
          color: colors.axisText,
          font: {
            weight: options?.boldLegends
              ? 'bold'
              : 'normal',
          },
          ...getRecordConfig(
            legendConfig,
            'labels',
          ),
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor:
          colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        ...tooltipConfig,
      },
      datalabels: {
        display: false,
        ...getRecordConfig(
          pluginOptions,
          'datalabels',
        ),
      },
    },
  };
};

export const createCandlestickChartData = ({
  data,
  colors,
}: {
  readonly data: CandlestickChartPoint[];
  readonly colors: CandlestickChartResolvedColors;
}): ChartJSData => {
  const candleColors: FinancialCandleColor = {
    up: colors.up,
    down: colors.down,
    unchanged: colors.unchanged,
  };

  const candleDataset: FinancialCandlestickDataset = {
    type: 'candlestick',
    label: 'OHLC',
    yAxisID: 'y',
    data: data.map(toFinancialDataPoint),
    color: candleColors,
    backgroundColors: candleColors,
    borderColors: candleColors,
    wickColor: candleColors,
  };

  const volumeDataset: VolumeDataset = {
    type: 'bar',
    label: 'Volume',
    yAxisID: 'volume',
    data: data.map((item) => ({
      x: toTimestamp(item.t),
      y: toNumber(item.v),
    })),
    backgroundColor: data.map((item) =>
      toNumber(item.c) >= toNumber(item.o)
        ? colors.volumeUp
        : colors.volumeDown,
    ),
    borderWidth: 0,
    barPercentage:
      CANDLESTICK_CHART_CONFIG.volumeBarPercentage,
    categoryPercentage:
      CANDLESTICK_CHART_CONFIG.volumeCategoryPercentage,
    order: CANDLESTICK_CHART_CONFIG.volumeOrder,
  };

  return {
    datasets: [
      volumeDataset,
      candleDataset,
    ],
  } as unknown as ChartJSData;
};