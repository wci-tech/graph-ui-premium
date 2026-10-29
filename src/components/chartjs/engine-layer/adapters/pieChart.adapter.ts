import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    PieChartColors,
    PieChartOptions,
    PieChartProps,
} from '@/components/chartjs/components/pie-chart/PieChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const PIE_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly ChartJSEffect[];

/**
 * Checks whether the shared chart effect is supported by Pie Chart.
 *
 * @param effect - Shared chart effect.
 * @returns Whether the effect is supported by Pie Chart.
 */
const isPieChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined &&
    (PIE_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

/**
 * Resolves a shared chart effect into a Pie Chart-supported effect.
 *
 * Unsupported chart-specific effects are omitted so Pie Chart can
 * fall back to its default "none" effect.
 *
 * @param effect - Shared chart effect.
 * @returns Supported Pie Chart effect or undefined.
 */
const resolveEffect = (
    effect: ChartEffect | undefined,
): ChartJSEffect | undefined =>
    isPieChartEffect(effect) ? effect : undefined;

/**
 * Resolves normalized engine colors into Pie Chart-specific colors.
 *
 * @param colors - Shared chart colors.
 * @returns Pie Chart color configuration.
 */
const resolveColors = (
    colors: EngineRendererProps['colors'],
): PieChartColors | undefined => {
    if (!colors) return undefined;

    return compactObject({
        series: colors.series,
        label: colors.axisText,
        border: colors.axisLine,
        crosshair: colors.axisLine,
        tooltipBackground: colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

/**
 * Adapts normalized engine props to the Chart.js Pie Chart API.
 *
 * Pie Chart uses the first numeric series as its slice values.
 *
 * @param props - Normalized engine renderer props.
 * @returns Props accepted by the Chart.js Pie Chart.
 */
export const adaptChartJSPieProps = (
    props: EngineRendererProps,
): PieChartProps => {
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

    const [series] = data.series;

    return compactObject({
        labels: Array.from(data.labels),
        data: series ? toNumberSeriesData(series.data) : [],
        colors: resolveColors(colors),
        effect: resolveEffect(effect),
        options: options as PieChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};