import type { ScriptableContext, TooltipItem } from 'chart.js';
import type { TreemapDataPoint } from 'chartjs-chart-treemap';

import { CHART_COLOR_VARIABLES, CHART_TOKEN_VARIABLES } from '@/common/constants/Chart.colors';
import type { ChartJSData, ChartJSOptions } from '@/components/chartjs/ChartJS.types';

import type {
  TreemapChartColors,
  TreemapChartItem,
  TreemapChartOptions,
  TreemapChartResolvedColors,
} from '../TreemapChart.types';

import { TREEMAP_CHART_CONFIG } from './BaseTreemapChart.constants';

interface TreemapSourceItem {
  readonly label: string;
  readonly value: number;
  readonly group?: string;
  readonly color?: string;
  readonly paletteIndex: number;
}

type TreemapContext = ScriptableContext<'treemap'> & {
  readonly raw?: TreemapDataPoint;
};

type TreemapLabelContext = TreemapContext & {
  readonly type?: string;
};

interface TreemapDataset {
  readonly type: 'treemap';
  readonly label: string;
  readonly data: TreemapDataPoint[];
  readonly tree: TreemapSourceItem[];
  readonly key: 'value';
  readonly groups?: ['group'];
  readonly spacing: number;
  readonly borderWidth: number;
  readonly borderRadius: number;
  readonly borderColor: string;
  readonly backgroundColor: (context: TreemapContext) => string;
  readonly hoverBackgroundColor: (context: TreemapContext) => string;
  readonly labels: {
    readonly display: boolean;
    readonly align: 'center';
    readonly position: 'middle';
    readonly overflow: 'fit';
    readonly color: string;
    readonly padding: number;
    readonly font: [
      {
        readonly size: number;
        readonly weight: 'normal' | 'bold';
      },
      {
        readonly size: number;
        readonly weight: 'normal' | 'bold';
      },
    ];
    readonly formatter: (context: TreemapLabelContext) => string[];
  };
}

interface TreemapDataParams {
  readonly data: TreemapChartItem[];
  readonly colors: TreemapChartResolvedColors;
  readonly rootElement: HTMLElement;
  readonly options?: TreemapChartOptions;
}

interface TreemapOptionsParams {
  readonly colors: TreemapChartResolvedColors;
  readonly options?: TreemapChartOptions;
}

const CSS_VARIABLE_PATTERN = /^var\(\s*(--[^,\s)]+)\s*(?:,\s*(.+))?\)$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getRecordConfig = (
  source: Record<string, unknown> | undefined,
  key: string,
): Record<string, unknown> => {
  const value = source?.[key];
  return isRecord(value) ? value : {};
};

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
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBackground)),
    tooltipText: colors?.tooltipText
      ? resolveColor(styles, colors.tooltipText)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipText)),
    tooltipBorder: colors?.tooltipBorder
      ? resolveColor(styles, colors.tooltipBorder)
      : resolveColor(styles, resolveCssVariable(styles, CHART_TOKEN_VARIABLES.tooltipBorder)),
  };
};

const getAlphaColor = (color: string, alpha: number): string => {
  const normalizedColor = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(normalizedColor)) {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `${normalizedColor}${alphaHex}`;
  }
  if (/^#[0-9a-fA-F]{8}$/.test(normalizedColor)) {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `${normalizedColor.slice(0, 7)}${alphaHex}`;
  }
  if (normalizedColor.startsWith('rgb(')) {
    return normalizedColor.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  if (normalizedColor.startsWith('rgba(')) {
    return normalizedColor.replace(/rgba\((.+),\s*[\d.]+\)/, `rgba($1, ${alpha})`);
  }
  return normalizedColor;
};

const getDatasetRawItem = (context: TreemapContext): unknown => {
  const dataset = context.dataset;
  if (!dataset || !Array.isArray(dataset.data)) return undefined;
  return dataset.data[context.dataIndex];
};

const getContextRawItem = (context: TreemapContext): unknown => {
  if (isRecord(context.raw)) return context.raw;
  return getDatasetRawItem(context);
};

const getSourceRecord = (rawValue: unknown): Record<string, unknown> | undefined => {
  if (!isRecord(rawValue)) return undefined;
  const source = rawValue['_data'];
  if (isRecord(source)) return source;
  if (Array.isArray(source)) return source.find(isRecord);
  return undefined;
};

