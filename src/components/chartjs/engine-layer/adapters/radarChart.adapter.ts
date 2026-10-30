import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { ChartJSEffect } from '@/components/chartjs/common-effects';
import type {
    RadarChartColors,
    RadarChartDataset,
    RadarChartOptions,
    RadarChartProps,
} from '@/components/chartjs/components/radar-chart/RadarChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const RADAR_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly ChartJSEffect[];

/**
 * Checks whether the shared chart effect is supported by Radar Chart.
 *
 * @param effect - Shared chart effect.
 * @returns Whether the effect is supported by Radar Chart.
 */
const isRadarChartEffect = (
    effect: ChartEffect | undefined,
): effect is ChartJSEffect =>
    effect !== undefined &&
    (RADAR_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

/**
 * Resolves a shared chart effect into a Radar Chart-supported effect.
 *
 * Unsupported chart-specific effects are omitted so Radar Chart can
 * fall back to its default "none" effect.
 *
 * @param effect - Shared chart effect.
 * @returns Supported Radar Chart effect or undefined.
 */
const resolveEffect = (
    effect: ChartEffect | undefined,
): ChartJSEffect | undefined =>
    isRadarChartEffect(effect) ? effect : undefined;

/**
 * Resolves normalized engine colors into Radar Chart-specific colors.
 *
 * @param colors - Shared chart colors.
 * @returns Radar Chart color configuration.
 */
const resolveColors = (
    colors: EngineRendererProps['colors'],
): RadarChartColors | undefined => {
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
 * Resolves normalized engine series into Radar Chart datasets.
 *
 * Non-numeric series data resolves to an empty numeric dataset.
 *
 * @param data - Normalized engine chart data.
 * @returns Radar Chart datasets.
 */
const resolveData = (
    data: EngineRendererProps['data'],
): RadarChartDataset[] =>
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

/**
 * Adapts normalized engine props to the Chart.js Radar Chart API.
 *
 * Each normalized numeric series is converted into a Radar Chart dataset.
 *
 * @param props - Normalized engine renderer props.
 * @returns Props accepted by the Chart.js Radar Chart.
 */
export const adaptChartJSRadarProps = (
    props: EngineRendererProps,
): RadarChartProps => {
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
        options: options as RadarChartOptions | undefined,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};