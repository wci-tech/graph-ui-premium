import { compactObject } from '@wci-tech/core-ui-premium';

import type {
    PieChartColors,
    PieChartOptions,
    PieChartProps,
} from '@/components/chartjs/components/pie-chart/PieChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

import { toNumberSeriesData } from './adaptersHelper.utils';

/**
 * Resolves the normalized engine colors into Pie Chart-specific colors.
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
    const { data, colors, options } = props;
    const [series] = data.series;

    return compactObject({
        labels: Array.from(data.labels),
        data: series ? toNumberSeriesData(series.data) : [],
        colors: resolveColors(colors),
        effect: props.effect,
        options: options as PieChartOptions | undefined,
        showDownload: props.showDownload,
        downloadPlacement: props.downloadPlacement,
        rendererCustomStyles: props.customStyles,
        className: props.className,
        testId: props.testId,
    });
};