import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
    StackedAreaChartAppearance,
    StackedAreaChartColors,
    StackedAreaChartOptions,
    StackedAreaChartProps,
    StackedAreaChartSeries,
} from '@/components/echarts/components/stacked-area-chart/StackedAreaChart.types';
import type {
    ChartAppearance,
    ChartEffect,
    EngineRendererProps,
} from '@/engines/engine.types';

const STACKED_AREA_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly EChartsEffect[];

const STACKED_AREA_CHART_APPEARANCES = [
    'basic',
    'smooth',
] as const satisfies readonly StackedAreaChartAppearance[];

const isStackedAreaChartEffect = (
    effect: ChartEffect | undefined,
): effect is EChartsEffect =>
    effect !== undefined &&
    (STACKED_AREA_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

const resolveEffect = (
    effect: ChartEffect | undefined,
): EChartsEffect | undefined => (isStackedAreaChartEffect(effect) ? effect : undefined);

const isStackedAreaChartAppearance = (
    appearance: ChartAppearance | undefined,
): appearance is StackedAreaChartAppearance =>
    appearance !== undefined &&
    (STACKED_AREA_CHART_APPEARANCES as readonly ChartAppearance[]).includes(appearance);

const resolveAppearance = (
    appearance: ChartAppearance | undefined,
): StackedAreaChartAppearance | undefined =>
    isStackedAreaChartAppearance(appearance) ? appearance : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): StackedAreaChartColors | undefined => {
    if (!colors) {
        return undefined;
    }

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

const resolveData = (
    data: EngineRendererProps['data'],
): StackedAreaChartSeries[] =>
    data.series.map((series) => ({
        label: series.label,
        data: toNumberSeriesData(series.data),
        ...(series.color !== undefined ? { color: series.color } : {}),
        ...(series.pointColor !== undefined ? { pointColor: series.pointColor } : {}),
        ...(series.pointRadius !== undefined ? { pointRadius: series.pointRadius } : {}),
        ...(series.borderWidth !== undefined ? { borderWidth: series.borderWidth } : {}),
    }));

export const adaptEChartsStackedAreaProps = (
    props: EngineRendererProps,
): StackedAreaChartProps => {
    const {
        data,
        colors,
        appearance,
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
            series: resolveData(data),
        },
        colors: resolveColors(colors),
        appearance: resolveAppearance(appearance),
        effect: resolveEffect(effect),
        options: options as StackedAreaChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};