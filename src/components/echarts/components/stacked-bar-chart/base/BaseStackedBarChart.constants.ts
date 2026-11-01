export const STACKED_BAR_CHART_CONFIG = {
    stackId: 'total',
    maxBarWidth: 40,
    borderRadius: 6,
    animationDuration: 1800,
    legend: {
        bottom: 0,
    },
    grid: {
        vertical: {
            left: '3%',
            right: '4%',
            top: '12%',
            bottom: '12%',
        },
        horizontal: {
            left: '8%',
            right: '4%',
            top: '12%',
            bottom: '12%',
        },
    },
} as const;