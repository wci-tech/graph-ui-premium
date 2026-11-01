import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createTreemapChartDefinition,
    mergeTreemapChartOptions,
    resolveTreemapChartColors,
    type TreemapChartDefinition,
} from '../base/BaseTreemapChart.utils';
import type {
    TreemapChartHookProps,
    TreemapChartHookReturn,
    TreemapChartResolvedColors,
    TreemapChartWrapperProps,
} from '../TreemapChart.types';

export const useTreemapChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-treemap-chart-test-id',
}: TreemapChartHookProps): TreemapChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<TreemapChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;
        setResolvedColors(resolveTreemapChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<TreemapChartDefinition | undefined>(() => {
        if (!rootElement || !resolvedColors) return undefined;
        return createTreemapChartDefinition(
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
        return mergeTreemapChartOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<TreemapChartWrapperProps>(
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