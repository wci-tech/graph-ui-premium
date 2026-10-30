import type { RadarChartProps } from '../RadarChart.types';

export type BaseRadarChartProps = RadarChartProps & {
  readonly 'data-testid'?: string;
};