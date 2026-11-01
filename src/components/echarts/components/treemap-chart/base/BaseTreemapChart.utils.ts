import type { EChartsOption } from 'echarts';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';

import type {
  TreemapChartColors,
  TreemapChartData,
  TreemapChartDataItem,
  TreemapChartOptions,
  TreemapChartResolvedColors,
  TreemapChartSeries,
} from '../TreemapChart.types';

import { TREEMAP_CHART_CONFIG } from './BaseTreemapChart.constants';

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const resolveCssVariable = (styles: CSSStyleDeclaration, variableName: string): string => {
  const value = styles.getPropertyValue(variableName).trim();
  if (!value) throw new Error(`[TreemapChart] Missing required CSS variable "${variableName}".`);
  return value;
};

const resolveColor = (styles: CSSStyleDeclaration, color: string): string => {
  const normalizedColor = color.trim();
  const match = normalizedColor.match(CSS_VARIABLE_PATTERN);
  if (!match) return normalizedColor;
  const variableName = match[1];
  if (!variableName) return normalizedColor;
  const resolvedColor = styles.getPropertyValue(variableName).trim();
  if (resolvedColor) return resolveColor(styles, resolvedColor);
  const fallback = match[2]?.trim();
  if (fallback) return resolveColor(styles, fallback);
  throw new Error(`[TreemapChart] Unable to resolve CSS color variable "${variableName}".`);
};

const resolveDefaultSeriesColors = (styles: CSSStyleDeclaration): string[] =>
  CHART_COLOR_VARIABLES.map((variableName) =>
    resolveColor(styles, resolveCssVariable(styles, variableName)),
  );

export const resolveTreemapChartColors = (
  element: HTMLElement,
  colors?: TreemapChartColors,
): TreemapChartResolvedColors => {
  const styles = getComputedStyle(element);
  const series =
    colors?.series && colors.series.length > 0
      ? colors.series.map((color) => resolveColor(styles, color))
      : resolveDefaultSeriesColors(styles);

  return {
    series,
    axisText: colors?.axisText
      ? resolveColor(styles, colors.axisText)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisText)),
    axisLine: colors?.axisLine
      ? resolveColor(styles, colors.axisLine)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.axisLine)),
    grid: colors?.grid
      ? resolveColor(styles, colors.grid)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.grid)),
    tooltipBackground: colors?.tooltipBackground
      ? resolveColor(styles, colors.tooltipBackground)
      : resolveColor(
        styles,
        resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBackground),
      ),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText)),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder)),
  };
};

export interface TreemapChartResolvedSeries extends TreemapChartSeries {
  readonly color: string;
  readonly data: TreemapChartDataItem[];
}

export interface TreemapChartDefinition {
  readonly type: 'treemap';
  readonly labels: string[];
  readonly series: TreemapChartResolvedSeries[];
  readonly treemapChartColors: TreemapChartResolvedColors;
  readonly showLabels: boolean;
  readonly boldLabels: boolean;
  readonly showUpperLabels: boolean;
  readonly showBreadcrumb: boolean;
  readonly leafDepth: number | null;
  readonly visibleMin: number;
  readonly roam: boolean | 'scale' | 'move';
  readonly nodeClick: false | 'zoomToNode' | 'link';
  readonly drillDownIcon: string;
  readonly valueSuffix: string;
}

const getSeriesColor = (
  item: TreemapChartSeries,
  index: number,
  colors: TreemapChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  if (item.color) return resolveColor(styles, item.color);
  const color = colors.series[index % colors.series.length];
  if (!color) throw new Error('[TreemapChart] At least one series color is required.');
  return color;
};

const resolveDataItems = (
  items: TreemapChartDataItem[],
  colors: TreemapChartResolvedColors,
  styles: CSSStyleDeclaration,
  inheritedColor?: string,
): TreemapChartDataItem[] =>
  items.map((item, index) => {
    const paletteColor = colors.series[index % colors.series.length];
    const color = item.color
      ? resolveColor(styles, item.color)
      : item.itemStyle?.color
        ? resolveColor(styles, item.itemStyle.color)
        : inheritedColor ?? paletteColor;

    return {
      ...item,
      ...(color
        ? {
          color,
          itemStyle: {
            ...item.itemStyle,
            color,
          },
        }
        : {}),
      ...(item.children?.length
        ? {
          children: resolveDataItems(item.children, colors, styles, color),
        }
        : {}),
    };
  });

