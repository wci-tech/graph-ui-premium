import { compactObject } from '@wci-tech/core-ui-premium';

import { toNumberSeriesData } from '@/common/utils/adaptersHelper.utils';
import type {
    BarChartDataset,
    BarChartEffect,
    BarChartProps,
} from '@/components/chartjs/components/bar-chart/BarChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const CHARTJS_BAR_EFFECTS: readonly BarChartEffect[] = [
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
    CHARTJS_BAR_EFFECTS.includes(effect as BarChartEffect)
        ? (effect as BarChartEffect)
        : 'none';

const toBarChartData = (
    series: EngineRendererProps['data']['series'],
): BarChartDataset[] =>
    series.map((seriesItem) =>
        compactObject({
            label: seriesItem.label,
            data: toNumberSeriesData(seriesItem.data),
            color: seriesItem.color,
            borderWidth: seriesItem.borderWidth,
        }),
    );

export const adaptChartJSBarProps = ({
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
        labels: Array.from(data.labels),
        data: toBarChartData(data.series),
        effect: resolveEffect(effect),
        colors,
        options,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });