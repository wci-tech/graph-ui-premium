import type { Chart, Plugin } from 'chart.js';

export interface CrosshairPluginOptions {
    enabled?: boolean;
    color?: string;
    lineWidth?: number;
    lineDash?: number[];
    showHorizontal?: boolean;
    showVertical?: boolean;
}

interface CrosshairPosition {
    x: number;
    y: number;
}

const DEFAULT_LINE_WIDTH = 1;
const DEFAULT_LINE_DASH = [4, 4];

const getActivePosition = (chart: Chart): CrosshairPosition | null => {
    const tooltip = chart.tooltip;

    if (!tooltip || tooltip.opacity === 0) {
        return null;
    }

    const { caretX: x, caretY: y } = tooltip;

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return null;
    }

    return { x, y };
};

export const CrosshairPlugin: Plugin = {
    id: 'crosshair',

    afterDraw(chart: Chart, _args, options: CrosshairPluginOptions) {
        if (options.enabled !== true) {
            return;
        }

        const position = getActivePosition(chart);

        if (!position) {
            return;
        }

        const { ctx, chartArea } = chart;
        const { x, y } = position;

        ctx.save();
        ctx.strokeStyle = options.color ?? 'currentColor';
        ctx.lineWidth = options.lineWidth ?? DEFAULT_LINE_WIDTH;
        ctx.setLineDash(options.lineDash ?? DEFAULT_LINE_DASH);

        if (options.showVertical !== false) {
            ctx.beginPath();
            ctx.moveTo(x, chartArea.top);
            ctx.lineTo(x, chartArea.bottom);
            ctx.stroke();
        }

        if (options.showHorizontal !== false) {
            ctx.beginPath();
            ctx.moveTo(chartArea.left, y);
            ctx.lineTo(chartArea.right, y);
            ctx.stroke();
        }

        ctx.restore();
    },
};

export default CrosshairPlugin;