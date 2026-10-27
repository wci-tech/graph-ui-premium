import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createGanttChartData,
    createGanttChartOptions,
    resolveGanttChartColors,
} from '../base/BaseGanttChart.utils';
import type {
    GanttChartHookProps,
    GanttChartHookReturn,
    GanttChartResolvedColors,
} from '../GanttChart.types';

export const useGanttChart = ({
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'gantt-chart-test-id',
}: GanttChartHookProps): GanttChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [
        rootElement,
        setRootElement,
    ] = useState<HTMLDivElement | null>(null);

    const [
        resolvedColors,
        setResolvedColors,
    ] = useState<GanttChartResolvedColors>();

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
    }, [rootElement, colors]);

    const processedData =
        useMemo<
            GanttChartHookReturn['processedData']
        >(() => {
            if (
                !rootElement ||
                !resolvedColors
            ) {
                return {
                    labels: data.map(
                        (item) => item.label,
                    ),
                    datasets: [],
                };
            }

            return createGanttChartData({
                data,
                colors: resolvedColors,
                rootElement,
            });
        }, [
            data,
            resolvedColors,
            rootElement,
        ]);

    const ganttOptions =
        useMemo<
            GanttChartHookReturn['ganttOptions']
        >(() => {
            if (!resolvedColors) {
                return undefined;
            }

            return createGanttChartOptions(
                compactObject({
                    data,
                    options,
                    colors: resolvedColors,
                }),
            );
        }, [
            data,
            options,
            resolvedColors,
        ]);

    const wrapperProps =
        useMemo<
            GanttChartHookReturn['wrapperProps']
        >(
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
        ganttOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        ganttOptions,
        wrapperProps,
        isReady,
    };
};