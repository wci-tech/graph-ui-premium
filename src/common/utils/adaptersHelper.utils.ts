import type {
    ChartBubblePoint,
    ChartBubbleTuple,
    ChartCandlestickPoint,
    ChartGanttTask,
    ChartHeatmapPoint,
    ChartScatterPoint,
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

export const isScatterPoint = (
    value: unknown,
): value is ChartScatterPoint => {
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
        typeof point['y'] === 'number'
    );
};

export const isCandlestickPoint = (
    value: unknown,
): value is ChartCandlestickPoint => {
    if (
        typeof value !== 'object' ||
        value === null ||
        Array.isArray(value)
    ) {
        return false;
    }

    const point = value as Record<string, unknown>;
    const timestamp = point['t'];

    return (
        (
            typeof timestamp === 'string' ||
            typeof timestamp === 'number' ||
            timestamp instanceof Date
        ) &&
        (
            typeof point['o'] === 'number' ||
            typeof point['o'] === 'string'
        ) &&
        (
            typeof point['h'] === 'number' ||
            typeof point['h'] === 'string'
        ) &&
        (
            typeof point['l'] === 'number' ||
            typeof point['l'] === 'string'
        ) &&
        (
            typeof point['c'] === 'number' ||
            typeof point['c'] === 'string'
        ) &&
        (
            typeof point['v'] === 'number' ||
            typeof point['v'] === 'string'
        )
    );
};

const isGanttDateValue = (
    value: unknown,
): value is string | number | Date =>
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date;

export const isGanttTask = (
    value: unknown,
): value is ChartGanttTask => {
    if (
        typeof value !== 'object' ||
        value === null ||
        Array.isArray(value)
    ) {
        return false;
    }

    const task = value as Record<string, unknown>;

    return (
        typeof task['label'] === 'string' &&
        isGanttDateValue(task['start']) &&
        isGanttDateValue(task['end']) &&
        (
            task['color'] === undefined ||
            typeof task['color'] === 'string'
        )
    );
};

export const isHeatmapPoint = (
    value: unknown,
): value is ChartHeatmapPoint => {
    if (
        typeof value !== 'object' ||
        value === null ||
        Array.isArray(value)
    ) {
        return false;
    }

    const point = value as Record<string, unknown>;

    return (
        typeof point['x'] === 'string' &&
        typeof point['y'] === 'string' &&
        typeof point['v'] === 'number' &&
        (
            point['color'] === undefined ||
            typeof point['color'] === 'string'
        )
    );
};

export const isBubblePointSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartBubblePoint[] =>
    data.every(isBubblePoint);

export const isBubbleTupleSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartBubbleTuple[] =>
    data.every(isBubbleTuple);

export const isScatterPointSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartScatterPoint[] =>
    data.every(isScatterPoint);

export const isCandlestickSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartCandlestickPoint[] =>
    data.every(isCandlestickPoint);

export const isGanttSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartGanttTask[] =>
    data.every(isGanttTask);

export const isHeatmapSeriesData = (
    data: ChartSeriesData,
): data is readonly ChartHeatmapPoint[] =>
    data.every(isHeatmapPoint);

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
        return data.map(
            ({ x, y, r }) => [x, y, r],
        );
    }

    return [];
};

export const toScatterPointSeriesData = (
    data: ChartSeriesData,
): ChartScatterPoint[] => {
    if (!isScatterPointSeriesData(data)) {
        return [];
    }

    return Array.from(data);
};

export const toCandlestickSeriesData = (
    data: ChartSeriesData,
): ChartCandlestickPoint[] => {
    if (!isCandlestickSeriesData(data)) {
        return [];
    }

    return Array.from(data);
};

export const toGanttSeriesData = (
    data: ChartSeriesData,
): ChartGanttTask[] => {
    if (!isGanttSeriesData(data)) {
        return [];
    }

    return Array.from(data);
};

export const toHeatmapSeriesData = (
    data: ChartSeriesData,
): ChartHeatmapPoint[] => {
    if (!isHeatmapSeriesData(data)) {
        return [];
    }

    return Array.from(data);
};