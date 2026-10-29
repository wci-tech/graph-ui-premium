import type { EChartsOption, PieSeriesOption } from 'echarts';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import { PIE_CHART_CONFIG } from './base/BasePieChart.constants';

interface PieChartColors {
  readonly series: readonly string[];
  readonly label: string;
  readonly border: string;
  readonly crosshair: string;
  readonly tooltipBackground: string;
  readonly tooltipText: string;
  readonly tooltipBorder: string;
}

const getSeriesColor = (colors: PieChartColors, index: number): string => {
  const color = colors.series[index % colors.series.length];

  if (!color) {
    throw new Error('[PieChart] Unable to resolve series color.');
  }

  return color;
};

const createPieSeries = ({
  labels,
  data,
  colors,
}: {
  readonly labels: readonly string[];
  readonly data: readonly number[];
  readonly colors: PieChartColors;
}): PieSeriesOption => ({
  id: 'pie-series-0',
  name: 'Pie',
  type: 'pie',
  radius: PIE_CHART_CONFIG.radius,
  center: [...PIE_CHART_CONFIG.center],
  avoidLabelOverlap: true,
  animation: true,
  animationDuration: PIE_CHART_CONFIG.animationDuration,
  animationDurationUpdate: PIE_CHART_CONFIG.animationDuration,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicOut',
  itemStyle: {
    borderRadius: PIE_CHART_CONFIG.borderRadius,
    borderColor: colors.border,
    borderWidth: PIE_CHART_CONFIG.borderWidth,
  },
  emphasis: {
    focus: 'none',
    scale: true,
    scaleSize: PIE_CHART_CONFIG.emphasisScaleSize,
  },
  label: {
    show: true,
    position: 'outside',
    color: colors.label,
    formatter: '{b}: {d}%',
  },
  labelLine: {
    show: true,
    length: PIE_CHART_CONFIG.labelLineLength,
    length2: PIE_CHART_CONFIG.labelLineLength2,
  },
  data: labels.map((label, index) => ({
    name: label,
    value: data[index] ?? 0,
    itemStyle: {
      color: getSeriesColor(colors, index),
    },
  })),
});

const toNumericData = (data: readonly unknown[]): number[] =>
  data.map((value) => {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : 0;
    }

    const parsedValue = Number.parseFloat(String(value));

    return Number.isFinite(parsedValue) ? parsedValue : 0;
  });

export const getPieConfig = (definition: EChartsDefinition): EChartsOption => {
  const colors = definition['pieChartColors'] as PieChartColors | undefined;
  const data = definition['data'];

  if (!colors || colors.series.length === 0 || !Array.isArray(data)) {
    return {};
  }

  const labels = definition.labels ?? [];
  const numericData = toNumericData(data);

  const series: PieSeriesOption[] = [
    createPieSeries({
      labels,
      data: numericData,
      colors,
    }),
  ];

  const options: EChartsOption = {
    animation: true,
    animationThreshold: 10000,
    animationDuration: PIE_CHART_CONFIG.animationDuration,
    animationDurationUpdate: PIE_CHART_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <b>{c}</b> ({d}%)',
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      borderWidth: 1,
      textStyle: {
        color: colors.tooltipText,
      },
    },
    legend: {
      show: true,
      bottom: PIE_CHART_CONFIG.legend.bottom,
      left: PIE_CHART_CONFIG.legend.left,
      textStyle: {
        color: colors.label,
      },
    },
    series,
  };

  return options;
};