import { compactObject } from '@wci-tech/core-ui-premium';

import type {
    BubbleChartDataset,
    BubbleChartEffect,
    BubbleChartProps,
    BubblePoint,
} from '@/components/chartjs/components/bubble-chart/BubbleChart.types';
import type { EngineRendererProps } from '@/engines/engine.types';

const CHARTJS_BUBBLE_EFFECTS: readonly BubbleChartEffect[] = [
    'none',
    'bounce',
    'wobble',
    'elastic',
    'progressive-trace',
    'elastic-glide',
    'staggered-reveal',
];

const DEFAULT_ECHARTS_SIZE_MULTIPLIER = 5;

const resolveEffect = (
    effect: EngineRendererProps['effect'],
): BubbleChartEffect =>
    CHARTJS_BUBBLE_EFFECTS.includes(effect as BubbleChartEffect)
        ? (effect as BubbleChartEffect)
        : 'none';

const isObjectBubblePoint = (
    value: unknown,
): value is BubblePoint =>
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
): value is readonly [number, number, number] =>
    Array.isArray(value) &&
    value.length >= 3 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number' &&
    typeof value[2] === 'number';

const getNormalizedChartJSRadius = (
    value: number,
): number =>
    (Math.sqrt(Math.max(value, 0)) * DEFAULT_ECHARTS_SIZE_MULTIPLIER) / 2;

const toBubblePoint = (
    value: unknown,
): BubblePoint | undefined => {
    if (isObjectBubblePoint(value)) {
        return {
            x: value.x,
            y: value.y,
            r: value.r,
        };
    }

    if (isTupleBubblePoint(value)) {
        return {
            x: value[0],
            y: value[1],
            r: getNormalizedChartJSRadius(value[2]),
        };
    }

    return undefined;
};

const toBubblePoints = (
    data: readonly unknown[],
): BubblePoint[] =>
    data.reduce<BubblePoint[]>((points, value) => {
        const point = toBubblePoint(value);

        if (point) {
            points.push(point);
        }

        return points;
    }, []);

const toBubbleChartData = (
    series: EngineRendererProps['data']['series'],
): BubbleChartDataset[] =>
    series.map((seriesItem) =>
        compactObject({
            label: seriesItem.label,
            data: toBubblePoints(seriesItem.data),
            color: seriesItem.color,
            borderWidth: seriesItem.borderWidth,
        }),
    );

export const adaptChartJSBubbleProps = ({
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
        data: toBubbleChartData(data.series),
        effect: resolveEffect(effect),
        colors,
        options,
        showDownload,
        downloadPlacement,
        rendererCustomStyles: customStyles,
        className,
        testId,
    });