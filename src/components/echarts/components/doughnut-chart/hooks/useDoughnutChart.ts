import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createDoughnutChartDefinition,
    type DoughnutChartDefinition,
    mergeDoughnutChartOptions,
    resolveDoughnutChartColors,
} from '../base/BaseDoughnutChart.utils';
import type {
    DoughnutChartHookProps,
    DoughnutChartHookReturn,
    DoughnutChartResolvedColors,
    DoughnutChartWrapperProps,
} from '../DoughnutChart.types';

export const useDoughnutChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-doughnut-chart-test-id',
}: DoughnutChartHookProps): DoughnutChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<DoughnutChartResolvedColors>();
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);
    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }
        setResolvedColors(resolveDoughnutChartColors(rootElement, colors));
    }, [rootElement, colors]);
    const definition = useMemo<DoughnutChartDefinition | undefined>(() => {
        if (!rootElement || !resolvedColors) {
            return undefined;
        }
        return createDoughnutChartDefinition(
            compactObject({
                element: rootElement,
                data,
                colors: resolvedColors,
                options,
            }),
        );
    }, [data, options, resolvedColors, rootElement]);
    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) {
            return undefined;
        }
        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);
        return mergeDoughnutChartOptions(animatedOptions, options);
    }, [definition, options]);
    const wrapperProps = useMemo<DoughnutChartWrapperProps>(
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