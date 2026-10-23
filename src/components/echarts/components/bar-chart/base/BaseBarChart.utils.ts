import type { EChartsOption } from 'echarts';
import type { AxisPointerOption, TooltipOption } from 'echarts/types/dist/shared';

import type {
  EChartsDefinition,
  EChartsSeriesDefinition,
} from '@/components/echarts/ECharts.types';

import type { BarChartData, BarChartOptions } from '../BarChart.types';

/* -------------------------------------------------------------------------- */
/* Shared Bar Chart fallbacks                                                  */
/*                                                                            */
/* Keep these identical in ChartJS.                                            */
/* -------------------------------------------------------------------------- */

const FALLBACK_PRIMARY_BAR_COLOR = '#763d6c';
const FALLBACK_SECONDARY_BAR_COLOR = '#316851';
const FALLBACK_LABEL_COLOR = '#4b5563';
const FALLBACK_AXIS_COLOR = '#d1d5db';
const FALLBACK_GRID_COLOR = '#e5e7eb';

type TooltipTrigger = NonNullable<TooltipOption['trigger']>;
type AxisPointerType = NonNullable<AxisPointerOption['type']>;
type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const compactObject = <TObject extends UnknownRecord>(object: TObject): Partial<TObject> =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  ) as Partial<TObject>;

const getRecordConfig = (value: unknown): UnknownRecord => (isRecord(value) ? value : {});

const getTooltipConfig = (value: unknown): TooltipOption =>
  isRecord(value) ? (value as TooltipOption) : {};

const getAxisPointerConfig = (value: unknown): AxisPointerOption =>
  isRecord(value) ? (value as AxisPointerOption) : {};

const isTooltipTrigger = (value: unknown): value is TooltipTrigger =>
  value === 'item' || value === 'axis' || value === 'none';

const isAxisPointerType = (value: unknown): value is AxisPointerType =>
  value === 'line' || value === 'shadow' || value === 'cross' || value === 'none';

const resolveTooltipTrigger = ({
  crosshairEnabled,
  customTrigger,
  generatedTrigger,
}: {
  readonly crosshairEnabled: boolean;
  readonly customTrigger: unknown;
  readonly generatedTrigger: unknown;
}): TooltipTrigger => {
  if (crosshairEnabled) {
    return 'axis';
  }

  if (isTooltipTrigger(customTrigger)) {
    return customTrigger;
  }

  if (isTooltipTrigger(generatedTrigger)) {
    return generatedTrigger;
  }

  return 'item';
};

const resolveAxisPointerType = ({
  crosshairEnabled,
  customType,
  generatedType,
}: {
  readonly crosshairEnabled: boolean;
  readonly customType: unknown;
  readonly generatedType: unknown;
}): AxisPointerType => {
  if (crosshairEnabled) {
    return 'cross';
  }

  if (isAxisPointerType(customType)) {
    return customType;
  }

  if (isAxisPointerType(generatedType)) {
    return generatedType;
  }

  return 'line';
};

const getCssVariable = (
  element: HTMLElement | null,
  variableName: string,
  fallback: string,
): string => {
  if (!element) {
    return fallback;
  }

  const value = getComputedStyle(element).getPropertyValue(variableName).trim();

  return value || fallback;
};

const getBarChartSeries = (
  data: BarChartData | undefined,
  series: EChartsSeriesDefinition[] | undefined,
): EChartsSeriesDefinition[] => data?.series ?? data?.datasets ?? series ?? [];

/* -------------------------------------------------------------------------- */
/* Shared CSS-variable contract                                                */
/* -------------------------------------------------------------------------- */

export const getResolvedBarChartColors = (element: HTMLElement | null) => ({
  barColors: [
    getCssVariable(element, '--bar-chart-bar-color', FALLBACK_PRIMARY_BAR_COLOR),

    getCssVariable(element, '--bar-chart-secondary-bar-color', FALLBACK_SECONDARY_BAR_COLOR),
  ],

  labelColor: getCssVariable(element, '--bar-chart-label-color', FALLBACK_LABEL_COLOR),

  axisColor: getCssVariable(element, '--bar-chart-axis-color', FALLBACK_AXIS_COLOR),

  gridColor: getCssVariable(element, '--bar-chart-grid-color', FALLBACK_GRID_COLOR),
});

