import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createBubbleChartData,
    createBubbleChartOptions,
    resolveBubbleChartColors,
} from '../base/BaseBubbleChart.utils';
import type {
    BubbleChartHookProps,
    BubbleChartHookReturn,
    BubbleChartResolvedColors,
} from '../BubbleChart.types';

export const useBubbleChart = ({
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'bubble-chart-test-id',
}: BubbleChartHookProps): BubbleChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<BubbleChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(resolveBubbleChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const processedData = useMemo<BubbleChartHookReturn['processedData']>(() => {
        if (!rootElement || !resolvedColors) {
            return {
                datasets: [],
            };
        }

        return createBubbleChartData({
            data,
            colors: resolvedColors,
            rootElement,
        });
    }, [data, resolvedColors, rootElement]);

    const bubbleOptions = useMemo<BubbleChartHookReturn['bubbleOptions']>(() => {
        if (!resolvedColors) {
            return undefined;
        }

        return createBubbleChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    const wrapperProps = useMemo<BubbleChartHookReturn['wrapperProps']>(
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
        bubbleOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        bubbleOptions,
        wrapperProps,
        isReady,
    };
};