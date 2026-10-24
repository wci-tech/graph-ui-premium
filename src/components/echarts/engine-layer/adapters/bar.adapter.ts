import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    BarChartColors,
    BarChartEffect,
    BarChartOptions,
    BarChartProps,
    BarChartSeries,
} from '@/components/echarts/components/bar-chart/BarChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const ECHARTS_BAR_EFFECTS: readonly BarChartEffect[] = [
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
): BarChartEffect =>
    ECHARTS_BAR_EFFECTS.includes(effect as BarChartEffect)
        ? (effect as BarChartEffect)
        : 'none';

const resolveOptions = (
    options: EngineRendererProps['options'],
): BarChartOptions | undefined =>
    options
        ? (options as BarChartOptions)
        : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): BarChartColors | undefined =>
    colors
        ? (colors as BarChartColors)
        : undefined;

const toBarChartData = (
    series: EngineRendererProps['data']['series'],
): BarChartSeries[] =>
    series.map((seriesItem) =>
        compactObject({
            label: seriesItem.label,
            data: toNumberSeriesData(seriesItem.data),
            color: seriesItem.color,
            borderWidth: seriesItem.borderWidth,
        }),
    );

export const adaptEChartsBarProps = ({
    data,
    colors,
    options,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): BarChartProps =>
    compactObject({
        data: {
            labels: Array.from(data.labels),
            series: toBarChartData(data.series),
        },
        colors: resolveColors(colors),
        options: resolveOptions(options),
        effect: resolveEffect(effect),
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });