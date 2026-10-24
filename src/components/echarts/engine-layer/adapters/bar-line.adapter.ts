import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    BarLineChartAppearance,
    BarLineChartColors,
    BarLineChartEffect,
    BarLineChartOptions,
    BarLineChartProps,
    BarLineChartSeries,
} from '@/components/echarts/components/bar-line-chart/BarLineChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const ECHARTS_BAR_LINE_EFFECTS: readonly BarLineChartEffect[] = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
];

const ECHARTS_BAR_LINE_APPEARANCES: readonly BarLineChartAppearance[] = [
    'basic',
    'smooth',
];

const resolveEffect = (
    effect: EngineRendererProps['effect'],
): BarLineChartEffect =>
    ECHARTS_BAR_LINE_EFFECTS.includes(effect as BarLineChartEffect)
        ? (effect as BarLineChartEffect)
        : 'none';

const resolveAppearance = (
    appearance: EngineRendererProps['appearance'],
): BarLineChartProps['appearance'] => {
    if (appearance === 'solid') {
        return 'smooth';
    }

    return ECHARTS_BAR_LINE_APPEARANCES.includes(
        appearance as BarLineChartAppearance,
    )
        ? (appearance as BarLineChartAppearance)
        : undefined;
};

const resolveOptions = (
    options: EngineRendererProps['options'],
): BarLineChartOptions | undefined =>
    options ? (options as BarLineChartOptions) : undefined;

const resolveColors = (
    colors: EngineRendererProps['colors'],
): BarLineChartColors | undefined =>
    colors ? (colors as BarLineChartColors) : undefined;

const toBarLineChartData = (
    series: EngineRendererProps['data']['series'],
): BarLineChartSeries[] =>
    series.map((seriesItem, index) =>
        compactObject({
            label: seriesItem.label,
            data: toNumberSeriesData(seriesItem.data),
            type: index === 0 ? 'bar' : 'line',
            color: seriesItem.color,
            pointRadius: seriesItem.pointRadius,
            borderWidth: seriesItem.borderWidth,
        }),
    );

export const adaptEChartsBarLineProps = ({
    data,
    colors,
    options,
    appearance,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): BarLineChartProps =>
    compactObject({
        data: {
            labels: Array.from(data.labels),
            series: toBarLineChartData(data.series),
        },
        colors: resolveColors(colors),
        options: resolveOptions(options),
        appearance: resolveAppearance(appearance),
        effect: resolveEffect(effect),
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });