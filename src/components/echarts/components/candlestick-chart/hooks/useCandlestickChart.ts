import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    type CandlestickChartDefinition,
    createCandlestickChartDefinition,
    mergeCandlestickChartOptions,
    resolveCandlestickChartColors,
} from '../base/BaseCandlestickChart.utils';
import type {
    CandlestickChartHookProps,
    CandlestickChartHookReturn,
    CandlestickChartResolvedColors,
    CandlestickChartWrapperProps,
} from '../CandlestickChart.types';

export const useCandlestickChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-candlestick-chart-test-id',
}: CandlestickChartHookProps): CandlestickChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<CandlestickChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

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
    }, [rootElement, colors]);

    const definition =
        useMemo<CandlestickChartDefinition | undefined>(
            () => {
                if (!resolvedColors) {
                    return undefined;
                }

                return createCandlestickChartDefinition({
                    data,
                    colors: resolvedColors,
                });
            },
            [data, resolvedColors],
        );

    const chartOptions =
        useMemo<EChartsOption | undefined>(() => {
            if (!definition) {
                return undefined;
            }

            const generatedOptions =
                createEChartsOptions(definition);

            const animatedOptions =
                applyEChartsSeriesAnimation(
                    generatedOptions,
                    options,
                );

            return mergeCandlestickChartOptions(
                animatedOptions,
                options,
            );
        }, [definition, options]);

    const wrapperProps =
        useMemo<CandlestickChartWrapperProps>(
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
        definition !== undefined &&
        chartOptions !== undefined;

    return {
        wrapperRef,
        definition,
        chartOptions,
        wrapperProps,
        isReady,
    };
};