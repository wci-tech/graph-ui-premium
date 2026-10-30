import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createScatterLineChartDefinition,
    mergeScatterLineChartOptions,
    resolveScatterLineChartColors,
    type ScatterLineChartDefinition,
} from '../base/BaseScatterLineChart.utils';
import type {
    ScatterLineChartHookProps,
    ScatterLineChartHookReturn,
    ScatterLineChartResolvedColors,
    ScatterLineChartWrapperProps,
} from '../ScatterLineChart.types';

export const useScatterLineChart = ({
    data,
    colors,
    options,
    appearance = 'smooth',
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-scatter-line-chart-test-id',
}: ScatterLineChartHookProps): ScatterLineChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<ScatterLineChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveScatterLineChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<ScatterLineChartDefinition | undefined>(() => {
        if (!rootElement || !resolvedColors) return undefined;

        return createScatterLineChartDefinition({
            element: rootElement,
            data,
            colors: resolvedColors,
            appearance,
        });
    }, [appearance, data, resolvedColors, rootElement]);

    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) return undefined;

        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(
            generatedOptions,
            options,
        );

        return mergeScatterLineChartOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<ScatterLineChartWrapperProps>(
        () =>
            compactObject({
                className,
                'data-testid': testId,
                'data-appearance': appearance,
                'data-effect': effect,
            }),
        [appearance, className, effect, testId],
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