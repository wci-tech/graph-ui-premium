import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createScatterChartDefinition,
    mergeScatterChartOptions,
    resolveScatterChartColors,
    type ScatterChartDefinition,
} from '../base/BaseScatterChart.utils';
import type {
    ScatterChartHookProps,
    ScatterChartHookReturn,
    ScatterChartResolvedColors,
    ScatterChartWrapperProps,
} from '../ScatterChart.types';

export const useScatterChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-scatter-chart-test-id',
}: ScatterChartHookProps): ScatterChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<ScatterChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveScatterChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<ScatterChartDefinition | undefined>(() => {
        if (!rootElement || !resolvedColors) return undefined;

        return createScatterChartDefinition({
            element: rootElement,
            data,
            colors: resolvedColors,
        });
    }, [data, resolvedColors, rootElement]);

    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) return undefined;

        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);

        return mergeScatterChartOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<ScatterChartWrapperProps>(
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