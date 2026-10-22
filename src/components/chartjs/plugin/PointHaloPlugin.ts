import type { ChartType, Plugin } from 'chart.js';
import { PointElement } from 'chart.js';

export interface PointHaloPluginOptions {
  readonly enabled?: boolean;
  readonly radiusOffset?: number;
  readonly opacity?: number;
}

const DEFAULT_RADIUS_OFFSET = 6;
const DEFAULT_OPACITY = 0.2;

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(Math.max(value, minimum), maximum);

export const createPointHaloPlugin = ({
  enabled = true,
  radiusOffset = DEFAULT_RADIUS_OFFSET,
  opacity = DEFAULT_OPACITY,
}: PointHaloPluginOptions = {}): Plugin<ChartType> => ({
  id: 'pointHalo',

  beforeDatasetsDraw(chart) {
    if (!enabled) {
      return;
    }

    const resolvedRadiusOffset = Math.max(radiusOffset, 0);
    const resolvedOpacity = clamp(opacity, 0, 1);

    if (resolvedRadiusOffset === 0 || resolvedOpacity === 0) {
      return;
    }

    const activeElements = chart.getActiveElements();

    if (activeElements.length === 0) {
      return;
    }

    const { ctx } = chart;

    activeElements.forEach(({ element }) => {
      if (!(element instanceof PointElement)) {
        return;
      }

      const { x, y, skip, options } = element;

      if (skip || !Number.isFinite(x) || !Number.isFinite(y) || options.radius <= 0) {
        return;
      }

      const pointColor = options.backgroundColor;

      ctx.save();

      ctx.beginPath();

      ctx.arc(x, y, options.radius + resolvedRadiusOffset, 0, Math.PI * 2);

      ctx.globalAlpha = resolvedOpacity;
      ctx.fillStyle = pointColor;
      ctx.fill();

      ctx.restore();
    });
  },
});

export const PointHaloPlugin: Plugin<ChartType> = createPointHaloPlugin();

export default PointHaloPlugin;
