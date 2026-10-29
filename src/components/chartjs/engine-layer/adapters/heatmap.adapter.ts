import { compactObject } from '@wci-tech/core-ui-premium';

import type {
    HeatmapChartColors,
    HeatmapChartEffect,
    HeatmapChartOptions,
    HeatmapChartProps,
    HeatmapPoint,
} from '@/components/chartjs/components/heatmap-chart/HeatmapChart.types';
import type { ChartColors, EngineRendererProps } from '@/engines/engine.types';

const CHARTJS_HEATMAP_EFFECTS: readonly HeatmapChartEffect[] = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
];

const resolveEffect = (effect: EngineRendererProps['effect']): HeatmapChartEffect =>
    CHARTJS_HEATMAP_EFFECTS.includes(effect as HeatmapChartEffect)
        ? (effect as HeatmapChartEffect)
        : 'none';

const resolveColors = (
    colors: ChartColors | undefined,
): HeatmapChartColors | undefined => {
    if (!colors) {
        return undefined;
    }

    return compactObject({
        series: colors.series ? Array.from(colors.series) : undefined,
        axisText: colors.axisText,
        axisLine: colors.axisLine,
        grid: colors.grid,
        tooltipBackground: colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

const resolveOptions = (
    options: EngineRendererProps['options'],
): HeatmapChartOptions | undefined =>
    options as HeatmapChartOptions | undefined;

const resolveHeatmapData = (
    data: EngineRendererProps['data'],
): HeatmapPoint[] => {
    const [seriesItem] = data.series;

    if (!seriesItem || !Array.isArray(seriesItem.data)) {
        return [];
    }

    return seriesItem.data.filter(
        (item): item is HeatmapPoint =>
            typeof item === 'object' &&
            item !== null &&
            'x' in item &&
            'y' in item &&
            'v' in item &&
            typeof item.x === 'string' &&
            typeof item.y === 'string' &&
            typeof item.v === 'number',
    );
};

const resolveYLabels = (data: HeatmapPoint[]): string[] =>
    Array.from(new Set(data.map((point) => point.y)));

export const adaptChartJSHeatmapProps = ({
    data,
    colors,
    options,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): HeatmapChartProps => {
    const heatmapData = resolveHeatmapData(data);

    return compactObject({
        xLabels: data.labels.map(String),
        yLabels: resolveYLabels(heatmapData),
        data: heatmapData,
        colors: resolveColors(colors),
        options: resolveOptions(options),
        effect: resolveEffect(effect),
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};