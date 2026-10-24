import type { Chart, Plugin } from 'chart.js';
import { Chart as ChartJSAuto } from 'chart.js/auto';
import {
  CandlestickController,
  CandlestickElement,
} from 'chartjs-chart-financial';

import { CANDLESTICK_CHART_CONFIG } from '../base/BaseCandlestickChart.constants';

import 'chartjs-adapter-date-fns';

type CrosshairPluginOptions = {
  readonly enabled?: boolean;
  readonly color?: string;
  readonly labelBackground?: string;
  readonly labelColor?: string;
};

type DrawLabelParams = {
  readonly chart: Chart;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly backgroundColor: string;
};

const drawLabel = ({
  chart,
  x,
  y,
  width,
  backgroundColor,
}: DrawLabelParams) => {
  const { ctx } = chart;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(
    x,
    y,
    width,
    CANDLESTICK_CHART_CONFIG.crosshairLabelHeight,
  );
};

const getLabelWidth = (
  chart: Chart,
  text: string,
): number =>
  chart.ctx.measureText(text).width +
  CANDLESTICK_CHART_CONFIG.crosshairLabelPadding * 2;

const candlestickCrosshairPlugin: Plugin = {
  id: 'candlestickCrosshair',
  afterDraw(
    chart,
    _args,
    pluginOptions: CrosshairPluginOptions,
  ) {
    const {
      enabled = true,
      color,
      labelBackground,
      labelColor,
    } = pluginOptions;

    if (
      !enabled ||
      !color ||
      !labelBackground ||
      !labelColor
    ) {
      return;
    }

    const tooltip = chart.tooltip;

    if (!tooltip || tooltip.opacity === 0) {
      return;
    }

    const x = tooltip.caretX;
    const y = tooltip.caretY;

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    const { ctx, chartArea } = chart;
    const yScale = chart.scales['y'];
    const xScale = chart.scales['x'];
    const price = yScale?.getValueForPixel(y);
    const time = xScale?.getValueForPixel(x);

    ctx.save();
    ctx.setLineDash(
      Array.from(CANDLESTICK_CHART_CONFIG.crosshairDash),
    );
    ctx.lineWidth =
      CANDLESTICK_CHART_CONFIG.crosshairLineWidth;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.font =
      CANDLESTICK_CHART_CONFIG.crosshairLabelFont;
    ctx.textBaseline = 'middle';

    if (typeof price === 'number') {
      const text = price.toFixed(2);
      const width = getLabelWidth(chart, text);
      const labelX = chartArea.right + 4;
      const labelY =
        y -
        CANDLESTICK_CHART_CONFIG.crosshairLabelHeight / 2;

      drawLabel({
        chart,
        x: labelX,
        y: labelY,
        width,
        backgroundColor: labelBackground,
      });

      ctx.fillStyle = labelColor;
      ctx.fillText(
        text,
        labelX +
        CANDLESTICK_CHART_CONFIG.crosshairLabelPadding,
        y,
      );
    }

    if (time !== undefined) {
      const text = new Date(
        Number(time),
      ).toLocaleDateString(undefined, {
        month: 'short',
        day: '2-digit',
      });

      const width = getLabelWidth(chart, text);
      const labelX = x - width / 2;
      const labelY = chartArea.bottom + 6;

      drawLabel({
        chart,
        x: labelX,
        y: labelY,
        width,
        backgroundColor: labelBackground,
      });

      ctx.fillStyle = labelColor;
      ctx.fillText(
        text,
        labelX +
        CANDLESTICK_CHART_CONFIG.crosshairLabelPadding,
        labelY +
        CANDLESTICK_CHART_CONFIG.crosshairLabelHeight / 2,
      );
    }

    ctx.restore();
  },
};

let isRegistered = false;

export const registerCandlestickChart = () => {
  if (isRegistered) {
    return;
  }

  ChartJSAuto.register(
    CandlestickController,
    CandlestickElement,
    candlestickCrosshairPlugin,
  );

  isRegistered = true;
};