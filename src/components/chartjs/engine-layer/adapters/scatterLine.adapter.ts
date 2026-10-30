import { compactObject } from '@wci-tech/core-ui-premium';

import { toScatterPointSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    ScatterLineChartAppearance,
    ScatterLineChartColors,
    ScatterLineChartDataset,
    ScatterLineChartOptions,
    ScatterLineChartProps,
} from '@/components/chartjs/components/scatter-line-chart/ScatterLineChart.types';
import type {
    ChartAppearance,
    ChartEffect,
    EngineRendererProps,
} from '@/engines/engine.types';

const SCATTER_LINE_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly ChartJSEffect[];

const SCATTER_LINE_CHART_APPEARANCES = [
    'basic',
    'smooth',
] as const satisfies readonly ScatterLineChartAppearance[];

/**
 * Checks whether the shared chart effect is supported by Scatter Line Chart.
 *
 * @param effect - Shared chart effect.
 * @returns Whether the effect is supported by Scatter Line Chart.
 */
const isScatterLineChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined &&
    (SCATTER_LINE_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

/**
 * Resolves a shared chart effect into a Scatter Line Chart-supported effect.
 *
 * Unsupported chart-specific effects are omitted so Scatter Line Chart can
 * fall back to its default "none" effect.
 *
 * @param effect - Shared chart effect.
 * @returns Supported Scatter Line Chart effect or undefined.
 */
const resolveEffect = (
    effect: ChartEffect | undefined,
): ChartJSEffect | undefined =>
    isScatterLineChartEffect(effect) ? effect : undefined;

/**
 * Checks whether the shared chart appearance is supported by Scatter Line Chart.
 *
 * @param appearance - Shared chart appearance.
 * @returns Whether the appearance is supported by Scatter Line Chart.
 */
const isScatterLineChartAppearance = (
    appearance: ChartAppearance | undefined,
): appearance is ScatterLineChartAppearance =>
    appearance !== undefined &&
    (
        SCATTER_LINE_CHART_APPEARANCES as readonly ChartAppearance[]
    ).includes(appearance);

/**
 * Resolves a shared chart appearance into a Scatter Line Chart-supported appearance.
 *
 * Unsupported appearances are omitted so Scatter Line Chart can fall back
 * to its default "smooth" appearance.
 *
 * @param appearance - Shared chart appearance.
 * @returns Supported Scatter Line Chart appearance or undefined.
 */
const resolveAppearance = (
    appearance: ChartAppearance | undefined,
): ScatterLineChartAppearance | undefined =>
    isScatterLineChartAppearance(appearance) ? appearance : undefined;

/**
 * Resolves normalized engine colors into Scatter Line Chart-specific colors.
 *
 * @param colors - Shared chart colors.
 * @returns Scatter Line Chart color configuration.
 */
const resolveColors = (
    colors: EngineRendererProps['colors'],
): ScatterLineChartColors | undefined => {
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

/**
 * Resolves normalized engine series into Scatter Line Chart datasets.
 *
 * Each valid normalized x/y series is converted into a Scatter Line Chart
 * dataset while preserving supported series-level overrides.
 *
 * @param data - Normalized engine chart data.
 * @returns Scatter Line Chart datasets.
 */
const resolveData = (
    data: EngineRendererProps['data'],
): ScatterLineChartDataset[] =>
    data.series.map((series) => ({
        label: series.label,
        data: toScatterPointSeriesData(series.data),
        ...(series.color !== undefined ? { color: series.color } : {}),
        ...(series.pointColor !== undefined
            ? { pointColor: series.pointColor }
            : {}),
        ...(series.pointRadius !== undefined
            ? { pointRadius: series.pointRadius }
            : {}),
        ...(series.borderWidth !== undefined
            ? { borderWidth: series.borderWidth }
            : {}),
    }));

/**
 * Adapts normalized engine props to the Chart.js Scatter Line Chart API.
 *
 * Shared x/y point data is converted into Scatter Line Chart datasets while
 * shared appearance, effect, colors and renderer props are normalized to the
 * direct Scatter Line Chart API.
 *
 * @param props - Normalized engine renderer props.
 * @returns Props accepted by the Chart.js Scatter Line Chart.
 */
export const adaptChartJSScatterLineProps = (
    props: EngineRendererProps,
): ScatterLineChartProps => {
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
        data: resolveData(data),
        colors: resolveColors(colors),
        appearance: resolveAppearance(appearance),
        effect: resolveEffect(effect),
        options: options as ScatterLineChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};
