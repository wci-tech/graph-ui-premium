import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
    FunnelChartColors,
    FunnelChartOptions,
    FunnelChartProps,
    FunnelChartSeries,
} from '@/components/echarts/components/funnel-chart/FunnelChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const FUNNEL_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly EChartsEffect[];

const isFunnelChartEffect = (
    effect: ChartEffect | undefined,
): effect is EChartsEffect =>
    effect !== undefined &&
    (FUNNEL_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

const resolveEffect = (
    effect: ChartEffect | undefined,
): EChartsEffect | undefined =>
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

const resolveSeries = (
    data: EngineRendererProps['data'],
): FunnelChartSeries[] =>
    data.series.map((series) => ({
        label: series.label,
        data: toNumberSeriesData(series.data),
    }));

export const adaptEChartsFunnelProps = (
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
        data: {
            labels: Array.from(data.labels),
            series: resolveSeries(data),
        },
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