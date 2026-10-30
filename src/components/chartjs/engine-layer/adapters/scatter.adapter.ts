import { compactObject } from '@wci-tech/core-ui-premium';

import { toScatterPointSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    ScatterChartColors,
    ScatterChartDataset,
    ScatterChartOptions,
    ScatterChartProps,
} from '@/components/chartjs/components/scatter-chart/ScatterChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const SCATTER_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly ChartJSEffect[];

/**
 * Checks whether the shared chart effect is supported by Scatter Chart.
 *
 * @param effect - Shared chart effect.
 * @returns Whether the effect is supported by Scatter Chart.
 */
const isScatterChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined &&
    (SCATTER_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

/**
 * Resolves a shared chart effect into a Scatter Chart-supported effect.
 *
 * Unsupported chart-specific effects are omitted so Scatter Chart can
 * fall back to its default "none" effect.
 *
 * @param effect - Shared chart effect.
 * @returns Supported Scatter Chart effect or undefined.
 */
const resolveEffect = (
    effect: ChartEffect | undefined,
): ChartJSEffect | undefined =>
    isScatterChartEffect(effect) ? effect : undefined;

/**
 * Resolves normalized engine colors into Scatter Chart-specific colors.
 *
 * @param colors - Shared chart colors.
 * @returns Scatter Chart color configuration.
 */
const resolveColors = (
    colors: EngineRendererProps['colors'],
): ScatterChartColors | undefined => {
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
 * Resolves normalized engine series into Scatter Chart datasets.
 *
 * Each valid normalized x/y series is converted into a Scatter Chart dataset.
 *
 * @param data - Normalized engine chart data.
 * @returns Scatter Chart datasets.
 */
const resolveData = (
    data: EngineRendererProps['data'],
): ScatterChartDataset[] =>
    data.series.map((series) => ({
        label: series.label,
        data: toScatterPointSeriesData(series.data),
        ...(series.color !== undefined ? { color: series.color } : {}),
        ...(series.pointRadius !== undefined
            ? { pointRadius: series.pointRadius }
            : {}),
    }));

/**
 * Adapts normalized engine props to the Chart.js Scatter Chart API.
 *
 * Each normalized x/y series is converted into a Scatter Chart dataset.
 *
 * @param props - Normalized engine renderer props.
 * @returns Props accepted by the Chart.js Scatter Chart.
 */
export const adaptChartJSScatterProps = (
    props: EngineRendererProps,
): ScatterChartProps => {
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
        data: resolveData(data),
        colors: resolveColors(colors),
        effect: resolveEffect(effect),
        options: options as ScatterChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};