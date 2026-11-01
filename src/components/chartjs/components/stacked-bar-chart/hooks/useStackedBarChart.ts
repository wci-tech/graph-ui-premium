import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createStackedBarChartData,
    createStackedBarChartOptions,
    resolveStackedBarChartColors,
} from '../base/BaseStackedBarChart.utils';
import type {
    StackedBarChartHookProps,
    StackedBarChartHookReturn,
    StackedBarChartResolvedColors,
} from '../StackedBarChart.types';

export const useStackedBarChart = ({
    labels,
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'stacked-bar-chart-test-id',
}: StackedBarChartHookProps): StackedBarChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<StackedBarChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;
        setResolvedColors(resolveStackedBarChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const processedData = useMemo<StackedBarChartHookReturn['processedData']>(() => {
        if (!rootElement || !resolvedColors) {
            return {
                labels: Array.from(labels),
                datasets: [],
            };
        }

        return createStackedBarChartData({
            labels,
            data,
            colors: resolvedColors,
            rootElement,
            horizontal: options?.horizontal ?? false,
            ...(options?.barWidth !== undefined ? { barWidth: options.barWidth } : {}),
            ...(options?.maxBarWidth !== undefined ? { maxBarWidth: options.maxBarWidth } : {}),
        });
    }, [
        data,
        labels,
        options?.barWidth,
        options?.horizontal,
        options?.maxBarWidth,
        resolvedColors,
        rootElement,
    ]);

    const stackedBarOptions = useMemo<StackedBarChartHookReturn['stackedBarOptions']>(() => {
        if (!resolvedColors) return undefined;

        return createStackedBarChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    const wrapperProps = useMemo<StackedBarChartHookReturn['wrapperProps']>(
        () =>
            compactObject({
                className,
                'data-testid': testId,
                'data-effect': effect,
            }),
        [className, effect, testId],
    );

    const isReady =
        rootElement !== null &&
        resolvedColors !== undefined &&
        stackedBarOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        stackedBarOptions,
        wrapperProps,
        isReady,
    };
};