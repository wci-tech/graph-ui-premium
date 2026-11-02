import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    WaterfallChartColors,
    WaterfallChartOptions,
    WaterfallChartProps,
} from '@/components/chartjs/components/waterfall-chart/WaterfallChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';


const WATERFALL_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies ChartJSEffect[];

const isWaterfallChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined && (WATERFALL_CHART_EFFECTS as ChartEffect[]).includes(effect);

const resolveEffect = (effect: ChartEffect | undefined): ChartJSEffect | undefined =>
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

const resolveData = (data: EngineRendererProps['data']): number[] => {
    const series = data.series[0];
    return series ? toNumberSeriesData(series.data) : [];
};

export const adaptChartJSWaterfallProps = (
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

    return compactObject({
        labels: Array.from(data.labels),
        data: resolveData(data),
        colors: resolveColors(colors),
        effect: resolveEffect(effect),
        options: options as WaterfallChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};