import type {
    ChartBubblePoint,
    ChartBubbleTuple,
    ChartSeriesData,
} from '@/engines/engine.types';

export const isNumberSeriesData = (
    data: ChartSeriesData,
): data is readonly number[] =>
    data.every((value) => typeof value === 'number');

export const isBubblePoint = (
    value: unknown,
): value is ChartBubblePoint => {
    if (
        typeof value !== 'object' ||
        value === null ||
        Array.isArray(value)
    ) {
        return false;
    }

    const point = value as Record<string, unknown>;

    return (
        typeof point['x'] === 'number' &&
        typeof point['y'] === 'number' &&
        typeof point['r'] === 'number'
    );
};

export const isBubbleTuple = (
    value: unknown,
): value is ChartBubbleTuple =>
    Array.isArray(value) &&
    value.length >= 3 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number' &&
    typeof value[2] === 'number';

export const isBubblePointSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartBubblePoint[] =>
    data.every(isBubblePoint);

export const isBubbleTupleSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartBubbleTuple[] =>
    data.every(isBubbleTuple);

export const toNumberSeriesData = (
    data: ChartSeriesData,
): number[] => {
    if (!isNumberSeriesData(data)) {
        return [];
    }

    return Array.from(data);
};

export const toBubblePointSeriesData = (
    data: ChartSeriesData,
): ChartBubblePoint[] => {
    if (isBubblePointSeriesData(data)) {
        return Array.from(data);
    }

    if (isBubbleTupleSeriesData(data)) {
        return data.map(([x, y, value]) => ({
            x,
            y,
            r: value,
        }));
    }

    return [];
};

export const toBubbleTupleSeriesData = (
    data: ChartSeriesData,
): ChartBubbleTuple[] => {
    if (isBubbleTupleSeriesData(data)) {
        return Array.from(data);
    }

    if (isBubblePointSeriesData(data)) {
        return data.map(({ x, y, r }) => [x, y, r]);
    }

    return [];
};