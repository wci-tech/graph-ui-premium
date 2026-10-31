import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import type { StackedAreaChartDefinition } from '@/components/echarts/components/stacked-area-chart/base/BaseStackedAreaChart.utils';
import {
    createStackedAreaChartDefinition,
    mergeStackedAreaChartOptions,
    resolveStackedAreaChartColors,
} from '@/components/echarts/components/stacked-area-chart/base/BaseStackedAreaChart.utils';
import type {
    StackedAreaChartHookProps,
    StackedAreaChartResolvedColors,
    StackedAreaChartWrapperProps,
} from '@/components/echarts/components/stacked-area-chart/StackedAreaChart.types';
import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

export const useStackedAreaChart = ({
    data,
    colors,
    options,
    appearance = 'smooth',
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-stacked-area-chart-test-id',
}: StackedAreaChartHookProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<StackedAreaChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(resolveStackedAreaChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<StackedAreaChartDefinition | undefined>(() => {
        if (!rootElement || !resolvedColors) {
            return undefined;
        }

        return createStackedAreaChartDefinition({
            element: rootElement,
            data,
            colors: resolvedColors,
            appearance,
        });
    }, [appearance, data, resolvedColors, rootElement]);

    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) {
            return undefined;
        }

        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);

        return mergeStackedAreaChartOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<StackedAreaChartWrapperProps>(
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