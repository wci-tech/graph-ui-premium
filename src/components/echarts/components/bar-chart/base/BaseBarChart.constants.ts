export const BAR_CHART_COLOR_VARIABLES = [
    '--wci-chart-blue',
    '--wci-chart-teal',
    '--wci-chart-green',
    '--wci-chart-orange',
    '--wci-chart-red',
    '--wci-chart-purple',
    '--wci-chart-magenta',
    '--wci-chart-cyan',
    '--wci-chart-yellow',
] as const;

export const BAR_CHART_TOKEN_VARIABLES = {
    axisText: '--wci-chart-axis-text',

    axisLine: '--wci-chart-axis-line',

    grid: '--wci-chart-grid',

    tooltipBackground: '--wci-chart-tooltip-background',

    tooltipText: '--wci-chart-tooltip-text',

    tooltipBorder: '--wci-chart-tooltip-border',
} as const;

export const BAR_CHART_CONFIG = {
    barWidth: 40,

    borderWidth: 0,

    borderRadius: 6,

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