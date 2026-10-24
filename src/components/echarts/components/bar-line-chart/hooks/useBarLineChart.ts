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
    BarLineChartHookProps,
    BarLineChartHookReturn,
    BarLineChartResolvedColors,
    BarLineChartWrapperProps,
} from '../BarLineChart.types';
import { BAR_LINE_CHART_CONFIG } from '../base/BaseBarLineChart.constants';
import {
    type BarLineChartDefinition,
    createBarLineChartDefinition,
    mergeBarLineChartOptions,
    resolveBarLineChartColors,
} from '../base/BaseBarLineChart.utils';

export const useBarLineChart = ({
    data,
    colors,
    options,
    appearance = 'smooth',
    effect = 'none',
    showTrendPoints = true,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-bar-line-chart-test-id',
}: BarLineChartHookProps): BarLineChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] =
        useState<HTMLDivElement | null>(null);

    const [resolvedColors, setResolvedColors] =
        useState<BarLineChartResolvedColors>();

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
            resolveBarLineChartColors(
                rootElement,
                colors,
            ),
        );
    }, [rootElement, colors]);

    const barWidth =
        options?.barWidth ??
        BAR_LINE_CHART_CONFIG.barWidth;

    const touchBarTop =
        options?.touchBarTop ?? true;

    const definition =
        useMemo<
            BarLineChartDefinition | undefined
        >(() => {
            if (!rootElement || !resolvedColors) {
                return undefined;
            }

            return createBarLineChartDefinition({
                element: rootElement,
                data,
                colors: resolvedColors,
                appearance,
                showTrendPoints,
                barWidth,
                touchBarTop,
            });
        }, [
            appearance,
            barWidth,
            data,
            resolvedColors,
            rootElement,
            showTrendPoints,
            touchBarTop,
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

            return mergeBarLineChartOptions(
                animatedOptions,
                options,
            );
        }, [definition, options]);

    const wrapperProps =
        useMemo<BarLineChartWrapperProps>(
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