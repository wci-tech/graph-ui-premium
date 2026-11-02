import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createWaterfallChartData,
    createWaterfallChartOptions,
    resolveWaterfallChartColors,
} from '../base/BaseWaterfallChart.utils';
import type {
    WaterfallChartHookProps,
    WaterfallChartHookReturn,
    WaterfallChartResolvedColors,
} from '../WaterfallChart.types';

export const useWaterfallChart = ({
    labels,
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'waterfall-chart-test-id',
}: WaterfallChartHookProps): WaterfallChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<WaterfallChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveWaterfallChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const processedData = useMemo<WaterfallChartHookReturn['processedData']>(() => {
        if (!resolvedColors) {
            return {
                labels: Array.from(labels),
                datasets: [],
            };
        }

        return createWaterfallChartData(
            compactObject({
                labels,
                data,
                colors: resolvedColors,
                options,
            }),
        );
    }, [data, labels, options, resolvedColors]);

    const waterfallOptions = useMemo<WaterfallChartHookReturn['waterfallOptions']>(() => {
        if (!resolvedColors) return undefined;

        return createWaterfallChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
                dataLength: data.length,
            }),
        );
    }, [data.length, options, resolvedColors]);

    const wrapperProps = useMemo<WaterfallChartHookReturn['wrapperProps']>(
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
        waterfallOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        waterfallOptions,
        wrapperProps,
        isReady,
    };
};