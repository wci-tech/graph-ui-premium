import type {
  TooltipItem,
} from 'chart.js';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  GanttChartColors,
  GanttChartOptions,
  GanttChartRange,
  GanttChartResolvedColors,
  GanttChartTask,
} from '../GanttChart.types';

import {
  GANTT_CHART_CONFIG,
  GANTT_CHART_DISPLAY_FORMATS,
} from './BaseGanttChart.constants';

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

type GanttChartDataset = {
  readonly data: GanttChartRange[];
  readonly backgroundColor: string[];
  readonly borderRadius: number;
  readonly borderSkipped: false;
  readonly barPercentage: number;
  readonly categoryPercentage: number;
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
      `[GanttChart] Missing required CSS variable "${variableName}".`,
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
    `[GanttChart] Unable to resolve CSS color variable "${variableName}".`,
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

export const resolveGanttChartColors = (
  element: HTMLElement,
  colors?: GanttChartColors,
): GanttChartResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series: resolveSeriesColors(
      styles,
      colors?.series,
    ),
    axisText: resolveTokenColor(
      styles,
      colors?.axisText,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    axisLine: resolveTokenColor(
      styles,
      colors?.axisLine,
      CHART_TOKEN_VARIABLES.axisLine,
    ),
    grid: resolveTokenColor(
      styles,
      colors?.grid,
      CHART_TOKEN_VARIABLES.grid,
    ),
    tooltipBackground: resolveTokenColor(
      styles,
      colors?.tooltipBackground,
      CHART_TOKEN_VARIABLES.tooltipBackground,
    ),
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

const toTimestamp = (
  value: string | number | Date,
): number => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === 'number') {
    return value;
  }

  return new Date(value).getTime();
};

export const getGanttLabels = (
  data: GanttChartTask[],
): string[] =>
  data.map((item) => item.label);

export const getGanttRanges = (
  data: GanttChartTask[],
): GanttChartRange[] =>
  data.map((item) => [
    toTimestamp(item.start),
    toTimestamp(item.end),
  ]);

const getGanttBounds = (
  ranges: GanttChartRange[],
): {
  readonly minTime?: number;
  readonly maxTime?: number;
} => {
  if (ranges.length === 0) {
    return {};
  }

  const starts = ranges.map(
    ([start]) => start,
  );

  const ends = ranges.map(
    ([, end]) => end,
  );

  const min = Math.min(...starts);
  const max = Math.max(...ends);

  const buffer =
    (max - min) *
    GANTT_CHART_CONFIG.boundsBufferRatio;

  return {
    minTime: min - buffer,
    maxTime: max + buffer,
  };
};

const resolveTaskColor = (
  task: GanttChartTask,
  index: number,
  colors: GanttChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (task.color) {
    return resolveColor(
      styles,
      task.color,
    );
  }

  const color =
    colors.series[
    index % colors.series.length
    ];

  if (!color) {
    throw new Error(
      '[GanttChart] At least one series color is required.',
    );
  }

  return color;
};

export const createGanttChartData = ({
  data,
  colors,
  rootElement,
}: {
  readonly data: GanttChartTask[];
  readonly colors: GanttChartResolvedColors;
  readonly rootElement: HTMLElement;
}): ChartJSData => {
  const labels = getGanttLabels(data);
  const ranges = getGanttRanges(data);
  const styles = getComputedStyle(rootElement);

  const dataset: GanttChartDataset = {
    data: ranges,
    backgroundColor: data.map(
      (task, index) =>
        resolveTaskColor(
          task,
          index,
          colors,
          styles,
        ),
    ),
    borderRadius:
      GANTT_CHART_CONFIG.borderRadius,
    borderSkipped: false,
    barPercentage:
      GANTT_CHART_CONFIG.barPercentage,
    categoryPercentage:
      GANTT_CHART_CONFIG.categoryPercentage,
  };

  return {
    labels,
    datasets: [dataset],
  } as unknown as ChartJSData;
};

export const createGanttChartOptions = ({
  data,
  options,
  colors,
}: {
  readonly data: GanttChartTask[];
  readonly options?: GanttChartOptions;
  readonly colors: GanttChartResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options)
    ? options
    : undefined;

  const labels = getGanttLabels(data);
  const ranges = getGanttRanges(data);

  const {
    minTime,
    maxTime,
  } = getGanttBounds(ranges);

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

  const xTimeConfig = getRecordConfig(
    xScaleConfig,
    'time',
  );

  const xGridConfig = getRecordConfig(
    xScaleConfig,
    'grid',
  );

  const xBorderConfig = getRecordConfig(
    xScaleConfig,
    'border',
  );

  const xTicksConfig = getRecordConfig(
    xScaleConfig,
    'ticks',
  );

  const yGridConfig = getRecordConfig(
    yScaleConfig,
    'grid',
  );

  const yBorderConfig = getRecordConfig(
    yScaleConfig,
    'border',
  );

  const yTicksConfig = getRecordConfig(
    yScaleConfig,
    'ticks',
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

  const tooltipCallbacksConfig =
    getRecordConfig(
      tooltipConfig,
      'callbacks',
    );

  const datalabelsConfig =
    getRecordConfig(
      pluginOptions,
      'datalabels',
    );

  const layoutConfig = getRecordConfig(
    optionRecord,
    'layout',
  );

  return {
    ...options,
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding:
        GANTT_CHART_CONFIG.layoutPadding,
      ...layoutConfig,
    },
    scales: {
      ...scalesConfig,
      x: {
        ...xScaleConfig,
        type: 'time',
        min: minTime,
        max: maxTime,
        time: {
          unit:
            options?.timeUnit ??
            GANTT_CHART_CONFIG.defaultTimeUnit,
          displayFormats:
            GANTT_CHART_DISPLAY_FORMATS,
          ...xTimeConfig,
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
          source: 'auto',
          autoSkip: true,
          maxTicksLimit:
            GANTT_CHART_CONFIG.maxTicksLimit,
          color: colors.axisText,
          font: {
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
          },
          ...xTicksConfig,
        },
      },
      y: {
        ...yScaleConfig,
        type: 'category',
        labels,
        grid: {
          display: false,
          ...yGridConfig,
        },
        border: {
          color: colors.axisLine,
          ...yBorderConfig,
        },
        ticks: {
          color: colors.axisText,
          font: {
            weight: options?.boldLabels
              ? 'bold'
              : 'normal',
            size:
              GANTT_CHART_CONFIG.yTickFontSize,
          },
          padding:
            GANTT_CHART_CONFIG.yTickPadding,
          ...yTicksConfig,
        },
      },
    },
    plugins: {
      ...pluginOptions,
      legend: {
        display: false,
        ...legendConfig,
      },
      tooltip: {
        enabled: true,
        backgroundColor:
          colors.tooltipBackground,
        titleColor:
          colors.tooltipText,
        bodyColor:
          colors.tooltipText,
        borderColor:
          colors.tooltipBorder,
        ...tooltipConfig,
        callbacks: {
          label: (
            context: TooltipItem<'bar'>,
          ) => {
            const raw = context.raw;

            if (!Array.isArray(raw)) {
              return '';
            }

            const [start, end] = raw;

            const startDate = new Date(
              Number(start),
            ).toLocaleDateString();

            const endDate = new Date(
              Number(end),
            ).toLocaleDateString();

            return `Duration: ${startDate} - ${endDate}`;
          },
          ...tooltipCallbacksConfig,
        },
      },
      datalabels: {
        display: false,
        ...datalabelsConfig,
      },
    },
    onClick: options?.onClick,
  };
};