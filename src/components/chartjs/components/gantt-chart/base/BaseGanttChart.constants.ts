export const GANTT_CHART_CONFIG = {
    defaultHeight: '450px',
    borderRadius: 6,
    barPercentage: 0.6,
    categoryPercentage: 0.8,
    boundsBufferRatio: 0.05,
    maxTicksLimit: 12,
    yTickFontSize: 12,
    yTickPadding: 10,
    layoutPadding: {
        left: 10,
        right: 30,
        top: 10,
        bottom: 20,
    },
    defaultTimeUnit: 'day',
} as const;

export const GANTT_CHART_DISPLAY_FORMATS = {
    day: 'MMM d',
    week: 'MMM d',
    month: 'MMM yyyy',
} as const;