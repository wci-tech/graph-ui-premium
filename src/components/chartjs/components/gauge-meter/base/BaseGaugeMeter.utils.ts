import type { ArcElement, Chart, Plugin } from 'chart.js';

import {
  CHART_COLOR_VARIABLES,
  CHART_TOKEN_VARIABLES,
} from '@/common/constants/Chart.colors';
import type {
  ChartJSData,
  ChartJSOptions,
} from '@/components/chartjs/ChartJS.types';

import type {
  GaugeMeterColors,
  GaugeMeterOptions,
  GaugeMeterResolvedColors,
} from '../GaugeMeter.types';

import { GAUGE_METER_CONFIG } from './BaseGaugeMeter.constants';

const CSS_VARIABLE_PATTERN =
  /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

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
      `[GaugeMeter] Missing required CSS variable "${variableName}".`,
    );
  }

  return value;
};

const resolveColor = (
  styles: CSSStyleDeclaration,
  color: string,
): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(CSS_VARIABLE_PATTERN);

  if (!match) {
    return normalizedColor;
  }

  const variableName = match[1];

  if (!variableName) {
    return normalizedColor;
  }

  const resolvedColor = styles.getPropertyValue(variableName).trim();

  if (resolvedColor) {
    return resolveColor(styles, resolvedColor);
  }

  const fallback = match[2]?.trim();

  if (fallback) {
    return resolveColor(styles, fallback);
  }

  throw new Error(
    `[GaugeMeter] Unable to resolve CSS color variable "${variableName}".`,
  );
};

const resolveTokenColor = (
  styles: CSSStyleDeclaration,
  color: string | undefined,
  variableName: string,
): string =>
  color
    ? resolveColor(styles, color)
    : resolveColor(styles, resolveCssVariable(styles, variableName));

const resolveSeriesColors = (
  styles: CSSStyleDeclaration,
  colors?: readonly string[],
): readonly string[] =>
  colors?.length
    ? colors.map((color) => resolveColor(styles, color))
    : CHART_COLOR_VARIABLES.map((variableName) =>
      resolveColor(styles, resolveCssVariable(styles, variableName)),
    );