const toTreemapSourceItem = (
  source: Record<string, unknown>,
): TreemapSourceItem | undefined => {
  const label = source['label'];
  const value = source['value'];
  const group = source['group'];
  const color = source['color'];
  const paletteIndex = source['paletteIndex'];
  if (typeof label !== 'string' || typeof value !== 'number') return undefined;
  return {
    label,
    value,
    paletteIndex: typeof paletteIndex === 'number' ? paletteIndex : 0,
    ...(typeof group === 'string' ? { group } : {}),
    ...(typeof color === 'string' ? { color } : {}),
  };
};

const getSourceItemFromRaw = (rawValue: unknown): TreemapSourceItem | undefined => {
  const source = getSourceRecord(rawValue);
  return source ? toTreemapSourceItem(source) : undefined;
};

const getSourceItem = (context: TreemapContext): TreemapSourceItem | undefined =>
  getSourceItemFromRaw(getContextRawItem(context));

const getContextIndex = (context: TreemapContext): number =>
  typeof context.dataIndex === 'number' && context.dataIndex >= 0 ? context.dataIndex : 0;

const getTreemapColor = (
  context: TreemapContext,
  colors: TreemapChartResolvedColors,
  styles: CSSStyleDeclaration,
): string => {
  const sourceItem = getSourceItem(context);
  if (sourceItem?.color) return resolveColor(styles, sourceItem.color);
  const paletteIndex = sourceItem?.paletteIndex ?? getContextIndex(context);
  const color = colors.series[paletteIndex % colors.series.length];
  if (!color) throw new Error('[TreemapChart] At least one series color is required.');
  return color;
};

const getTreemapValue = (rawValue: unknown): number | undefined => {
  if (!isRecord(rawValue)) return undefined;
  const value = rawValue['v'];
  if (typeof value === 'number') return value;
  return getSourceItemFromRaw(rawValue)?.value;
};

const getContextValue = (context: TreemapContext): number | undefined =>
  getTreemapValue(getContextRawItem(context));

const getTreemapLabel = (rawValue: unknown): string | undefined =>
  getSourceItemFromRaw(rawValue)?.label;

const getTreemapGroup = (rawValue: unknown): string | undefined =>
  getSourceItemFromRaw(rawValue)?.group;

const formatValue = (value: number, formatter?: (value: number) => string): string =>
  formatter?.(value) ?? value.toLocaleString();

const hasGroups = (data: TreemapChartItem[]): boolean =>
  data.some((item) => typeof item.group === 'string' && item.group.trim().length > 0);

const createTreemapSource = (data: TreemapChartItem[]): TreemapSourceItem[] =>
  data.map((item, index) => ({
    label: item.label,
    value: item.value,
    paletteIndex: index,
    ...(item.group ? { group: item.group } : {}),
    ...(item.color ? { color: item.color } : {}),
  }));

const getLabelText = (
  context: TreemapLabelContext,
  valueFormatter?: (value: number) => string,
): string[] => {
  if (context.type !== undefined && context.type !== 'data') return [];
  const rawItem = getContextRawItem(context);
  const sourceItem = getSourceItemFromRaw(rawItem);
  const value = getTreemapValue(rawItem);
  if (!sourceItem || value === undefined) return [];
  return [sourceItem.label, formatValue(value, valueFormatter)];
};

