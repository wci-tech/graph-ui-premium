import { compactObject } from '@wci-tech/core-ui-premium';

import type { UPlotDefinition, UPlotSeriesDefinition } from '../../../UPlot.types';
import type { LineChartData } from '../LineChart.types';

import {
  LINE_CHART_COLOR_VARIABLES,
  LINE_CHART_FALLBACK_COLORS,
  LINE_CHART_FALLBACK_TOKENS,
  LINE_CHART_TOKEN_VARIABLES,
} from './BaseLineChart.constant';

const EMPTY_SERIES: UPlotSeriesDefinition[] = [];

export type ResolvedLineChartColors = {
  readonly colors: string[];
  readonly axisColor: string;
  readonly gridColor: string;
  readonly pointFillColor: string;
};

const resolveCssVariable = (
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
): ResolvedLineChartColors => ({
  colors: LINE_CHART_COLOR_VARIABLES.map((variable, index) =>
    resolveCssVariable(element, variable, LINE_CHART_FALLBACK_COLORS[index]),
  ),
  axisColor: resolveCssVariable(
    element,
    LINE_CHART_TOKEN_VARIABLES.axisText,
    LINE_CHART_FALLBACK_TOKENS.axisText,
  ),
  gridColor: resolveCssVariable(
    element,
    LINE_CHART_TOKEN_VARIABLES.grid,
    LINE_CHART_FALLBACK_TOKENS.grid,
  ),
  pointFillColor: resolveCssVariable(
    element,
    LINE_CHART_TOKEN_VARIABLES.pointFill,
    LINE_CHART_FALLBACK_TOKENS.pointFill,
  ),
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