/* -------------------------------------------------------------------------- */
/* Definition                                                                  */
/* -------------------------------------------------------------------------- */

export const createBarChartDefinition = ({
  data,
  labels,
  series,
  colors,
  horizontal,
  barWidth,
}: {
  readonly data?: BarChartData;
  readonly labels?: string[];
  readonly series?: EChartsSeriesDefinition[];
  readonly colors: ReturnType<typeof getResolvedBarChartColors>;
  readonly horizontal: boolean;
  readonly barWidth: number;
}): EChartsDefinition => {
  const resolvedSeries = getBarChartSeries(data, series);

  return {
    type: 'bar',

    labels: data?.labels ?? labels ?? [],

    horizontal,

    barWidth,

    barChartColors: colors,

    series: resolvedSeries.map<EChartsSeriesDefinition>((item, index) => ({
      ...item,

      type: 'bar',

      color:
        item.color ?? colors.barColors[index] ?? colors.barColors[0] ?? FALLBACK_PRIMARY_BAR_COLOR,
    })),
  };
};

/* -------------------------------------------------------------------------- */
/* Option merge                                                                */
/* -------------------------------------------------------------------------- */

export const mergeBarChartOptions = ({
  generatedOptions,
  options,
}: {
  readonly generatedOptions: EChartsOption;
  readonly options?: BarChartOptions;
}): EChartsOption => {
  if (!options) {
    return generatedOptions;
  }

  const crosshairEnabled = options.crosshair ?? false;

  const generatedTooltip = getTooltipConfig(generatedOptions.tooltip);

  const customTooltip = getTooltipConfig(options.tooltip);

  const generatedAxisPointer = getAxisPointerConfig(generatedTooltip.axisPointer);

  const customAxisPointer = getAxisPointerConfig(customTooltip.axisPointer);

  const generatedLegend = getRecordConfig(generatedOptions.legend);

  const customLegend = getRecordConfig(options.legend);

  const generatedGrid = getRecordConfig(generatedOptions.grid);

  const customGrid = getRecordConfig(options.grid);

  const generatedShadowStyle = getRecordConfig(generatedAxisPointer.shadowStyle);

  const customShadowStyle = getRecordConfig(customAxisPointer.shadowStyle);

  const tooltipTrigger = resolveTooltipTrigger({
    crosshairEnabled,
    customTrigger: customTooltip.trigger,
    generatedTrigger: generatedTooltip.trigger,
  });

  const axisPointerType = resolveAxisPointerType({
    crosshairEnabled,
    customType: customAxisPointer.type,
    generatedType: generatedAxisPointer.type,
  });

  const {
    horizontal: _horizontal,
    barWidth: _barWidth,
    crosshair: _crosshair,

    tooltip: _tooltip,
    legend: _legend,
    grid: _grid,

    series: customSeries,

    ...remainingOptions
  } = options;

  const resolvedSeries = customSeries ?? generatedOptions.series;

  const mergedTooltip: TooltipOption = {
    ...generatedTooltip,
    ...customTooltip,

    trigger: tooltipTrigger,

    axisPointer: {
      ...generatedAxisPointer,
      ...customAxisPointer,

      show: crosshairEnabled,
      type: axisPointerType,
      snap: true,

      shadowStyle: {
        ...generatedShadowStyle,
        ...customShadowStyle,

        color: 'transparent',
        opacity: 0,
      },
    },
  };

  return compactObject({
    ...generatedOptions,
    ...remainingOptions,

    grid: {
      ...generatedGrid,
      ...customGrid,
    },

    legend: {
      ...generatedLegend,
      ...customLegend,
    },

    tooltip: mergedTooltip,

    series: resolvedSeries,
  }) as unknown as EChartsOption;
};
