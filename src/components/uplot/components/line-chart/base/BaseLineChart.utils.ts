import { compactObject } from '@wci-tech/core-ui-premium';

import type { UPlotDefinition, UPlotSeriesDefinition } from '../../../UPlot.types';
import type { LineChartData } from '../LineChart.types';

const EMPTY_SERIES: UPlotSeriesDefinition[] = [];

export type ResolvedLineChartColors = {
  readonly colors: string[];
  readonly axisColor: string;
  readonly gridColor: string;
  readonly pointFillColor: string;
};

const getCssVariable = (
  element: HTMLElement | null,
  variableName: string,
  fallback: string,
): string => {
  if (!element) return fallback;

  const value = getComputedStyle(element).getPropertyValue(variableName).trim();

  return value || fallback;
};

export const getResolvedLineChartColors = (
  element: HTMLElement | null,
  variantColors: readonly string[] = [],
): ResolvedLineChartColors => ({
  colors: [
    getCssVariable(element, '--line-chart-line-color', variantColors[0] ?? '#763d6c'),
    getCssVariable(element, '--line-chart-secondary-line-color', variantColors[1] ?? '#316851'),
  ],
  axisColor: getCssVariable(element, '--line-chart-axis-color', '#6b7280'),
  gridColor: getCssVariable(element, '--line-chart-grid-color', '#e5e7eb'),
  pointFillColor: getCssVariable(element, '--line-chart-point-bg-color', '#ffffff'),
});

export const isSeriesArray = (
  data: LineChartData | UPlotSeriesDefinition[] | undefined,
): data is UPlotSeriesDefinition[] => Array.isArray(data);

export const createLineChartDefinition = ({
  data,
  labels,
  series,
  appearance,
  resolvedColors,
}: {
  readonly data?: LineChartData | UPlotSeriesDefinition[];
  readonly labels?: string[];
  readonly series?: UPlotSeriesDefinition[];
  readonly appearance?: UPlotDefinition['appearance'];
  readonly resolvedColors: ResolvedLineChartColors;
}): UPlotDefinition => {
  if (isSeriesArray(data)) {
    return compactObject({
      labels: labels ?? [],
      series: data,
      appearance,
      colors: resolvedColors.colors,
      axisColor: resolvedColors.axisColor,
      gridColor: resolvedColors.gridColor,
      pointFillColor: resolvedColors.pointFillColor,
    });
  }

  return compactObject({
    labels: data?.labels ?? labels ?? [],
    series: data?.series ?? data?.datasets ?? series ?? EMPTY_SERIES,
    appearance: data?.appearance ?? appearance,
    colors: resolvedColors.colors,
    axisColor: resolvedColors.axisColor,
    gridColor: resolvedColors.gridColor,
    pointFillColor: resolvedColors.pointFillColor,
  });
};
