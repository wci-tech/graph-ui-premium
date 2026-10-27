import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    DoughnutChartColors,
    DoughnutChartEffect,
    DoughnutChartOptions,
    DoughnutChartProps,
} from '@/components/chartjs/components/doughnut-chart/DoughnutChart.types';
import type {
    ChartColors,
    EngineRendererProps,
} from '@/engines/engine.types';

const CHARTJS_DOUGHNUT_EFFECTS: readonly DoughnutChartEffect[] = [
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
    CHARTJS_DOUGHNUT_EFFECTS.includes(
        effect as DoughnutChartEffect,
    )
        ? (effect as DoughnutChartEffect)
        : 'none';

const resolveData = (
    data: EngineRendererProps['data'],
): number[] => {
    const [seriesItem] = data.series;

    if (!seriesItem) {
        return [];
    }

    return toNumberSeriesData(
        seriesItem.data,
    );
};

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

export const adaptChartJSDoughnutProps = ({
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
        labels: data.labels.map(String),
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