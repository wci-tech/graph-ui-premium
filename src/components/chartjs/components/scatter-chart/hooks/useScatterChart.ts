import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import { SCATTER_CHART_CONFIG } from '../base/BaseScatterChart.constants';
import {
    createScatterChartData,
    createScatterChartOptions,
    resolveScatterChartColors,
    scatterCrosshairPlugin,
} from '../base/BaseScatterChart.utils';
import type {
    ScatterChartHookProps,
    ScatterChartHookReturn,
    ScatterChartResolvedColors,
} from '../ScatterChart.types';

export const useScatterChart = ({
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'scatter-chart-test-id',
}: ScatterChartHookProps): ScatterChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);

    const [resolvedColors, setResolvedColors] =
        useState<ScatterChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [
        customStyles?.wrapper,
        rendererCustomStyles?.container,
    ]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(
            resolveScatterChartColors(rootElement, colors),
        );
    }, [rootElement, colors]);

    const processedData =
        useMemo<ScatterChartHookReturn['processedData']>(() => {
            if (!resolvedColors || !rootElement) {
                return {
                    datasets: [],
                };
            }

            return createScatterChartData(
                compactObject({
                    data,
                    colors: resolvedColors,
                    rootElement,
                    options,
                }),
            );
        }, [
            data,
            options,
            resolvedColors,
            rootElement,
        ]);

    const scatterOptions =
        useMemo<ScatterChartHookReturn['scatterOptions']>(() => {
            if (!resolvedColors) return undefined;

            return createScatterChartOptions(
                compactObject({
                    options,
                    colors: resolvedColors,
                }),
            );
        }, [options, resolvedColors]);

    const plugins =
        useMemo<ScatterChartHookReturn['plugins']>(
            () => [
                scatterCrosshairPlugin,
                createPointHaloPlugin({
                    enabled: true,
                    radiusOffset:
                        SCATTER_CHART_CONFIG.haloRadiusOffset,
                    opacity: SCATTER_CHART_CONFIG.haloOpacity,
                }),
            ],
            [],
        );

    const wrapperProps =
        useMemo<ScatterChartHookReturn['wrapperProps']>(
            () =>
                compactObject({
                    className,
                    'data-testid': testId,
                    'data-effect': effect,
                    'data-crosshair': options?.crosshair ?? false,
                }),
            [
                className,
                effect,
                options?.crosshair,
                testId,
            ],
        );

    const isReady =
        rootElement !== null &&
        resolvedColors !== undefined &&
        scatterOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        scatterOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};