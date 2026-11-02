import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
    LineChartAppearance,
    LineChartColors,
    LineChartOptions,
    LineChartProps,
    LineChartSeries,
} from '@/components/echarts/components/line-chart/LineChart.types';
import type {
    ChartAppearance,
    ChartEffect,
    EngineRendererProps,
} from '@/engines/engine.types';


const LINE_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies EChartsEffect[];

const LINE_CHART_APPEARANCES = [
    'solid',
    'smooth',
    'dashed',
    'dotted',
    'stepped',
] as const satisfies LineChartAppearance[];

const isLineChartEffect = (
    effect: ChartEffect | undefined,
): effect is EChartsEffect =>
    effect !== undefined &&
    (LINE_CHART_EFFECTS as ChartEffect[]).includes(effect);

const isLineChartAppearance = (
    appearance: ChartAppearance | undefined,
): appearance is LineChartAppearance =>
    appearance !== undefined &&
    (LINE_CHART_APPEARANCES as ChartAppearance[]).includes(appearance);

const resolveEffect = (
    effect: ChartEffect | undefined,
): EChartsEffect | undefined =>
    isLineChartEffect(effect) ? effect : undefined;

const resolveAppearance = (
    appearance: ChartAppearance | undefined,
): LineChartAppearance | undefined => {
    if (appearance === 'basic') return 'solid';

    return isLineChartAppearance(appearance)
        ? appearance
        : undefined;
};

const resolveColors = (
    colors: EngineRendererProps['colors'],
): LineChartColors | undefined => {
    if (!colors) return undefined;

    return {
        ...(colors.series
            ? { series: Array.from(colors.series) }
            : {}),
        ...(colors.axisText
            ? { axisText: colors.axisText }
            : {}),
        ...(colors.axisLine
            ? { axisLine: colors.axisLine }
            : {}),
        ...(colors.grid
            ? { grid: colors.grid }
            : {}),
        ...(colors.tooltipBackground
            ? {
                tooltipBackground:
                    colors.tooltipBackground,
            }
            : {}),
        ...(colors.tooltipText
            ? { tooltipText: colors.tooltipText }
            : {}),
        ...(colors.tooltipBorder
            ? {
                tooltipBorder:
                    colors.tooltipBorder,
            }
            : {}),
    };
};

const resolveSeries = (
    props: EngineRendererProps,
): LineChartSeries[] =>
    props.data.series.map((series) => ({
        label: series.label,
        data: toNumberSeriesData(series.data),
        ...(series.color
            ? { color: series.color }
            : {}),
        ...(series.pointColor
            ? { pointColor: series.pointColor }
            : {}),
        ...(series.pointRadius !== undefined
            ? { pointRadius: series.pointRadius }
            : {}),
        ...(series.borderWidth !== undefined
            ? { borderWidth: series.borderWidth }
            : {}),
    }));

export const adaptEChartsLineProps = (
    props: EngineRendererProps,
): LineChartProps => {
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

    const resolvedColors = resolveColors(colors);
    const resolvedAppearance =
        resolveAppearance(appearance);
    const resolvedEffect =
        resolveEffect(effect);

    return {
        data: {
            labels: Array.from(data.labels),
            series: resolveSeries(props),
        },
        ...(resolvedColors
            ? { colors: resolvedColors }
            : {}),
        ...(resolvedAppearance
            ? { appearance: resolvedAppearance }
            : {}),
        ...(resolvedEffect
            ? { effect: resolvedEffect }
            : {}),
        ...(options
            ? {
                options:
                    options as LineChartOptions,
            }
            : {}),
        ...(showDownload !== undefined
            ? { showDownload }
            : {}),
        ...(downloadPlacement
            ? { downloadPlacement }
            : {}),
        ...(customStyles
            ? {
                rendererCustomStyles:
                    customStyles,
            }
            : {}),
        ...(className
            ? { className }
            : {}),
        ...(testId
            ? { testId }
            : {}),
    };
};