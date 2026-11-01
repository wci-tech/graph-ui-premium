import { compactObject } from '@wci-tech/core-ui-premium';

import { isNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
    TreemapChartColors,
    TreemapChartData,
    TreemapChartDataItem,
    TreemapChartOptions,
    TreemapChartProps,
} from '@/components/echarts/components/treemap-chart/TreemapChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';


const TREEMAP_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies EChartsEffect[];

const isTreemapChartEffect = (
    effect: ChartEffect | undefined,
): effect is EChartsEffect =>
    effect !== undefined && (TREEMAP_CHART_EFFECTS as ChartEffect[]).includes(effect);

const resolveEffect = (effect: ChartEffect | undefined): EChartsEffect | undefined =>
    isTreemapChartEffect(effect) ? effect : undefined;

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

const resolveSeriesData = (
    labels: EngineRendererProps['data']['labels'],
    data: EngineRendererProps['data']['series'][number]['data'],
): TreemapChartDataItem[] => {
    if (!isNumberSeriesData(data)) return [];
    return data.map((value, index) => ({
        name: labels[index] ?? `Item ${index + 1}`,
        value,
    }));
};

const resolveData = (data: EngineRendererProps['data']): TreemapChartData => ({
    series: data.series
        .filter((series) => isNumberSeriesData(series.data))
        .map((series) =>
            compactObject({
                label: series.label,
                data: resolveSeriesData(data.labels, series.data),
                color: series.color,
            }),
        ),
});

export const adaptEChartsTreemapProps = (
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