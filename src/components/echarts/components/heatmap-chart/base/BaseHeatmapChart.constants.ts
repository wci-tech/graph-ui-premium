export const HEATMAP_CHART_CONFIG = {
    minValue: 0,
    maxValue: 100,
    minCellSizeRatio: 0.1,
    cellMinSizeRatio: 0.42,
    cellGap: 2,
    cellBorderRadius: 4,
    crosshairWidth: 1,
    emphasisShadowBlur: 10,
    emphasisShadowOpacity: 0.35,
    grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        bottom: '15%',
    },
    visualMap: {
        bottom: '0%',
    },
} as const;