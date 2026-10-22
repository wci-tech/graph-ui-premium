export const AREA_CHART_COLOR_VARIABLES = [
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

export const AREA_CHART_TOKEN_VARIABLES = {
  axisText: '--wci-chart-axis-text',
  axisLine: '--wci-chart-axis-line',
  grid: '--wci-chart-grid',

  tooltipBackground: '--wci-chart-tooltip-background',

  tooltipText: '--wci-chart-tooltip-text',

  tooltipBorder: '--wci-chart-tooltip-border',
} as const;

export const AREA_CHART_CONFIG = {
  basicTension: 0,
  smoothTension: 0.4,

  borderWidth: 3,

  pointRadius: 6,
  pointHoverRadius: 8,

  gradientStartOpacity: 0.4,
  gradientEndOpacity: 0,

  tooltipCaretPadding: 16,

  haloRadiusOffset: 6,
  haloOpacity: 0.3,
} as const;
