import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type { EChartsEffect } from '@/components/echarts/common-effects';
import type {
    RadarChartColors,
    RadarChartData,
    RadarChartOptions,
    RadarChartProps,
    RadarChartSeries,
} from '@/components/echarts/components/radar-chart/RadarChart.types';
import type { ChartEffect, EngineRendererProps } from '@/engines/engine.types';

const RADAR_CHART_EFFECTS = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
] as const satisfies readonly EChartsEffect[];

/**
 * Checks whether the shared chart effect is supported by ECharts Radar Chart.
 *
 * @param effect - Shared chart effect.
 * @returns Whether the effect is supported by ECharts Radar Chart.
 */
const isRadarChartEffect = (
    effect: ChartEffect | undefined,
): effect is EChartsEffect =>
    effect !== undefined &&
    (RADAR_CHART_EFFECTS as readonly ChartEffect[]).includes(effect);

/**
 * Resolves a shared chart effect into an ECharts Radar Chart-supported effect.
 *
 * Unsupported chart-specific effects are omitted so Radar Chart can
 * fall back to its default "none" effect.
 *
 * @param effect - Shared chart effect.
 * @returns Supported Radar Chart effect or undefined.
 */
const resolveEffect = (
    effect: ChartEffect | undefined,
): EChartsEffect | undefined =>
    isRadarChartEffect(effect) ? effect : undefined;

/**
 * Resolves normalized engine colors into ECharts Radar Chart-specific colors.
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
 * Resolves normalized engine series into ECharts Radar Chart series.
 *
 * Non-numeric series data resolves to an empty numeric series.
 *
 * @param data - Normalized engine chart data.
 * @returns Radar Chart series.
 */
const resolveSeries = (
    data: EngineRendererProps['data'],
): RadarChartSeries[] =>
    data.series.map((series) =>
        compactObject({
            label: series.label,
            data: toNumberSeriesData(series.data),
            color: series.color,
        }),
    );

/**
 * Resolves normalized engine data into the ECharts Radar Chart data shape.
 *
 * @param data - Normalized engine chart data.
 * @returns Radar Chart data.
 */
const resolveData = (
    data: EngineRendererProps['data'],
): RadarChartData => ({
    labels: Array.from(data.labels),
    series: resolveSeries(data),
});

/**
 * Adapts normalized engine props to the ECharts Radar Chart API.
 *
 * Each normalized numeric series is converted into an ECharts Radar series.
 *
 * @param props - Normalized engine renderer props.
 * @returns Props accepted by the ECharts Radar Chart.
 */
export const adaptEChartsRadarProps = (
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