import type { LineChartAppearance } from '../LineChart.types';

export const LINE_CHART_CONFIG = {
    borderWidth: 3,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    tooltipCaretPadding: 14,
    haloRadiusOffset: 6,
    haloOpacity: 0.3,
    crosshairWidth: 1,
    crosshairDash: [5, 5],
} as const;

export const LINE_CHART_APPEARANCE_CONFIG: Record<
    LineChartAppearance,
    {
        borderDash: number[];
        stepped: boolean;
        tension: number;
    }
> = {
    solid: {
        borderDash: [],
        stepped: false,
        tension: 0,
    },
    smooth: {
        borderDash: [],
        stepped: false,
        tension: 0.4,
    },
    dashed: {
        borderDash: [10, 5],
        stepped: false,
        tension: 0,
    },
    dotted: {
        borderDash: [2, 4],
        stepped: false,
        tension: 0,
    },
    stepped: {
        borderDash: [],
        stepped: true,
        tension: 0,
    },
};