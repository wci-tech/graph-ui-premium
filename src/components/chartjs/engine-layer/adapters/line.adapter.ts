import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    LineChartAppearance,
    LineChartColors,
    LineChartDataset,
    LineChartOptions,
    LineChartProps,
} from '@/components/chartjs/components/line-chart/LineChart.types';
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
] as const satisfies ChartJSEffect[];

const LINE_CHART_APPEARANCES = [
    'solid',
    'smooth',
    'dashed',
    'dotted',
    'stepped',
] as const satisfies LineChartAppearance[];

const isLineChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined &&
    (LINE_CHART_EFFECTS as ChartEffect[]).includes(effect);

const isLineChartAppearance = (
    appearance: ChartAppearance | undefined,
): appearance is LineChartAppearance =>
    appearance !== undefined &&
    (LINE_CHART_APPEARANCES as ChartAppearance[]).includes(appearance);

const resolveEffect = (
    effect: ChartEffect | undefined,
): ChartJSEffect | undefined =>
    isLineChartEffect(effect) ? effect : undefined;

const resolveAppearance = (
    appearance: ChartAppearance | undefined,
): LineChartAppearance | undefined => {
    if (appearance === 'basic') return 'solid';

    return isLineChartAppearance(appearance) ? appearance : undefined;
};

const resolveColors = (
    colors: EngineRendererProps['colors'],
): LineChartColors | undefined => {
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
): LineChartDataset[] =>
    data.series.map((series) =>
        compactObject({
            label: series.label,
            data: toNumberSeriesData(series.data),
            color: series.color,
            pointColor: series.pointColor,
            pointRadius: series.pointRadius,
            borderWidth: series.borderWidth,
        }),
    );

export const adaptChartJSLineProps = (
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

    return {
        labels: Array.from(data.labels),
        data: resolveData(data),
        ...compactObject({
            colors: resolveColors(colors),
            appearance: resolveAppearance(appearance),
            effect: resolveEffect(effect),
            options: options as LineChartOptions | undefined,
            showDownload,
            downloadPlacement,
            rendererCustomStyles: customStyles,
            className,
            testId,
        }),
    };
};