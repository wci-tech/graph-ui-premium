import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    createHeatmapChartData,
    createHeatmapChartOptions,
    resolveHeatmapChartColors,
} from '../base/BaseHeatmapChart.utils';
import type {
    HeatmapChartHookProps,
    HeatmapChartHookReturn,
    HeatmapChartResolvedColors,
} from '../HeatmapChart.types';

export const useHeatmapChart = ({
    data,
    xLabels,
    yLabels,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'heatmap-chart-test-id',
}: HeatmapChartHookProps): HeatmapChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);

    const [
        resolvedColors,
        setResolvedColors,
    ] = useState<HeatmapChartResolvedColors>();

    /**
     * Capture the wrapper after mount so Canvas colors
     * can be resolved from computed CSS custom properties.
     */
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [
        customStyles?.wrapper,
        rendererCustomStyles?.container,
    ]);

    /**
     * Resolve shared chart tokens and consumer overrides
     * before passing colors to the Canvas API.
     */
    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(
            resolveHeatmapChartColors(
                rootElement,
                colors,
            ),
        );
    }, [rootElement, colors]);

    /**
     * Build the Chart.js matrix dataset after all colors
     * have been resolved.
     */
    const processedData =
        useMemo<
            HeatmapChartHookReturn['processedData']
        >(() => {
            if (!resolvedColors) {
                return {
                    datasets: [],
                };
            }

            return createHeatmapChartData(
                compactObject({
                    data,
                    xLabels,
                    yLabels,
                    colors: resolvedColors,
                    options,
                }),
            );
        }, [
            data,
            xLabels,
            yLabels,
            resolvedColors,
            options,
        ]);

    /**
     * Build Chart.js options using resolved semantic colors.
     */
    const heatmapOptions =
        useMemo<
            HeatmapChartHookReturn['heatmapOptions']
        >(() => {
            if (!resolvedColors) {
                return undefined;
            }

            return createHeatmapChartOptions(
                compactObject({
                    options,
                    xLabels,
                    yLabels,
                    colors: resolvedColors,
                }),
            );
        }, [
            options,
            xLabels,
            yLabels,
            resolvedColors,
        ]);

    /**
     * Heatmap-specific Chart.js plugins.
     */
    const plugins =
        useMemo<
            HeatmapChartHookReturn['plugins']
        >(() => [ChartDataLabels], []);

    /**
     * Wrapper attributes used by tests, styling and effects.
     */
    const wrapperProps =
        useMemo<
            HeatmapChartHookReturn['wrapperProps']
        >(
            () =>
                compactObject({
                    className,
                    'data-testid': testId,
                    'data-effect': effect,
                    'data-crosshair':
                        options?.crosshair ?? false,
                }),
            [
                className,
                testId,
                effect,
                options?.crosshair,
            ],
        );

    const isReady =
        rootElement !== null &&
        resolvedColors !== undefined &&
        heatmapOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        heatmapOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};