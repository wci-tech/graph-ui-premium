import {
    compactObject,
} from '@wci-tech/core-ui-premium';

import {
    toGanttSeriesData,
} from '@/common/utils/adaptersHelper.utils';
import type {
    GanttChartColors,
    GanttChartEffect,
    GanttChartOptions,
    GanttChartProps,
    GanttChartTask,
} from '@/components/echarts/components/gantt-chart/GanttChart.types';
import type {
    ChartColors,
    EngineRendererProps,
} from '@/engines/engine.types';

const ECHARTS_GANTT_EFFECTS:
    readonly GanttChartEffect[] = [
        'none',
        'bounce',
        'wobble',
        'elastic',
        'progressive-trace',
        'elastic-glide',
        'staggered-reveal',
    ];

const resolveEffect = (
    effect:
        EngineRendererProps['effect'],
): GanttChartEffect =>
    ECHARTS_GANTT_EFFECTS.includes(
        effect as GanttChartEffect,
    )
        ? (effect as GanttChartEffect)
        : 'none';

const resolveData = (
    data:
        EngineRendererProps['data'],
): GanttChartTask[] =>
    data.series.flatMap(
        (seriesItem) =>
            toGanttSeriesData(
                seriesItem.data,
            ).map((task) =>
                compactObject({
                    label: task.label,
                    start: task.start,
                    end: task.end,
                    color:
                        task.color ??
                        seriesItem.color,
                }),
            ),
    );

const resolveColors = (
    colors: ChartColors | undefined,
): GanttChartColors | undefined => {
    if (!colors) {
        return undefined;
    }

    return compactObject({
        series: colors.series
            ? Array.from(
                colors.series,
            )
            : undefined,

        axisText:
            colors.axisText,

        axisLine:
            colors.axisLine,

        grid:
            colors.grid,

        tooltipBackground:
            colors.tooltipBackground,

        tooltipText:
            colors.tooltipText,

        tooltipBorder:
            colors.tooltipBorder,
    });
};

const resolveOptions = (
    options:
        EngineRendererProps['options'],
): GanttChartOptions | undefined =>
    options as
    | GanttChartOptions
    | undefined;

export const adaptEChartsGanttProps = ({
    data,
    colors,
    options,
    effect,
    showDownload,
    downloadPlacement,
    customStyles,
    className,
    testId,
}: EngineRendererProps): GanttChartProps =>
    compactObject({
        data: resolveData(data),

        colors:
            resolveColors(colors),

        options:
            resolveOptions(options),

        effect:
            resolveEffect(effect),

        showDownload,

        downloadPlacement,

        rendererCustomStyles:
            customStyles,

        className,

        testId,
    });