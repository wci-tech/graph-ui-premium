import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    DoughnutChartColors,
    DoughnutChartEffect,
    DoughnutChartOptions,
    DoughnutChartProps,
} from '@/components/echarts/components/doughnut-chart/DoughnutChart.types';
import type {
    ChartColors,
    EngineRendererProps,
} from '@/engines/engine.types';

const ECHARTS_DOUGHNUT_EFFECTS: readonly DoughnutChartEffect[] = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
];

const resolveEffect = (
    effect: EngineRendererProps['effect'],
): DoughnutChartEffect =>
    ECHARTS_DOUGHNUT_EFFECTS.includes(
        effect as DoughnutChartEffect,
    )
        ? (effect as DoughnutChartEffect)
        : 'none';

const resolveData = (
    data: EngineRendererProps['data'],
): DoughnutChartProps['data'] => ({
    labels: data.labels.map(String),
    series: data.series.map(
        (seriesItem) =>
            compactObject({
                label: seriesItem.label,
                data: toNumberSeriesData(
                    seriesItem.data,
                ),
                color: seriesItem.color,
            }),
    ),
});

const resolveColors = (
    colors: ChartColors | undefined,
): DoughnutChartColors | undefined => {
    if (!colors) {
        return undefined;
    }

    return compactObject({
        series: colors.series
            ? Array.from(colors.series)
            : undefined,
        legendText: colors.axisText,
        tooltipBackground:
            colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

const resolveOptions = (
    options: EngineRendererProps['options'],
): DoughnutChartOptions | undefined =>
    options as DoughnutChartOptions | undefined;

export const adaptEChartsDoughnutProps = ({
    data,
    colors,
    options,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): DoughnutChartProps =>
    compactObject({
        data: resolveData(data),
        colors: resolveColors(colors),
        options: resolveOptions(options),
        effect: resolveEffect(effect),
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });