export const HEATMAP_CHART_CONFIG = {
    defaultHeight: 400,
    cellGap: 3,
    cellBorderRadius: 4,
    cellMinSizeRatio: 0.45,
    minCellSizeRatio: 0.1,
    minCellOpacity: 0.18,
    maxCellValue: 100,
    labelContrastThreshold: 65,
    labelFontSize: 12,
    crosshairWidth: 1,
    crosshairDash: [5, 5] as const,
} as const;