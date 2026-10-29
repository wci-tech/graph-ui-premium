import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createHeatmapChartDefinition,
    type HeatmapChartDefinition,
    mergeHeatmapChartOptions,
    resolveHeatmapChartColors,
} from '../base/BaseHeatmapChart.utils';
import type {
    HeatmapChartHookProps,
    HeatmapChartHookReturn,
    HeatmapChartResolvedColors,
    HeatmapChartWrapperProps,
} from '../HeatmapChart.types';

export const useHeatmapChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-heatmap-chart-test-id',
}: HeatmapChartHookProps): HeatmapChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<HeatmapChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveHeatmapChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<HeatmapChartDefinition | undefined>(() => {
        if (!rootElement || !resolvedColors) return undefined;

        return createHeatmapChartDefinition(
            compactObject({
                element: rootElement,
                data,
                colors: resolvedColors,
                options,
            }),
        );
    }, [data, options, resolvedColors, rootElement]);

    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) return undefined;

        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);

        return mergeHeatmapChartOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<HeatmapChartWrapperProps>(
        () =>
            compactObject({
                className,
                'data-testid': testId,
                'data-effect': effect,
                'data-crosshair': options?.crosshair ?? false,
            }),
        [className, effect, options?.crosshair, testId],
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