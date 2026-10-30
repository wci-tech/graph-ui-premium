import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import { SCATTER_LINE_CHART_CONFIG } from '../base/BaseScatterLineChart.constants';
import {
    createScatterLineChartData,
    createScatterLineChartOptions,
    resolveScatterLineChartColors,
} from '../base/BaseScatterLineChart.utils';
import type {
    ScatterLineChartHookProps,
    ScatterLineChartHookReturn,
    ScatterLineChartResolvedColors,
} from '../ScatterLineChart.types';

export const useScatterLineChart = ({
    data,
    colors,
    options,
    appearance = 'smooth',
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'scatter-line-chart-test-id',
}: ScatterLineChartHookProps): ScatterLineChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<ScatterLineChartResolvedColors>();

    /**
     * Capture the wrapper after mount so Canvas colors
     * can be resolved from computed CSS custom properties.
     */
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    /**
     * Resolve shared chart tokens and consumer color overrides
     * before passing color values to the Canvas API.
     */
    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveScatterLineChartColors(rootElement, colors));
    }, [rootElement, colors]);

    /**
     * Build the Chart.js Scatter Line data after all colors
     * have been resolved.
     */
    const processedData = useMemo<ScatterLineChartHookReturn['processedData']>(() => {
        if (!resolvedColors || !rootElement) {
            return {
                datasets: [],
            };
        }

        return createScatterLineChartData(
            compactObject({
                data,
                colors: resolvedColors,
                rootElement,
                appearance,
                options,
            }),
        );
    }, [appearance, data, options, resolvedColors, rootElement]);

    /**
     * Build Chart.js options using resolved semantic colors.
     */
    const scatterLineOptions =
        useMemo<ScatterLineChartHookReturn['scatterLineOptions']>(() => {
            if (!resolvedColors) return undefined;

            return createScatterLineChartOptions(
                compactObject({
                    options,
                    colors: resolvedColors,
                }),
            );
        }, [options, resolvedColors]);

    /**
     * Scatter Line-specific Chart.js plugins.
     */
    const plugins = useMemo<ScatterLineChartHookReturn['plugins']>(
        () => [
            createPointHaloPlugin({
                enabled: true,
                radiusOffset: SCATTER_LINE_CHART_CONFIG.haloRadiusOffset,
                opacity: SCATTER_LINE_CHART_CONFIG.haloOpacity,
            }),
        ],
        [],
    );

    /**
     * Wrapper attributes used by tests, styling,
     * effects and appearance selectors.
     */
    const wrapperProps = useMemo<ScatterLineChartHookReturn['wrapperProps']>(
        () =>
            compactObject({
                className,
                'data-testid': testId,
                'data-appearance': appearance,
                'data-effect': effect,
                'data-crosshair': options?.crosshair ?? false,
            }),
        [appearance, className, effect, options?.crosshair, testId],
    );

    const isReady =
        rootElement !== null &&
        resolvedColors !== undefined &&
        scatterLineOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        scatterLineOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};