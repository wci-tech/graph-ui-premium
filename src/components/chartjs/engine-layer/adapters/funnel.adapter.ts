import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    FunnelChartColors,
    FunnelChartOptions,
    FunnelChartProps,
} from '@/components/chartjs/components/funnel-chart/FunnelChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const FUNNEL_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly ChartJSEffect[];

const isFunnelChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined &&
    (FUNNEL_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

const resolveEffect = (
    effect: ChartEffect | undefined,
): ChartJSEffect | undefined =>
    isFunnelChartEffect(effect) ? effect : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): FunnelChartColors | undefined => {
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
): number[] => {
    const series = data.series[0];

    return series
        ? toNumberSeriesData(series.data)
        : [];
};

export const adaptChartJSFunnelProps = (
    props: EngineRendererProps,
): FunnelChartProps => {
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
        options: options as FunnelChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};