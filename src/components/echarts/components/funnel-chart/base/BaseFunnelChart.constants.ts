export const FUNNEL_CHART_CONFIG = {
    name: 'Conversion',
    left: '4%',
    right: '4%',
    top: 35,
    bottom: 90,
    width: '92%',
    min: 0,
    max: 100,
    minSize: '0%',
    maxSize: '100%',
    sort: 'descending',
    gap: 4,
    funnelAlign: 'center',
    borderWidth: 2,
    labelFontSize: 14,
    labelLineHeight: 18,
    labelLineLength: 18,
    labelLineLength2: 10,
    legendBottom: 25,
    crosshairWidth: 1,
} as const;

export const DEFAULT_FUNNEL_CHART_ID = 'echarts-funnel-chart';