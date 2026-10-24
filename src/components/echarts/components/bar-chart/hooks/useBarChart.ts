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

import type {
    BarChartHookProps,
    BarChartHookReturn,
    BarChartResolvedColors,
    BarChartWrapperProps,
} from '../BarChart.types';
import { BAR_CHART_CONFIG } from '../base/BaseBarChart.constants';
import {
    type BarChartDefinition,
    createBarChartDefinition,
    mergeBarChartOptions,
    resolveBarChartColors,
} from '../base/BaseBarChart.utils';

export const useBarChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-bar-chart-test-id',
}: BarChartHookProps): BarChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);

    const [resolvedColors, setResolvedColors] =
        useState<BarChartResolvedColors>();

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
            resolveBarChartColors(
                rootElement,
                colors,
            ),
        );
    }, [rootElement, colors]);

    const horizontal =
        options?.horizontal ?? false;

    const barWidth =
        options?.barWidth ??
        BAR_CHART_CONFIG.barWidth;

    const definition =
        useMemo<BarChartDefinition | undefined>(
            () => {
                if (!rootElement || !resolvedColors) {
                    return undefined;
                }

                return createBarChartDefinition({
                    element: rootElement,
                    data,
                    colors: resolvedColors,
                    horizontal,
                    barWidth,
                });
            },
            [
                barWidth,
                data,
                horizontal,
                resolvedColors,
                rootElement,
            ],
        );

    const chartOptions =
        useMemo<EChartsOption | undefined>(
            () => {
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

                return mergeBarChartOptions(
                    animatedOptions,
                    options,
                );
            },
            [definition, options],
        );

    const wrapperProps =
        useMemo<BarChartWrapperProps>(
            () =>
                compactObject({
                    className,

                    'data-testid': testId,

                    'data-effect': effect,

                    'data-orientation': horizontal
                        ? 'horizontal'
                        : 'vertical',
                }),
            [
                className,
                effect,
                horizontal,
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