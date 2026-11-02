export const LINE_CHART_COLOR_VARIABLES = [
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

export const LINE_CHART_TOKEN_VARIABLES = {
    axisText: '--wci-chart-axis-text',
    grid: '--wci-chart-grid',
    pointFill: '--wci-chart-point-fill',
} as const;

export const LINE_CHART_FALLBACK_COLORS = [
    '#3b82f6',
    '#14b8a6',
    '#22c55e',
    '#f97316',
    '#ef4444',
    '#8b5cf6',
    '#d946ef',
    '#06b6d4',
    '#eab308',
] as const;

export const LINE_CHART_FALLBACK_TOKENS = {
    axisText: '#64748b',
    grid: '#e5e7eb',
    pointFill: '#ffffff',
} as const;