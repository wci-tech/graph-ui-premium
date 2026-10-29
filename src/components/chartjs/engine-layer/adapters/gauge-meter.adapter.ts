import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    GaugeMeterColors,
    GaugeMeterEffect,
    GaugeMeterOptions,
    GaugeMeterProps,
} from '@/components/chartjs/components/gauge-meter/GaugeMeter.types';
import type {
    ChartColors,
    EngineRendererProps,
} from '@/engines/engine.types';

const CHARTJS_GAUGE_METER_EFFECTS: readonly GaugeMeterEffect[] = [
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
): GaugeMeterEffect =>
    CHARTJS_GAUGE_METER_EFFECTS.includes(effect as GaugeMeterEffect)
        ? (effect as GaugeMeterEffect)
        : 'none';

const resolveData = (
    data: EngineRendererProps['data'],
): number[] => {
    const [seriesItem] = data.series;

    if (!seriesItem) {
        return [];
    }

    return toNumberSeriesData(seriesItem.data);
};

const resolveColors = (
    colors: ChartColors | undefined,
): GaugeMeterColors | undefined => {
    if (!colors) {
        return undefined;
    }

    return compactObject({
        series: colors.series ? Array.from(colors.series) : undefined,
        needle: colors.axisLine,
        label: colors.axisText,
        score: colors.axisText,
        scoreLabel: colors.axisText,
        tooltipBackground: colors.tooltipBackground,
        tooltipText: colors.tooltipText,
        tooltipBorder: colors.tooltipBorder,
    });
};

const resolveOptions = (
    options: EngineRendererProps['options'],
): GaugeMeterOptions | undefined =>
    options as GaugeMeterOptions | undefined;

const resolveValue = (
    options: GaugeMeterOptions | undefined,
): number | undefined => {
    const value = options?.value;

    return typeof value === 'number' ? value : undefined;
};

export const adaptChartJSGaugeMeterProps = ({
    data,
    colors,
    options,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): GaugeMeterProps => {
    const resolvedOptions = resolveOptions(options);

    return compactObject({
        labels: data.labels.map(String),
        data: resolveData(data),
        value: resolveValue(resolvedOptions),
        colors: resolveColors(colors),
        options: resolvedOptions,
        effect: resolveEffect(effect),
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });
};