export const resolveGaugeMeterColors = (
  element: HTMLElement,
  colors?: GaugeMeterColors,
): GaugeMeterResolvedColors => {
  const styles = getComputedStyle(element);

  return {
    series: resolveSeriesColors(styles, colors?.series),
    needle: resolveTokenColor(
      styles,
      colors?.needle,
      CHART_TOKEN_VARIABLES.axisLine,
    ),
    label: resolveTokenColor(
      styles,
      colors?.label,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    score: resolveTokenColor(
      styles,
      colors?.score,
      CHART_TOKEN_VARIABLES.axisText,
    ),
    scoreLabel: resolveTokenColor(
      styles,
      colors?.scoreLabel,
      CHART_TOKEN_VARIABLES.axisText,
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

export const getGaugeMeterTotal = (data: readonly number[]): number =>
  data.reduce((total, value) => total + Math.max(0, value), 0);

export const resolveGaugeMeterValue = (
  data: readonly number[],
  value?: number,
): number => {
  const total = getGaugeMeterTotal(data);
  const resolvedValue = value ?? data[0] ?? 0;
  const minimumValue = Math.max(resolvedValue, 0);

  return total > 0 ? Math.min(minimumValue, total) : minimumValue;
};

const getGaugeDataset = (chart: Chart<'doughnut'>): number[] => {
  const dataset = chart.data.datasets[0]?.data ?? [];

  return dataset.filter(
    (value): value is number => typeof value === 'number',
  );
};

const getFirstArc = (
  chart: Chart<'doughnut'>,
): ArcElement | undefined =>
  chart.getDatasetMeta(0).data[0] as ArcElement | undefined;

export const createGaugeMeterData = ({
  labels,
  data,
  colors,
}: {
  readonly labels: string[];
  readonly data: number[];
  readonly colors: GaugeMeterResolvedColors;
}): ChartJSData => {
  const backgroundColor = data.map(
    (_, index) => colors.series[index % colors.series.length],
  );

  return {
    labels: Array.from(labels),
    datasets: [
      {
        label: 'Gauge',
        data: Array.from(data),
        backgroundColor,
        borderColor: 'transparent',
        borderWidth: 0,
        hoverBorderWidth: 0,
        hoverOffset: 0,
        spacing: 0,
      },
    ],
  } as unknown as ChartJSData;
};

export const createGaugeMeterOptions = ({
  options,
  colors,
}: {
  readonly options?: GaugeMeterOptions;
  readonly colors: GaugeMeterResolvedColors;
}): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;
  const pluginOptions = getRecordConfig(optionRecord, 'plugins');
  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const layoutConfig = getRecordConfig(optionRecord, 'layout');
  const paddingConfig = getRecordConfig(layoutConfig, 'padding');

  return {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    rotation: GAUGE_METER_CONFIG.rotation,
    circumference: GAUGE_METER_CONFIG.circumference,
    cutout: options?.cutout ?? GAUGE_METER_CONFIG.cutout,
    events: [],
    layout: {
      ...layoutConfig,
      padding: {
        ...GAUGE_METER_CONFIG.layoutPadding,
        ...paddingConfig,
      },
    },
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
        display: false,
      },
      tooltip: {
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        ...tooltipConfig,
        enabled: false,
      },
      datalabels: {
        ...datalabelsConfig,
        display: false,
      },
    },
  };
};

const createNeedlePlugin = ({
  value,
  color,
}: {
  readonly value: number;
  readonly color: string;
}): Plugin<'doughnut'> => ({
  id: 'gaugeNeedle',

  afterDatasetsDraw(chart) {
    const dataset = getGaugeDataset(chart);
    const total = getGaugeMeterTotal(dataset);
    const firstArc = getFirstArc(chart);

    if (!firstArc || total <= 0) {
      return;
    }

    const clampedValue = Math.min(Math.max(value, 0), total);
    const angle = Math.PI + Math.PI * (clampedValue / total);
    const centerX = firstArc.x;
    const centerY =
      firstArc.y - GAUGE_METER_CONFIG.needleCenterOffset;
    const needleLength =
      firstArc.outerRadius * GAUGE_METER_CONFIG.needleLengthRatio;
    const needleHalfWidth = Math.max(
      GAUGE_METER_CONFIG.needleMinHalfWidth,
      firstArc.outerRadius * GAUGE_METER_CONFIG.needleWidthRatio,
    );
    const pivotRadius = Math.max(
      GAUGE_METER_CONFIG.pivotMinRadius,
      firstArc.outerRadius * GAUGE_METER_CONFIG.pivotRadiusRatio,
    );

    const { ctx } = chart;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, -needleHalfWidth);
    ctx.lineTo(needleLength, 0);
    ctx.lineTo(0, needleHalfWidth);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, pivotRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
  },
});

const resolveCanvasColor = (
  chart: Chart<'doughnut'>,
  color: string,
): string => {
  const styles = getComputedStyle(chart.canvas);
  const match = color.trim().match(CSS_VARIABLE_PATTERN);

  if (!match) {
    return color;
  }

  const variableName = match[1];

  if (!variableName) {
    return color;
  }

  const resolvedColor = styles.getPropertyValue(variableName).trim();

  if (resolvedColor) {
    return resolvedColor;
  }

  return match[2]?.trim() ?? color;
};

const createScalePlugin = ({
  options,
  colors,
}: {
  readonly options?: GaugeMeterOptions;
  readonly colors: GaugeMeterResolvedColors;
}): Plugin<'doughnut'> => ({
  id: 'gaugeScale',

  afterDraw(chart) {
    if (options?.showBoundaryLabels === false) {
      return;
    }

    const dataset = getGaugeDataset(chart);
    const total = getGaugeMeterTotal(dataset);
    const firstArc = getFirstArc(chart);

    if (!firstArc || total <= 0) {
      return;
    }

    const { ctx } = chart;
    const {
      scaleDivisions,
      scaleLabelFontSize,
      scaleTickLength,
      scaleTickWidth,
      scaleLabelRadiusRatio,
      scaleTickOuterRadiusRatio,
      scaleTickInnerRadiusRatio,
    } = GAUGE_METER_CONFIG;

    const centerX = firstArc.x;
    const centerY = firstArc.y;
    const outerRadius = firstArc.outerRadius;
    const labelRadius = outerRadius * scaleLabelRadiusRatio;
    const tickOuterRadius = outerRadius * scaleTickOuterRadiusRatio;
    const tickInnerRadius =
      tickOuterRadius -
      Math.min(
        scaleTickLength,
        outerRadius *
        (scaleTickOuterRadiusRatio - scaleTickInnerRadiusRatio),
      );

    const labelColor = options?.boundaryLabelColor
      ? resolveCanvasColor(chart, options.boundaryLabelColor)
      : colors.label;

    ctx.save();
    ctx.fillStyle = labelColor;
    ctx.strokeStyle = labelColor;
    ctx.lineWidth = scaleTickWidth;
    ctx.font = `400 ${scaleLabelFontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (
      let index = 0;
      index <= scaleDivisions;
      index += 1
    ) {
      const ratio = index / scaleDivisions;
      const angle = Math.PI + Math.PI * ratio;
      const valueAtTick = Math.round(total * ratio);

      const tickOuterX =
        centerX + Math.cos(angle) * tickOuterRadius;
      const tickOuterY =
        centerY + Math.sin(angle) * tickOuterRadius;
      const tickInnerX =
        centerX + Math.cos(angle) * tickInnerRadius;
      const tickInnerY =
        centerY + Math.sin(angle) * tickInnerRadius;

      ctx.beginPath();
      ctx.moveTo(tickOuterX, tickOuterY);
      ctx.lineTo(tickInnerX, tickInnerY);
      ctx.stroke();

      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;

      ctx.fillText(
        String(valueAtTick),
        labelX,
        labelY,
      );
    }

    ctx.restore();
  },
});

const createSegmentLabelsPlugin = ({
  options,
  colors,
}: {
  readonly options?: GaugeMeterOptions;
  readonly colors: GaugeMeterResolvedColors;
}): Plugin<'doughnut'> => ({
  id: 'gaugeSegmentLabels',

  afterDraw(chart) {
    if (options?.showSegmentLabels !== true) {
      return;
    }

    const dataset = getGaugeDataset(chart);
    const total = getGaugeMeterTotal(dataset);
    const firstArc = getFirstArc(chart);

    if (!firstArc || total <= 0) {
      return;
    }

    const { ctx } = chart;

    const labelColor = options?.segmentLabelColor
      ? resolveCanvasColor(chart, options.segmentLabelColor)
      : colors.label;

    let cumulative = 0;

    ctx.save();
    ctx.font = `700 ${GAUGE_METER_CONFIG.segmentLabelFontSize}px sans-serif`;
    ctx.fillStyle = labelColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    dataset.forEach((segmentValue, index) => {
      cumulative += Math.max(0, segmentValue);

      if (index === dataset.length - 1) {
        return;
      }

      const angle =
        Math.PI + Math.PI * (cumulative / total);
      const radius =
        firstArc.outerRadius *
        GAUGE_METER_CONFIG.segmentLabelRadiusRatio;

      ctx.fillText(
        String(cumulative),
        firstArc.x + Math.cos(angle) * radius,
        firstArc.y + Math.sin(angle) * radius,
      );
    });

    ctx.restore();
  },
});

export const createGaugeMeterPlugins = ({
  value,
  colors,
  options,
}: {
  readonly value: number;
  readonly colors: GaugeMeterResolvedColors;
  readonly options?: GaugeMeterOptions;
}): Plugin<'doughnut'>[] => [
    createNeedlePlugin({
      value,
      color: colors.needle,
    }),
    createScalePlugin({
      ...(options ? { options } : {}),
      colors,
    }),
    createSegmentLabelsPlugin({
      ...(options ? { options } : {}),
      colors,
    }),
  ];