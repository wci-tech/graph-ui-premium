export const STACKED_AREA_CHART_CONFIG = {
    stackId: 'stacked-area-total',
    lineWidth: 3,
    pointRadius: 10,
    pointHoverScale: 1.35,
    haloRadius: 10,
    haloOpacity: 0.3,
    gradientStartOpacity: 0.6,
    gradientEndOpacity: 0.07,
    animationDuration: 1800,
    legend: {
        top: 8,
        itemWidth: 14,
        itemHeight: 10,
        itemGap: 16,
    },
    grid: {
        left: 8,
        right: 8,
        top: 36,
        bottom: 0,
    },
} as const;