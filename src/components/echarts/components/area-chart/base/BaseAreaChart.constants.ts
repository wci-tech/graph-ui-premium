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
  lineWidth: 3,

  pointRadius: 10,

  pointHoverScale: 1.35,

  haloRadius: 10,

  haloOpacity: 0.3,

  gradientStartOpacity: 0.53,

  gradientEndOpacity: 0,

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
