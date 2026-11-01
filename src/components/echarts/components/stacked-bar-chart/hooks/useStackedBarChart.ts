import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createStackedBarChartDefinition,
    mergeStackedBarChartOptions,
    resolveStackedBarChartColors,
    type StackedBarChartDefinition,
} from '../base/BaseStackedBarChart.utils';
import type {
    StackedBarChartHookProps,
    StackedBarChartHookReturn,
    StackedBarChartResolvedColors,
    StackedBarChartWrapperProps,
} from '../StackedBarChart.types';

export const useStackedBarChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-stacked-bar-chart-test-id',
}: StackedBarChartHookProps): StackedBarChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<StackedBarChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(
            resolveStackedBarChartColors(
                rootElement,
                colors,
            ),
        );
    }, [rootElement, colors]);

    const definition = useMemo<
        StackedBarChartDefinition | undefined
    >(() => {
        if (!rootElement || !resolvedColors) {
            return undefined;
        }

        return createStackedBarChartDefinition({
            element: rootElement,
            data,
            colors: resolvedColors,
            ...(options !== undefined
                ? { options }
                : {}),
        });
    }, [
        data,
        options,
        resolvedColors,
        rootElement,
    ]);

    const chartOptions = useMemo<
        EChartsOption | undefined
    >(() => {
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

        return mergeStackedBarChartOptions(
            animatedOptions,
            options,
        );
    }, [
        definition,
        options,
    ]);

    const wrapperProps =
        useMemo<StackedBarChartWrapperProps>(
            () =>
                compactObject({
                    className,
                    'data-testid': testId,
                    'data-effect': effect,
                }),
            [
                className,
                effect,
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