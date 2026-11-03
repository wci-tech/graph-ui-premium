import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { CrosshairPlugin } from '@/components/chartjs/plugin/CrosshairPlugin';

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

    /**
     * Capture the chart wrapper after mount so Canvas colors
     * can be resolved from computed CSS custom properties.
     */
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    /**
     * Resolve CSS variables and consumer overrides
     * before passing color values to the Canvas API.
     */
    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(resolveBubbleChartColors(rootElement, colors));
    }, [rootElement, colors]);

    /**
     * Build the Chart.js BubbleChart data after all colors
     * have been resolved.
     */
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

    /**
     * Build the Chart.js options using resolved semantic colors.
     */
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

    /**
     * BubbleChart-specific Chart.js plugins.
     */
    const plugins = useMemo<BubbleChartHookReturn['plugins']>(() => [CrosshairPlugin], []);

    /**
     * Wrapper attributes used by tests,
     * styling and effects.
     */
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
        plugins,
        wrapperProps,
        isReady,
    };
};