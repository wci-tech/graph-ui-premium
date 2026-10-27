import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createGanttChartDefinition,
    type GanttChartDefinition,
    mergeGanttChartOptions,
    resolveGanttChartColors,
} from '../base/BaseGanttChart.utils';
import type {
    GanttChartHookProps,
    GanttChartHookReturn,
    GanttChartResolvedColors,
    GanttChartWrapperProps,
} from '../GanttChart.types';

export const useGanttChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-gantt-chart-test-id',
}: GanttChartHookProps): GanttChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [
        rootElement,
        setRootElement,
    ] = useState<HTMLDivElement | null>(
        null,
    );

    const [
        resolvedColors,
        setResolvedColors,
    ] =
        useState<GanttChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [
        customStyles?.wrapper,
        rendererCustomStyles?.container,
    ]);

    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(
            resolveGanttChartColors(
                rootElement,
                colors,
            ),
        );
    }, [
        rootElement,
        colors,
    ]);

    const definition =
        useMemo<
            GanttChartDefinition | undefined
        >(() => {
            if (
                !rootElement ||
                !resolvedColors
            ) {
                return undefined;
            }

            return createGanttChartDefinition(
                compactObject({
                    element: rootElement,
                    data,
                    colors: resolvedColors,
                    options,
                }),
            );
        }, [
            data,
            options,
            resolvedColors,
            rootElement,
        ]);

    const chartOptions =
        useMemo<
            EChartsOption | undefined
        >(() => {
            if (!definition) {
                return undefined;
            }

            const generatedOptions =
                createEChartsOptions(
                    definition,
                );

            const animatedOptions =
                applyEChartsSeriesAnimation(
                    generatedOptions,
                    options,
                );

            return mergeGanttChartOptions(
                animatedOptions,
                options,
            );
        }, [
            definition,
            options,
        ]);

    const wrapperProps =
        useMemo<GanttChartWrapperProps>(
            () =>
                compactObject({
                    className,
                    'data-testid': testId,
                    'data-effect': effect,
                }),
            [
                className,
                effect,
                testId,
            ],
        );

    const isReady =
        rootElement !== null &&
        resolvedColors !== undefined &&
        definition !== undefined &&
        chartOptions !== undefined;

    return {
        wrapperRef,
        definition,
        chartOptions,
        wrapperProps,
        isReady,
    };
};