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
    type BubbleChartDefinition,
    createBubbleChartDefinition,
    mergeBubbleChartOptions,
    resolveBubbleChartColors,
} from '../base/BaseBubbleChart.utils';
import type {
    BubbleChartHookProps,
    BubbleChartHookReturn,
    BubbleChartResolvedColors,
    BubbleChartWrapperProps,
} from '../BubbleChart.types';

export const useBubbleChart = ({
    data,
    series,
    colors,
    options,
    effect = 'none',
    sizeMultiplier,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-bubble-chart-test-id',
}: BubbleChartHookProps): BubbleChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<BubbleChartResolvedColors>();

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
            resolveBubbleChartColors(
                rootElement,
                colors,
            ),
        );
    }, [rootElement, colors]);

    const definition =
        useMemo<
            BubbleChartDefinition | undefined
        >(() => {
            if (!rootElement || !resolvedColors) {
                return undefined;
            }

            return createBubbleChartDefinition(
                compactObject({
                    element: rootElement,
                    data,
                    series,
                    colors: resolvedColors,
                    sizeMultiplier,
                }),
            );
        }, [
            data,
            resolvedColors,
            rootElement,
            series,
            sizeMultiplier,
        ]);

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

            return mergeBubbleChartOptions(
                animatedOptions,
                options,
            );
        }, [definition, options]);

    const wrapperProps =
        useMemo<BubbleChartWrapperProps>(
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
                effect,
                options?.crosshair,
                testId,
            ],
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