export const createTreemapChartData = ({
  data,
  colors,
  rootElement,
  options,
}: TreemapDataParams): ChartJSData => {
  const styles = getComputedStyle(rootElement);
  const minimumLabelValue = options?.minimumLabelValue ?? TREEMAP_CHART_CONFIG.minimumLabelValue;
  const sourceData = createTreemapSource(data);
  const dataset: TreemapDataset = {
    type: 'treemap',
    label: 'Treemap',
    data: [],
    tree: sourceData,
    key: 'value',
    ...(hasGroups(data) ? { groups: ['group'] } : {}),
    spacing: options?.spacing ?? TREEMAP_CHART_CONFIG.spacing,
    borderWidth: options?.borderWidth ?? TREEMAP_CHART_CONFIG.borderWidth,
    borderRadius: options?.borderRadius ?? TREEMAP_CHART_CONFIG.borderRadius,
    borderColor: colors.tooltipText,
    backgroundColor: (context) =>
      getAlphaColor(
        getTreemapColor(context, colors, styles),
        TREEMAP_CHART_CONFIG.backgroundOpacity,
      ),
    hoverBackgroundColor: (context) => getTreemapColor(context, colors, styles),
    labels: {
      display: options?.showLabels ?? true,
      align: 'center',
      position: 'middle',
      overflow: 'fit',
      color: colors.tooltipText,
      padding: TREEMAP_CHART_CONFIG.labelPadding,
      font: [
        {
          size: TREEMAP_CHART_CONFIG.labelFontSize,
          weight: options?.boldLabels ? 'bold' : 'normal',
        },
        {
          size: TREEMAP_CHART_CONFIG.valueFontSize,
          weight: 'normal',
        },
      ],
      formatter: (context): string[] => {
        const value = getContextValue(context);
        if (value === undefined || value < minimumLabelValue) return [];
        return getLabelText(context, options?.valueFormatter);
      },
    },
  };
  return {
    datasets: [dataset],
  } as unknown as ChartJSData;
};

export const createTreemapChartOptions = ({
  options,
  colors,
}: TreemapOptionsParams): ChartJSOptions => {
  const optionRecord = isRecord(options) ? options : undefined;
  const layoutConfig = getRecordConfig(optionRecord, 'layout');
  const animationConfig = getRecordConfig(optionRecord, 'animation');
  const pluginOptions = getRecordConfig(optionRecord, 'plugins');
  const legendConfig = getRecordConfig(pluginOptions, 'legend');
  const legendLabelsConfig = getRecordConfig(legendConfig, 'labels');
  const legendFontConfig = getRecordConfig(legendLabelsConfig, 'font');
  const tooltipConfig = getRecordConfig(pluginOptions, 'tooltip');
  const tooltipCallbacksConfig = getRecordConfig(tooltipConfig, 'callbacks');
  const datalabelsConfig = getRecordConfig(pluginOptions, 'datalabels');
  const {
    spacing: _spacing,
    borderWidth: _borderWidth,
    borderRadius: _borderRadius,
    showLabels: _showLabels,
    showLegend: _showLegend,
    boldLabels: _boldLabels,
    boldLegends: _boldLegends,
    showTooltipValue: _showTooltipValue,
    minimumLabelValue: _minimumLabelValue,
    isBoxVisible: _isBoxVisible,
    chartBackground: _chartBackground,
    valueFormatter: _valueFormatter,
    height: _height,
    plugins: _plugins,
    layout: _layout,
    animation: _animation,
    onClick: _onClick,
    ...remainingOptions
  } = options ?? {};
  return {
    ...remainingOptions,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
      ...layoutConfig,
    },
    plugins: {
      ...pluginOptions,
      legend: {
        display: options?.showLegend ?? true,
        ...legendConfig,
        labels: {
          color: colors.axisText,
          ...legendLabelsConfig,
          font: {
            ...legendFontConfig,
            weight: options?.boldLegends ? 'bold' : 'normal',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: colors.tooltipBackground,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        borderWidth: TREEMAP_CHART_CONFIG.tooltipBorderWidth,
        displayColors: true,
        ...tooltipConfig,
        callbacks: {
          title: (items: TooltipItem<'treemap'>[]): string => {
            const firstItem = items[0];
            return firstItem ? (getTreemapLabel(firstItem.raw) ?? 'Treemap item') : '';
          },
          label: (item: TooltipItem<'treemap'>): string => {
            if (options?.showTooltipValue === false) return '';
            const value = getTreemapValue(item.raw);
            if (value === undefined) return '';
            return `Value: ${formatValue(value, options?.valueFormatter)}`;
          },
          afterLabel: (item: TooltipItem<'treemap'>): string => {
            const group = getTreemapGroup(item.raw);
            return group ? `Group: ${group}` : '';
          },
          ...tooltipCallbacksConfig,
        },
      },
      datalabels: {
        display: false,
        ...datalabelsConfig,
      },
    },
    animation: {
      duration: TREEMAP_CHART_CONFIG.animationDuration,
      easing: TREEMAP_CHART_CONFIG.animationEasing,
      ...animationConfig,
    },
    ...(options?.onClick !== undefined ? { onClick: options.onClick } : {}),
  } as unknown as ChartJSOptions;
};