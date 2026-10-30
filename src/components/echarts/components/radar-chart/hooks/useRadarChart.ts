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
    createRadarChartDefinition,
    mergeRadarChartOptions,
    type RadarChartDefinition,
    resolveRadarChartColors,
} from '../base/BaseRadarChart.utils';
import type {
    RadarChartHookProps,
    RadarChartHookReturn,
    RadarChartResolvedColors,
    RadarChartWrapperProps,
} from '../RadarChart.types';

export const useRadarChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-radar-chart-test-id',
}: RadarChartHookProps): RadarChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [
        rootElement,
        setRootElement,
    ] = useState<HTMLDivElement | null>(
        null,
    );

    const [
        resolvedColors,
        setResolvedColors,
    ] = useState<
        RadarChartResolvedColors
    >();

    useLayoutEffect(() => {
        setRootElement(
            wrapperRef.current,
        );
    }, [
        customStyles?.wrapper,
        rendererCustomStyles?.container,
    ]);

    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(
            resolveRadarChartColors(
                rootElement,
                colors,
            ),
        );
    }, [
        rootElement,
        colors,
    ]);

    const definition =
        useMemo<
            RadarChartDefinition | undefined
        >(() => {
            if (
                !rootElement ||
                !resolvedColors
            ) {
                return undefined;
            }

            return createRadarChartDefinition(
                compactObject({
                    element: rootElement,
                    data,
                    colors: resolvedColors,
                    options,
                }),
            );
        }, [
            data,
            options,
            resolvedColors,
            rootElement,
        ]);

    const chartOptions =
        useMemo<
            EChartsOption | undefined
        >(() => {
            if (!definition) {
                return undefined;
            }

            const generatedOptions =
                createEChartsOptions(
                    definition,
                );

            const animatedOptions =
                applyEChartsSeriesAnimation(
                    generatedOptions,
                    options,
                );

            return mergeRadarChartOptions(
                animatedOptions,
                options,
            );
        }, [
            definition,
            options,
        ]);

    const wrapperProps =
        useMemo<RadarChartWrapperProps>(
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