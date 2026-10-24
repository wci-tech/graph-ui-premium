import { compactObject } from '@wci-tech/core-ui-premium';

import type {
    BubbleChartEffect,
    BubbleChartProps,
    BubbleSeriesDefinition,
} from '@/components/echarts/components/bubble-chart/BubbleChart.types';
import type { BubblePoint } from '@/components/echarts/ECharts.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const ECHARTS_BUBBLE_EFFECTS: readonly BubbleChartEffect[] = [
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
): BubbleChartEffect =>
    ECHARTS_BUBBLE_EFFECTS.includes(
        effect as BubbleChartEffect,
    )
        ? (effect as BubbleChartEffect)
        : 'none';

const isObjectBubblePoint = (
    value: unknown,
): value is {
    readonly x: number;
    readonly y: number;
    readonly r: number;
} =>
    typeof value === 'object' &&
    value !== null &&
    'x' in value &&
    'y' in value &&
    'r' in value &&
    typeof value.x === 'number' &&
    typeof value.y === 'number' &&
    typeof value.r === 'number';

const isTupleBubblePoint = (
    value: unknown,
): value is BubblePoint =>
    Array.isArray(value) &&
    value.length >= 3 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number' &&
    typeof value[2] === 'number';

const toBubblePoint = (
    value: unknown,
): BubblePoint | undefined => {
    if (isTupleBubblePoint(value)) {
        return [
            value[0],
            value[1],
            value[2],
        ];
    }

    if (isObjectBubblePoint(value)) {
        return [
            value.x,
            value.y,
            value.r,
        ];
    }

    return undefined;
};

const toBubblePoints = (
    data: readonly unknown[],
): BubblePoint[] =>
    data.reduce<BubblePoint[]>(
        (points, value) => {
            const point = toBubblePoint(value);

            if (point) {
                points.push(point);
            }

            return points;
        },
        [],
    );

const toBubbleChartSeries = (
    series: EngineRendererProps['data']['series'],
): BubbleSeriesDefinition[] =>
    series.map((seriesItem) =>
        compactObject({
            label: seriesItem.label,
            data: toBubblePoints(
                seriesItem.data,
            ),
            color: seriesItem.color,
        }),
    );

export const adaptEChartsBubbleProps = ({
    data,
    colors,
    options,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): BubbleChartProps =>
    compactObject({
        data: {
            series: toBubbleChartSeries(
                data.series,
            ),
        },
        colors,
        options,
        effect: resolveEffect(effect),
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });