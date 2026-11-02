import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
    WaterfallChartColors,
    WaterfallChartOptions,
    WaterfallChartProps,
} from '@/components/echarts/components/waterfall-chart/WaterfallChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';


const WATERFALL_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies EChartsEffect[];

const isWaterfallChartEffect = (
    effect: ChartEffect | undefined,
): effect is EChartsEffect =>
    effect !== undefined &&
    (WATERFALL_CHART_EFFECTS as ChartEffect[]).includes(effect);

const resolveEffect = (
    effect: ChartEffect | undefined,
): EChartsEffect | undefined =>
    isWaterfallChartEffect(effect) ? effect : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): WaterfallChartColors | undefined => {
    if (!colors) return undefined;

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

const resolveData = (
    data: EngineRendererProps['data'],
): WaterfallChartProps['data'] => {
    const series = data.series[0];

    return {
        labels: Array.from(data.labels),
        data: series ? toNumberSeriesData(series.data) : [],
    };
};

export const adaptEChartsWaterfallProps = (
    props: EngineRendererProps,
): WaterfallChartProps => {
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

    return {
        data: resolveData(data),
        ...compactObject({
            colors: resolveColors(colors),
            effect: resolveEffect(effect),
            options: options as WaterfallChartOptions | undefined,
            showDownload,
            downloadPlacement,
            rendererCustomStyles: customStyles,
            className,
            testId,
        }),
    };
};