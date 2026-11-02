import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createWaterfallChartDefinition,
    mergeWaterfallChartOptions,
    resolveWaterfallChartColors,
    type WaterfallChartDefinition,
} from '../base/BaseWaterfallChart.utils';
import type {
    WaterfallChartHookProps,
    WaterfallChartHookReturn,
    WaterfallChartResolvedColors,
    WaterfallChartWrapperProps,
} from '../WaterfallChart.types';

export const useWaterfallChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-waterfall-chart-test-id',
}: WaterfallChartHookProps): WaterfallChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<WaterfallChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveWaterfallChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<WaterfallChartDefinition | undefined>(() => {
        if (!resolvedColors) return undefined;

        return createWaterfallChartDefinition({
            data,
            colors: resolvedColors,
            ...(options ? { options } : {}),
        });
    }, [data, options, resolvedColors]);

    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) return undefined;

        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);

        return mergeWaterfallChartOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<WaterfallChartWrapperProps>(
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