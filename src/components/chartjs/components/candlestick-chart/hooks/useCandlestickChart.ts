import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createCandlestickChartData,
    createCandlestickChartOptions,
    resolveCandlestickChartColors,
} from '../base/BaseCandlestickChart.utils';
import type {
    CandlestickChartHookProps,
    CandlestickChartHookReturn,
    CandlestickChartResolvedColors,
} from '../CandlestickChart.types';

export const useCandlestickChart = ({
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'candlestick-chart-test-id',
}: CandlestickChartHookProps): CandlestickChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);

    const [resolvedColors, setResolvedColors] =
        useState<CandlestickChartResolvedColors>();

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
            resolveCandlestickChartColors(
                rootElement,
                colors,
            ),
        );
    }, [colors, rootElement]);

    const processedData =
        useMemo<CandlestickChartHookReturn['processedData']>(
            () => {
                if (!resolvedColors) {
                    return {
                        datasets: [],
                    };
                }

                return createCandlestickChartData({
                    data,
                    colors: resolvedColors,
                });
            },
            [data, resolvedColors],
        );

    const candlestickOptions =
        useMemo<CandlestickChartHookReturn['candlestickOptions']>(
            () => {
                if (!resolvedColors) {
                    return undefined;
                }

                return createCandlestickChartOptions(
                    compactObject({
                        data,
                        options,
                        colors: resolvedColors,
                    }),
                );
            },
            [data, options, resolvedColors],
        );

    const wrapperProps =
        useMemo<CandlestickChartHookReturn['wrapperProps']>(
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
        candlestickOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        candlestickOptions,
        wrapperProps,
        isReady,
    };
};