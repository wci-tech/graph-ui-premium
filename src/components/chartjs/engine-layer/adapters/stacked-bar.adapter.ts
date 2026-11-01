import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    StackedBarChartColors,
    StackedBarChartDataset,
    StackedBarChartOptions,
    StackedBarChartProps,
} from '@/components/chartjs/components/stacked-bar-chart/StackedBarChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const STACKED_BAR_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly ChartJSEffect[];

const isStackedBarChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined &&
    (STACKED_BAR_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

const resolveEffect = (
    effect: ChartEffect | undefined,
): ChartJSEffect | undefined =>
    isStackedBarChartEffect(effect) ? effect : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): StackedBarChartColors | undefined => {
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
): StackedBarChartDataset[] =>
    data.series.map((series) => ({
        label: series.label,
        data: toNumberSeriesData(series.data),
        ...(series.color !== undefined ? { color: series.color } : {}),
    }));

export const adaptChartJSStackedBarProps = (
    props: EngineRendererProps,
): StackedBarChartProps => {
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
        options: options as StackedBarChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};