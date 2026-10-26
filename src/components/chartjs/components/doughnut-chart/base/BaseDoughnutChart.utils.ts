import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  DoughnutChartColors,
  DoughnutChartOptions,
  DoughnutChartResolvedColors,
} from '../DoughnutChart.types';

import { DOUGHNUT_CHART_CONFIG } from './BaseDoughnutChart.constants';

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

type DoughnutChartDataset = {
  readonly label: string;
  readonly data: number[];
  readonly backgroundColor: string[];
  readonly borderColor: string[];
  readonly borderWidth: number;
  readonly hoverOffset: number;
};

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
      `[DoughnutChart] Missing required CSS variable "${variableName}".`,
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
    return resolveColor(
      styles,
      resolvedColor,
    );
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(
      styles,
      fallback,
    );
  }

  throw new Error(
    `[DoughnutChart] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveDefaultSeriesColors = (
  styles: CSSStyleDeclaration,
): string[] =>
  CHART_COLOR_VARIABLES.map(
    (variableName) =>
      resolveColor(
        styles,
        resolveCssVariable(
          styles,
          variableName,
        ),
      ),
  );

const resolveSeriesColors = (
  styles: CSSStyleDeclaration,
  colors?: string[],
): string[] =>
  colors?.length
    ? colors.map((color) =>
      resolveColor(
        styles,
        color,
      ),
    )
    : resolveDefaultSeriesColors(styles);

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  color: string | undefined,
  variableName: string,
): string =>
  color
    ? resolveColor(
      styles,
      color,
    )
    : resolveColor(
      styles,
      resolveCssVariable(
        styles,
        variableName,
      ),
    );

export const resolveDoughnutChartColors = (
  element: HTMLElement,
  colors?: DoughnutChartColors,
): DoughnutChartResolvedColors => {
  const styles = getComputedStyle(element);

  const tooltipBackground = resolveTokenColor(
    styles,
    colors?.tooltipBackground,
    CHART_TOKEN_VARIABLES.tooltipBackground,
  );

  return {
    series: resolveSeriesColors(
      styles,
      colors?.series,
    ),
    border: colors?.border
      ? resolveColor(
        styles,
        colors.border,
      )
      : tooltipBackground,
    legendText: resolveTokenColor(
      styles,
      colors?.legendText,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    tooltipBackground,
    tooltipText: resolveTokenColor(
      styles,
      colors?.tooltipText,
      CHART_TOKEN_VARIABLES.tooltipText,
    ),
    tooltipBorder: resolveTokenColor(
      styles,
      colors?.tooltipBorder,
      CHART_TOKEN_VARIABLES.tooltipBorder,
    ),
  };
};

export const createDoughnutChartData = ({
  labels,
  data,
  colors,
}: {
  readonly labels: string[];
  readonly data: number[];
  readonly colors: DoughnutChartResolvedColors;
}): ChartJSData => {
  if (colors.series.length === 0) {
    throw new Error(
      '[DoughnutChart] At least one series color is required.',
    );
  }

  const dataset: DoughnutChartDataset = {
    label: 'Doughnut',
    data,
    backgroundColor: data.map(
      (_, index) => {
        const color =
          colors.series[
          index % colors.series.length
          ];

        if (!color) {
          throw new Error(
            '[DoughnutChart] Unable to resolve series color.',
          );
        }

        return color;
      },
    ),
    borderColor: data.map(
      () => colors.border,
    ),
    borderWidth:
      DOUGHNUT_CHART_CONFIG.borderWidth,
    hoverOffset:
      DOUGHNUT_CHART_CONFIG.hoverOffset,
  };

  return {
    labels,
    datasets: [dataset],
  } as unknown as ChartJSData;
};

export const createDoughnutChartOptions = ({
  options,
  colors,
}: {
  readonly options?: DoughnutChartOptions;
  readonly colors: DoughnutChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options)
    ? options
    : undefined;

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

  const tooltipConfig = getRecordConfig(
    pluginOptions,
    'tooltip',
  );

  const datalabelsConfig = getRecordConfig(
    pluginOptions,
    'datalabels',
  );

  return {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    cutout:
      options?.innerRadius ??
      DOUGHNUT_CHART_CONFIG.innerRadius,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      ...pluginOptions,
      legend: {
        ...legendConfig,
        position:
          legendConfig['position'] ??
          DOUGHNUT_CHART_CONFIG.legendPosition,
        labels: {
          color: colors.legendText,
          font: {
            weight: options?.boldLegends
              ? 'bold'
              : 'normal',
          },
          ...legendLabelsConfig,
        },
      },
      tooltip: {
        backgroundColor:
          colors.tooltipBackground,
        titleColor:
          colors.tooltipText,
        bodyColor:
          colors.tooltipText,
        borderColor:
          colors.tooltipBorder,
        ...tooltipConfig,
      },
      datalabels: {
        display: false,
        ...datalabelsConfig,
      },
    },
  };
};