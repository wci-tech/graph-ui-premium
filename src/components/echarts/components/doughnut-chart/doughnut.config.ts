import type { EChartsOption, PieSeriesOption } from 'echarts';

import { compactObject } from '@wci-tech/core-ui-premium';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import type {
  DoughnutChartOptions,
  DoughnutChartResolvedColors,
} from './DoughnutChart.types';
import { DOUGHNUT_CHART_CONFIG } from './base/BaseDoughnutChart.constants';
import type {
  DoughnutChartDefinition,
  DoughnutChartResolvedSeries,
} from './base/BaseDoughnutChart.utils';

const toNumber = (value: unknown): number => {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const resolveRadius = (
  value: string | number | undefined,
  fallback: string,
): string | number => value ?? fallback;

const resolveSeriesColor = (
  item: DoughnutChartResolvedSeries,
  index: number,
  colors: DoughnutChartResolvedColors,
): string => {
  if (item.color) {
    return item.color;
  }

  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error(
      '[DoughnutChart] At least one series color is required.',
    );
  }

  return color;
};

const createSeries = ({
  item,
  seriesIndex,
  labels,
  colors,
  options,
}: {
  readonly item: DoughnutChartResolvedSeries;
  readonly seriesIndex: number;
  readonly labels: readonly string[];
  readonly colors: DoughnutChartResolvedColors;
  readonly options?: DoughnutChartOptions;
}): PieSeriesOption => ({
  id: `doughnut-series-${seriesIndex}`,
  name: item.label,
  type: 'pie',
  radius: [
    resolveRadius(
      options?.innerRadius,
      DOUGHNUT_CHART_CONFIG.innerRadius,
    ),
    resolveRadius(
      options?.outerRadius,
      DOUGHNUT_CHART_CONFIG.outerRadius,
    ),
  ],
  center: [...DOUGHNUT_CHART_CONFIG.center],
  avoidLabelOverlap: true,
  animation: true,
  animationDuration: DOUGHNUT_CHART_CONFIG.animationDuration,
  animationDurationUpdate: DOUGHNUT_CHART_CONFIG.animationDuration,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicOut',
  itemStyle: {
    borderRadius: DOUGHNUT_CHART_CONFIG.borderRadius,
    borderColor: colors.border,
    borderWidth: DOUGHNUT_CHART_CONFIG.borderWidth,
  },
  label: {
    show: false,
    position: 'center',
    color: colors.legendText,
  },
  emphasis: {
    label: {
      show: true,
      fontSize: DOUGHNUT_CHART_CONFIG.emphasisFontSize,
      fontWeight: 'bold',
      color: colors.legendText,
    },
  },
  labelLine: {
    show: false,
  },
  data: labels.map((label, index) => ({
    name: label,
    value: toNumber(item.data[index] ?? 0),
    itemStyle: {
      color: resolveSeriesColor(
        item,
        index,
        colors,
      ),
    },
  })),
});

export const getDoughnutConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const resolvedDefinition =
    definition as unknown as DoughnutChartDefinition;

  const {
    labels,
    series,
    doughnutChartColors: colors,
    doughnutChartOptions: options,
  } = resolvedDefinition;

  if (
    !colors ||
    colors.series.length === 0 ||
    series.length === 0
  ) {
    return {};
  }

  return {
    animation: true,
    animationDuration: DOUGHNUT_CHART_CONFIG.animationDuration,
    animationDurationUpdate: DOUGHNUT_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <b>{c}</b> ({d}%)',
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
    },
    legend: {
      show: true,
      bottom: DOUGHNUT_CHART_CONFIG.legendBottom,
      textStyle: {
        color: colors.legendText,
        fontWeight: options?.boldLabels
          ? 'bold'
          : 'normal',
      },
    },
    series: series.map((item, index) =>
      createSeries(
        compactObject({
          item,
          seriesIndex: index,
          labels,
          colors,
          options,
        }),
      ),
    ),
  };
};