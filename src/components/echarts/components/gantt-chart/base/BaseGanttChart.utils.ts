import type {
  DataZoomComponentOption,
  EChartsOption,
  SeriesOption,
} from 'echarts';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';

import type {
  GanttChartColors,
  GanttChartOptions,
  GanttChartResolvedColors,
  GanttChartTask,
} from '../GanttChart.types';

export interface GanttChartResolvedTask
  extends GanttChartTask {
  readonly color: string;
}

export interface GanttChartDefinition {
  readonly type: 'gantt';
  readonly data: GanttChartResolvedTask[];
  readonly ganttChartColors: GanttChartResolvedColors;
  readonly ganttChartOptions?: GanttChartOptions;
}

const CHART_NAME = 'GanttChart';

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value);

const asRecord = (
  value: unknown,
): Record<string, unknown> =>
  isRecord(value)
    ? value
    : {};

const resolveCssVariable = (
  styles: CSSStyleDeclaration,
  variableName: string,
): string => {
  const value = styles
    .getPropertyValue(variableName)
    .trim();

  if (!value) {
    throw new Error(
      `[${CHART_NAME}] Missing required CSS variable "${variableName}".`,
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
    `[${CHART_NAME}] Unable to resolve CSS color variable "${variableName}".`,
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
    : resolveDefaultSeriesColors(
      styles,
    );

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
  const styles =
    getComputedStyle(element);

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

    tooltipBackground:
      resolveTokenColor(
        styles,
        colors?.tooltipBackground,
        CHART_TOKEN_VARIABLES.tooltipBackground,
      ),

    tooltipText: resolveTokenColor(
      styles,
      colors?.tooltipText,
      CHART_TOKEN_VARIABLES.tooltipText,
    ),

    tooltipBorder:
      resolveTokenColor(
        styles,
        colors?.tooltipBorder,
        CHART_TOKEN_VARIABLES.tooltipBorder,
      ),
  };
};

const resolveTasks = (
  element: HTMLElement,
  data: GanttChartTask[],
  colors: GanttChartResolvedColors,
): GanttChartResolvedTask[] => {
  const styles =
    getComputedStyle(element);

  if (colors.series.length === 0) {
    throw new Error(
      '[GanttChart] At least one series color is required.',
    );
  }

  return data.map(
    (task, index) => {
      const paletteColor =
        colors.series[
        index %
        colors.series.length
        ];

      if (!paletteColor) {
        throw new Error(
          '[GanttChart] Unable to resolve series color.',
        );
      }

      return {
        ...task,

        color: task.color
          ? resolveColor(
            styles,
            task.color,
          )
          : paletteColor,
      };
    },
  );
};

export const createGanttChartDefinition = ({
  element,
  data,
  colors,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: GanttChartTask[];
  readonly colors: GanttChartResolvedColors;
  readonly options?: GanttChartOptions;
}): GanttChartDefinition => ({
  type: 'gantt',

  data: resolveTasks(
    element,
    data,
    colors,
  ),

  ganttChartColors: colors,

  ...(options
    ? {
      ganttChartOptions: options,
    }
    : {}),
});

const getDataZoom = (
  generatedDataZoom:
    EChartsOption['dataZoom'],
  customDataZoom:
    EChartsOption['dataZoom'],
):
  | DataZoomComponentOption
  | DataZoomComponentOption[]
  | undefined =>
  customDataZoom !== undefined
    ? customDataZoom
    : generatedDataZoom;

const getSeries = (
  generatedSeries:
    EChartsOption['series'],
  customSeries:
    EChartsOption['series'],
):
  | SeriesOption
  | SeriesOption[]
  | undefined =>
  customSeries !== undefined
    ? customSeries
    : generatedSeries;

export const mergeGanttChartOptions = (
  generatedOptions: EChartsOption,
  options?: GanttChartOptions,
): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const {
    timeUnit: _timeUnit,
    boldLabels: _boldLabels,
    isBoxVisible: _isBoxVisible,
    grid,
    xAxis,
    yAxis,
    tooltip,
    toolbox,
    dataZoom,
    series,
    ...rest
  } = options;

  const mergedOptions: EChartsOption = {
    ...generatedOptions,
    ...rest,

    grid: {
      ...asRecord(
        generatedOptions.grid,
      ),
      ...asRecord(grid),
    },

    xAxis: {
      ...asRecord(
        generatedOptions.xAxis,
      ),
      ...asRecord(xAxis),
    },

    yAxis: {
      ...asRecord(
        generatedOptions.yAxis,
      ),
      ...asRecord(yAxis),
    },

    tooltip: {
      ...asRecord(
        generatedOptions.tooltip,
      ),
      ...asRecord(tooltip),
    },

    toolbox: {
      ...asRecord(
        generatedOptions.toolbox,
      ),
      ...asRecord(toolbox),
    },
  };

  const resolvedDataZoom =
    getDataZoom(
      generatedOptions.dataZoom,
      dataZoom,
    );

  const resolvedSeries =
    getSeries(
      generatedOptions.series,
      series,
    );

  if (
    resolvedDataZoom !== undefined
  ) {
    mergedOptions.dataZoom =
      resolvedDataZoom;
  }

  if (
    resolvedSeries !== undefined
  ) {
    mergedOptions.series =
      resolvedSeries;
  }

  return mergedOptions;
};