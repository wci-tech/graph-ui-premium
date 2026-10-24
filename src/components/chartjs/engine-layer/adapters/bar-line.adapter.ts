import { compactObject } from '@wci-tech/core-ui-premium';

import type {
    BarLineChartDataset,
    BarLineChartEffect,
    BarLineChartProps,
} from '@/components/chartjs/components/bar-line-chart/BarLineChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const CHARTJS_BAR_LINE_EFFECTS: readonly BarLineChartEffect[] = [
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
): BarLineChartEffect =>
    CHARTJS_BAR_LINE_EFFECTS.includes(effect as BarLineChartEffect)
        ? (effect as BarLineChartEffect)
        : 'none';

const resolveAppearance = (
    appearance: EngineRendererProps['appearance'],
): BarLineChartProps['appearance'] =>
    appearance === 'basic' || appearance === 'smooth' ? appearance : undefined;

const toBarLineChartData = (
    series: EngineRendererProps['data']['series'],
): BarLineChartDataset[] =>
    series.map((seriesItem, index) =>
        compactObject({
            type: index === 0 ? 'bar' : 'line',
            label: seriesItem.label,
            data: Array.from(seriesItem.data),
            color: seriesItem.color,
            pointRadius: seriesItem.pointRadius,
            borderWidth: seriesItem.borderWidth,
        }),
    );

export const adaptChartJSBarLineProps = ({
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
        labels: Array.from(data.labels),
        data: toBarLineChartData(data.series),
        effect: resolveEffect(effect),
        colors,
        appearance: resolveAppearance(appearance),
        options,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });