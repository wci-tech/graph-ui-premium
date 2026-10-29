export const GANTT_CHART_CONFIG = {
    barMaxWidth: 22,
    barCategoryGap: '35%',
    borderRadius: 6,
    axisLineWidth: 1,
    axisLabelMargin: 12,
    taskLabelMargin: 16,
    taskLabelWidth: 130,
    grid: {
        left: 32,
        right: 32,
        top: '15%',
        bottom: '15%',
    },
    boundaryGap: ['2%', '2%'] as const,
    animationDuration: 1800,
    defaultTimeUnit: 'day',
} as const;