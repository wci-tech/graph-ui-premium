import { compactObject } from '@wci-tech/core-ui-premium';

import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    TreemapChartColors,
    TreemapChartItem,
    TreemapChartOptions,
    TreemapChartProps,
} from '@/components/chartjs/components/treemap-chart/TreemapChart.types';
import type { ChartEffect, ChartSeriesData, EngineRendererProps } from '@/engines/engine.types';

const TREEMAP_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies ChartJSEffect[];

const isTreemapChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined && (TREEMAP_CHART_EFFECTS as ChartEffect[]).includes(effect);

const resolveEffect = (effect: ChartEffect | undefined): ChartJSEffect | undefined =>
    isTreemapChartEffect(effect) ? effect : undefined;

const isNumberSeriesData = (data: ChartSeriesData): data is number[] =>
    data.every((value) => typeof value === 'number');

const resolveData = (data: EngineRendererProps['data']): TreemapChartItem[] =>
    data.series.flatMap((series) => {
        if (!isNumberSeriesData(series.data)) return [];
        return series.data.map((value, index) =>
            compactObject({
                label: data.labels[index] ?? `${series.label} ${index + 1}`,
                value,
                group: data.series.length > 1 ? series.label : undefined,
                color: series.color,
            }),
        );
    });

const resolveColors = (
    colors: EngineRendererProps['colors'],
): TreemapChartColors | undefined => {
    if (!colors) return undefined;
    return compactObject({
        series: colors.series,
        axisText: colors.axisText,
        axisLine: colors.axisLine,
        grid: colors.grid,
        tooltipBackground: colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

export const adaptChartJSTreemapProps = (
    props: EngineRendererProps,
): TreemapChartProps => {
    const {
        data,
        colors,
        effect,
        options,
        showDownload,
        downloadPlacement,
        customStyles,
        className,
        testId,
    } = props;

    return compactObject({
        data: resolveData(data),
        colors: resolveColors(colors),
        effect: resolveEffect(effect),
        options: options as TreemapChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};