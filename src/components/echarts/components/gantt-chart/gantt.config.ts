import type {
  BarSeriesOption,
  EChartsOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import type {
  GanttChartDefinition,
  GanttChartResolvedTask,
} from './base/BaseGanttChart.utils';
import { GANTT_CHART_CONFIG } from './base/BaseGanttChart.constants';

const isRecord = (
  value: unknown,
): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value);

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

const formatDate = (
  value: number,
): string =>
  new Date(value).toLocaleDateString(
    [],
    {
      month: 'short',
      day: 'numeric',
    },
  );

const formatMonth = (
  value: number,
): string =>
  new Date(value).toLocaleDateString(
    [],
    {
      month: 'short',
      year: 'numeric',
    },
  );

const formatAxisDate = (
  value: number,
  timeUnit: 'day' | 'week' | 'month',
): string =>
  timeUnit === 'month'
    ? formatMonth(value)
    : formatDate(value);

const getTimeBounds = (
  tasks: GanttChartResolvedTask[],
): {
  readonly min?: number;
  readonly max?: number;
} => {
  if (tasks.length === 0) {
    return {};
  }

  const values = tasks.flatMap(
    (task) => [
      toTimestamp(task.start),
      toTimestamp(task.end),
    ],
  );

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

const createXAxis = ({
  tasks,
  colors,
  timeUnit,
}: {
  readonly tasks: GanttChartResolvedTask[];
  readonly colors: GanttChartDefinition['ganttChartColors'];
  readonly timeUnit: 'day' | 'week' | 'month';
}): XAXisComponentOption => {
  const { min, max } =
    getTimeBounds(tasks);

  return {
    type: 'value',
    ...(min !== undefined
      ? {
        min,
      }
      : {}),
    ...(max !== undefined
      ? {
        max,
      }
      : {}),
    boundaryGap: [
      ...GANTT_CHART_CONFIG.boundaryGap,
    ],
    axisLine: {
      show: true,
      lineStyle: {
        color: colors.axisLine,
        width:
          GANTT_CHART_CONFIG.axisLineWidth,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: colors.axisLine,
      },
    },
    axisLabel: {
      color: colors.axisText,
      margin:
        GANTT_CHART_CONFIG.axisLabelMargin,
      hideOverlap: true,
      formatter: (value: number) =>
        formatAxisDate(
          value,
          timeUnit,
        ),
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: colors.grid,
      },
    },
  };
};

const createYAxis = ({
  tasks,
  colors,
  boldLabels,
}: {
  readonly tasks: GanttChartResolvedTask[];
  readonly colors: GanttChartDefinition['ganttChartColors'];
  readonly boldLabels: boolean;
}): YAXisComponentOption => ({
  type: 'category',
  data: tasks.map(
    (task) => task.label,
  ),
  inverse: true,
  axisLine: {
    show: false,
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    show: true,
    color: colors.axisText,
    fontWeight: boldLabels
      ? 'bold'
      : 'normal',
    margin:
      GANTT_CHART_CONFIG.taskLabelMargin,
    width:
      GANTT_CHART_CONFIG.taskLabelWidth,
    overflow: 'truncate',
    align: 'right',
  },
});

const createPlaceholderSeries = (
  tasks: GanttChartResolvedTask[],
): BarSeriesOption => ({
  id: 'gantt-placeholder',
  name: 'Placeholder',
  type: 'bar',
  stack: 'gantt',
  silent: true,
  barMaxWidth:
    GANTT_CHART_CONFIG.barMaxWidth,
  barCategoryGap:
    GANTT_CHART_CONFIG.barCategoryGap,
  itemStyle: {
    color: 'transparent',
    borderColor: 'transparent',
  },
  emphasis: {
    disabled: true,
  },
  data: tasks.map(
    (task) =>
      toTimestamp(task.start),
  ),
});

const createDurationSeries = (
  tasks: GanttChartResolvedTask[],
): BarSeriesOption => ({
  id: 'gantt-duration',
  name: 'Project Roadmap',
  type: 'bar',
  stack: 'gantt',
  barMaxWidth:
    GANTT_CHART_CONFIG.barMaxWidth,
  barCategoryGap:
    GANTT_CHART_CONFIG.barCategoryGap,
  animation: true,
  animationDuration:
    GANTT_CHART_CONFIG.animationDuration,
  animationDurationUpdate:
    GANTT_CHART_CONFIG.animationDuration,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicOut',
  itemStyle: {
    borderRadius:
      GANTT_CHART_CONFIG.borderRadius,
    color: (params) =>
      tasks[params.dataIndex]?.color,
  },
  data: tasks.map(
    (task) =>
      toTimestamp(task.end) -
      toTimestamp(task.start),
  ),
});

export const getGanttConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const resolvedDefinition =
    definition as unknown as GanttChartDefinition;

  const {
    data: tasks,
    ganttChartColors: colors,
    ganttChartOptions: options,
  } = resolvedDefinition;

  if (
    !colors ||
    colors.series.length === 0
  ) {
    return {};
  }

  const timeUnit =
    options?.timeUnit ??
    GANTT_CHART_CONFIG.defaultTimeUnit;

  return {
    animation: true,
    animationDuration:
      GANTT_CHART_CONFIG.animationDuration,
    animationDurationUpdate:
      GANTT_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    grid: {
      left:
        GANTT_CHART_CONFIG.grid.left,
      right:
        GANTT_CHART_CONFIG.grid.right,
      top:
        GANTT_CHART_CONFIG.grid.top,
      bottom:
        GANTT_CHART_CONFIG.grid.bottom,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      backgroundColor:
        colors.tooltipBackground,
      borderColor:
        colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
      formatter: (params: unknown) => {
        if (!isRecord(params)) {
          return '';
        }

        const dataIndex = Number(
          params['dataIndex'],
        );

        const task =
          tasks[dataIndex];

        if (!task) {
          return '';
        }

        return `${task.label}<br />${formatDate(
          toTimestamp(task.start),
        )} - ${formatDate(
          toTimestamp(task.end),
        )}`;
      },
    },
    xAxis: createXAxis({
      tasks,
      colors,
      timeUnit,
    }),
    yAxis: createYAxis({
      tasks,
      colors,
      boldLabels:
        options?.boldLabels ?? false,
    }),
    dataZoom: [
      {
        type: 'slider',
        show: false,
        filterMode: 'weakFilter',
        start: 0,
        end: 100,
      },
    ],
    series: [
      createPlaceholderSeries(tasks),
      createDurationSeries(tasks),
    ],
  };
};