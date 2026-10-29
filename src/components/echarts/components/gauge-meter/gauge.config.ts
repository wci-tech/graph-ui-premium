import type {
  EChartsOption,
  GaugeSeriesOption,
} from 'echarts';

import type { EChartsDefinition } from '@/components/echarts/ECharts.types';

import { GAUGE_METER_CONFIG } from './base/BaseGaugeMeter.constants';
import type {
  GaugeMeterOptions,
  GaugeMeterResolvedColors,
} from './GaugeMeter.types';

interface GaugeDefinition {
  readonly labels: string[];
  readonly data: number[];
  readonly value: number;
  readonly colors: GaugeMeterResolvedColors;
  readonly options?: GaugeMeterOptions;
}

const resolveGaugeDefinition = (
  definition: EChartsDefinition,
): GaugeDefinition | undefined => {
  const colors = definition['gaugeMeterColors'] as
    | GaugeMeterResolvedColors
    | undefined;

  if (!colors || colors.series.length === 0) {
    return undefined;
  }

  const labels = definition.labels ?? [];
  const data = (definition['data'] as number[] | undefined) ?? [];
  const value =
    typeof definition['value'] === 'number' ? definition['value'] : 0;

  const options = definition['gaugeMeterOptions'] as
    | GaugeMeterOptions
    | undefined;

  return {
    labels,
    data,
    value,
    colors,
    ...(options ? { options } : {}),
  };
};

const getTotal = (data: readonly number[]): number =>
  data.reduce((total, value) => total + Math.max(0, value), 0);

const createAxisColors = (
  data: readonly number[],
  colors: GaugeMeterResolvedColors,
): [number, string][] => {
  const total = getTotal(data);

  if (total <= 0) {
    return [[1, colors.axisLine]];
  }

  let cumulativeValue = 0;

  return data.map((value, index): [number, string] => {
    cumulativeValue += Math.max(0, value);

    const color =
      colors.series[index % colors.series.length] ?? colors.axisLine;

    return [
      Math.min(cumulativeValue / total, 1),
      color,
    ];
  });
};

const createGaugeSeries = ({
  labels,
  data,
  value,
  colors,
  options,
}: GaugeDefinition): GaugeSeriesOption => {
  const total = getTotal(data);
  const resolvedMax = options?.max ?? total;
  const max = resolvedMax > 0 ? resolvedMax : 100;
  const label = options?.label ?? labels[0] ?? 'Score';
  const unit = options?.unit ?? '';

  const gaugeData: NonNullable<GaugeSeriesOption['data']> = [
    {
      value,
      name: label,
    },
  ];

  const series: GaugeSeriesOption = {
    type: 'gauge',
    min: options?.min ?? GAUGE_METER_CONFIG.min,
    max,
    splitNumber: options?.splitNumber ?? GAUGE_METER_CONFIG.splitNumber,
    startAngle: options?.startAngle ?? GAUGE_METER_CONFIG.startAngle,
    endAngle: options?.endAngle ?? GAUGE_METER_CONFIG.endAngle,
    radius: options?.radius ?? GAUGE_METER_CONFIG.radius,
    center: options?.center ?? GAUGE_METER_CONFIG.center,
    animation: true,
    animationDuration: GAUGE_METER_CONFIG.animationDuration,
    animationDurationUpdate: GAUGE_METER_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',

    axisLine: {
      roundCap: false,
      lineStyle: {
        width:
          options?.axisLineWidth ??
          GAUGE_METER_CONFIG.axisLineWidth,
        color: createAxisColors(data, colors),
      },
    },

    pointer: {
      show: true,
      length:
        options?.pointerLength ??
        GAUGE_METER_CONFIG.pointerLength,
      width:
        options?.pointerWidth ??
        GAUGE_METER_CONFIG.pointerWidth,
      itemStyle: {
        color: colors.needle,
      },
    },

    anchor: {
      show: true,
      showAbove: true,
      size: GAUGE_METER_CONFIG.anchorSize,
      itemStyle: {
        color: colors.needle,
        borderWidth: 0,
      },
    },

    axisTick: {
      show: options?.showBoundaryLabels !== false,
      distance: GAUGE_METER_CONFIG.axisTickDistance,
      length: GAUGE_METER_CONFIG.axisTickLength,
      lineStyle: {
        color: colors.label,
        width: GAUGE_METER_CONFIG.axisTickWidth,
      },
    },

    splitLine: {
      show: options?.showBoundaryLabels !== false,
      distance: GAUGE_METER_CONFIG.splitLineDistance,
      length: GAUGE_METER_CONFIG.splitLineLength,
      lineStyle: {
        color: colors.label,
        width: GAUGE_METER_CONFIG.splitLineWidth,
      },
    },

    axisLabel: {
      show: options?.showBoundaryLabels !== false,
      distance: GAUGE_METER_CONFIG.axisLabelDistance,
      color: colors.label,
      fontSize: GAUGE_METER_CONFIG.axisLabelFontSize,
    },

    title: {
      show: true,
      offsetCenter: GAUGE_METER_CONFIG.titleOffsetCenter,
      color: colors.scoreLabel,
      fontSize: GAUGE_METER_CONFIG.titleFontSize,
      fontWeight: 400,
    },

    detail: {
      show: true,
      offsetCenter: GAUGE_METER_CONFIG.detailOffsetCenter,
      color: colors.score,
      fontSize: GAUGE_METER_CONFIG.detailFontSize,
      fontWeight: options?.boldScore === false ? 400 : 800,
      formatter: `{value}${unit}`,
    },

    data: gaugeData,
  };

  return series;
};

export const getGaugeConfig = (
  definition: EChartsDefinition,
): EChartsOption => {
  const gaugeDefinition = resolveGaugeDefinition(definition);

  if (!gaugeDefinition) {
    return {};
  }

  const { colors } = gaugeDefinition;

  return {
    animation: true,
    animationDuration: GAUGE_METER_CONFIG.animationDuration,
    animationDurationUpdate: GAUGE_METER_CONFIG.animationDuration,
    animationEasing: 'cubicOut',
    animationEasingUpdate: 'cubicOut',

    tooltip: {
      trigger: 'item',
      backgroundColor: colors.tooltipBackground,
      borderColor: colors.tooltipBorder,
      textStyle: {
        color: colors.tooltipText,
      },
      formatter: (params) => {
        const item = Array.isArray(params) ? params[0] : params;

        if (!item) {
          return '';
        }

        return `${String(item.name)}: ${String(item.value)}`;
      },
    },

    series: [
      createGaugeSeries(gaugeDefinition),
    ],
  };
};