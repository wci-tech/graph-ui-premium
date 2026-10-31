import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import { STACKED_AREA_CHART_CONFIG } from '../base/BaseStackedAreaChart.constants';
import {
    createStackedAreaChartData,
    createStackedAreaChartOptions,
    resolveStackedAreaChartColors,
} from '../base/BaseStackedAreaChart.utils';
import type {
    StackedAreaChartHookProps,
    StackedAreaChartHookReturn,
    StackedAreaChartResolvedColors,
} from '../StackedAreaChart.types';

export const useStackedAreaChart = ({
    data,
    labels,
    colors,
    options,
    appearance = 'smooth',
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'stacked-area-chart-test-id',
}: StackedAreaChartHookProps): StackedAreaChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<StackedAreaChartResolvedColors>();

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
            resolveStackedAreaChartColors(
                rootElement,
                colors,
            ),
        );
    }, [rootElement, colors]);

    const processedData =
        useMemo<StackedAreaChartHookReturn['processedData']>(
            () => {
                if (!resolvedColors || !rootElement) {
                    return {
                        labels: Array.from(labels),
                        datasets: [],
                    };
                }

                return createStackedAreaChartData(
                    compactObject({
                        labels,
                        data,
                        colors: resolvedColors,
                        rootElement,
                        appearance,
                        fillOpacity: options?.fillOpacity,
                    }),
                );
            },
            [
                appearance,
                data,
                labels,
                options?.fillOpacity,
                resolvedColors,
                rootElement,
            ],
        );

    const stackedAreaOptions =
        useMemo<StackedAreaChartHookReturn['stackedAreaOptions']>(
            () => {
                if (!resolvedColors) {
                    return undefined;
                }

                return createStackedAreaChartOptions(
                    compactObject({
                        options,
                        colors: resolvedColors,
                    }),
                );
            },
            [options, resolvedColors],
        );

    const plugins =
        useMemo<StackedAreaChartHookReturn['plugins']>(
            () => [
                createPointHaloPlugin({
                    enabled: true,
                    radiusOffset:
                        STACKED_AREA_CHART_CONFIG.haloRadiusOffset,
                    opacity:
                        STACKED_AREA_CHART_CONFIG.haloOpacity,
                }),
            ],
            [],
        );

    const wrapperProps =
        useMemo<StackedAreaChartHookReturn['wrapperProps']>(
            () =>
                compactObject({
                    className,
                    'data-testid': testId,
                    'data-appearance': appearance,
                    'data-effect': effect,
                }),
            [
                appearance,
                className,
                effect,
                testId,
            ],
        );

    const isReady =
        rootElement !== null &&
        resolvedColors !== undefined &&
        stackedAreaOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        stackedAreaOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};