const resolveSeries = (
  element: HTMLElement,
  data: TreemapChartData,
  colors: TreemapChartResolvedColors,
): TreemapChartResolvedSeries[] => {
  const styles = getComputedStyle(element);

  return data.series.map((item, index) => {
    const color = getSeriesColor(item, index, colors, styles);

    return {
      ...item,
      color,
      data: resolveDataItems(item.data, colors, styles, color),
    };
  });
};

export const createTreemapChartDefinition = ({
  element,
  data,
  colors,
  options,
}: {
  readonly element: HTMLElement;
  readonly data: TreemapChartData;
  readonly colors: TreemapChartResolvedColors;
  readonly options?: TreemapChartOptions;
}): TreemapChartDefinition => ({
  type: 'treemap',
  labels: [],
  series: resolveSeries(element, data, colors),
  treemapChartColors: colors,
  showLabels: options?.showLabels ?? true,
  boldLabels: options?.boldLabels ?? false,
  showUpperLabels: options?.showUpperLabels ?? true,
  showBreadcrumb: options?.showBreadcrumb ?? true,
  leafDepth: options?.leafDepth ?? TREEMAP_CHART_CONFIG.leafDepth,
  visibleMin: options?.visibleMin ?? TREEMAP_CHART_CONFIG.visibleMin,
  roam: options?.roam ?? 'move',
  nodeClick: options?.nodeClick ?? 'zoomToNode',
  drillDownIcon: options?.drillDownIcon ?? TREEMAP_CHART_CONFIG.drillDownIcon,
  valueSuffix: options?.valueSuffix ?? TREEMAP_CHART_CONFIG.valueSuffix,
});

const mergeTreemapSeries = (
  generatedSeries: EChartsOption['series'],
  customSeries: EChartsOption['series'],
): EChartsOption['series'] => {
  if (!generatedSeries) return undefined;

  const generated = Array.isArray(generatedSeries) ? generatedSeries : [generatedSeries];
  const custom = customSeries
    ? Array.isArray(customSeries)
      ? customSeries
      : [customSeries]
    : [];

  if (!custom.length) return generatedSeries;

  return generated.map((series, index) => {
    const override = custom[index];
    if (!isRecord(series) || !isRecord(override)) return series;

    const generatedLevels = Array.isArray(series['levels']) ? series['levels'] : [];
    const customLevels = Array.isArray(override['levels']) ? override['levels'] : [];

    return {
      ...series,
      ...override,
      itemStyle: {
        ...asRecord(series['itemStyle']),
        ...asRecord(override['itemStyle']),
      },
      label: {
        ...asRecord(series['label']),
        ...asRecord(override['label']),
      },
      upperLabel: {
        ...asRecord(series['upperLabel']),
        ...asRecord(override['upperLabel']),
      },
      breadcrumb: {
        ...asRecord(series['breadcrumb']),
        ...asRecord(override['breadcrumb']),
      },
      ...(customLevels.length
        ? {
          levels: generatedLevels.map((level, levelIndex) => ({
            ...asRecord(level),
            ...asRecord(customLevels[levelIndex]),
            itemStyle: {
              ...asRecord(asRecord(level)['itemStyle']),
              ...asRecord(asRecord(customLevels[levelIndex])['itemStyle']),
            },
          })),
        }
        : {}),
    };
  }) as EChartsOption['series'];
};

export const mergeTreemapChartOptions = (
  generatedOptions: EChartsOption,
  options?: TreemapChartOptions,
): EChartsOption => {
  if (!options) return generatedOptions;

  const {
    showLabels: _showLabels,
    boldLabels: _boldLabels,
    showUpperLabels: _showUpperLabels,
    showBreadcrumb: _showBreadcrumb,
    leafDepth: _leafDepth,
    visibleMin: _visibleMin,
    roam: _roam,
    nodeClick: _nodeClick,
    drillDownIcon: _drillDownIcon,
    valueSuffix: _valueSuffix,
    isBoxVisible: _isBoxVisible,
    chartBackground: _chartBackground,
    tooltip,
    series,
    ...rest
  } = options;

  const mergedSeries = mergeTreemapSeries(generatedOptions.series, series);

  return {
    ...generatedOptions,
    ...rest,
    tooltip: {
      ...asRecord(generatedOptions.tooltip),
      ...asRecord(tooltip),
    },
    ...(mergedSeries !== undefined ? { series: mergedSeries } : {}),
  };
};