import { compactObject } from '@wci-tech/core-ui-premium';

import { toHeatmapSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    HeatmapChartColors,
    HeatmapChartData,
    HeatmapChartEffect,
    HeatmapChartOptions,
    HeatmapChartProps,
    HeatmapChartSeries,
} from '@/components/echarts/components/heatmap-chart/HeatmapChart.types';
import type {
    ChartColors,
    ChartHeatmapPoint,
    EngineRendererProps,
} from '@/engines/engine.types';

const ECHARTS_HEATMAP_EFFECTS: readonly HeatmapChartEffect[] = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
];

const resolveEffect = (
    effect: EngineRendererProps['effect'],
): HeatmapChartEffect =>
    ECHARTS_HEATMAP_EFFECTS.includes(effect as HeatmapChartEffect)
        ? (effect as HeatmapChartEffect)
        : 'none';

const resolveHeatmapPoints = (
    data: EngineRendererProps['data'],
): ChartHeatmapPoint[] =>
    data.series.flatMap((seriesItem) =>
        toHeatmapSeriesData(seriesItem.data),
    );

const resolveYLabels = (
    data: readonly ChartHeatmapPoint[],
): string[] =>
    Array.from(new Set(data.map((point) => point.y)));

const resolveData = (
    data: EngineRendererProps['data'],
): HeatmapChartData => {
    const xLabels = data.labels.map(String);
    const heatmapPoints = resolveHeatmapPoints(data);
    const yLabels = resolveYLabels(heatmapPoints);
    const xLabelIndexes = new Map(
        xLabels.map((label, index) => [label, index]),
    );
    const yLabelIndexes = new Map(
        yLabels.map((label, index) => [label, index]),
    );

    const series: HeatmapChartSeries[] = data.series.map(
        (seriesItem) =>
            compactObject({
                label: seriesItem.label,
                color: seriesItem.color,
                data: toHeatmapSeriesData(seriesItem.data).flatMap(
                    (point) => {
                        const xIndex = xLabelIndexes.get(point.x);
                        const yIndex = yLabelIndexes.get(point.y);

                        return xIndex === undefined ||
                            yIndex === undefined
                            ? []
                            : [[xIndex, yIndex, point.v] as const];
                    },
                ),
            }),
    );

    return {
        xLabels,
        yLabels,
        series,
    };
};

const resolveColors = (
    colors: ChartColors | undefined,
): HeatmapChartColors | undefined => {
    if (!colors) {
        return undefined;
    }

    return compactObject({
        series: colors.series
            ? Array.from(colors.series)
            : undefined,
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

export const adaptEChartsHeatmapProps = ({
    data,
    colors,
    options,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): HeatmapChartProps =>
    compactObject({
        data: resolveData(data),
        colors: resolveColors(colors),
        options: resolveOptions(options),
        effect: resolveEffect(effect),
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });