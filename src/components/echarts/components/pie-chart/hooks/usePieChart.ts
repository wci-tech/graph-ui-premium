import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createPieChartDefinition,
    mergePieChartOptions,
    type PieChartDefinition,
    resolvePieChartColors,
} from '../base/BasePieChart.utils';
import type {
    CrosshairPosition,
    PieChartHookProps,
    PieChartHookReturn,
    PieChartResolvedColors,
    PieChartWrapperProps,
} from '../PieChart.types';

const INITIAL_CROSSHAIR_POSITION: CrosshairPosition = {
    x: 0,
    y: 0,
    visible: false,
};

export const usePieChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-pie-chart-test-id',
}: PieChartHookProps): PieChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<PieChartResolvedColors>();
    const [crosshairPosition, setCrosshairPosition] = useState<CrosshairPosition>(
        INITIAL_CROSSHAIR_POSITION,
    );

    const crosshairEnabled = options?.crosshair === true;

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolvePieChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<PieChartDefinition | undefined>(() => {
        if (!resolvedColors) return undefined;

        return createPieChartDefinition({
            data,
            colors: resolvedColors,
        });
    }, [data, resolvedColors]);

    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) return undefined;

        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);

        return mergePieChartOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<PieChartWrapperProps>(
        () =>
            compactObject({
                className,
                'data-testid': testId,
                'data-effect': effect,
                'data-crosshair-enabled': crosshairEnabled,
            }),
        [className, crosshairEnabled, effect, testId],
    );

    const handlePointerMove = useCallback<React.PointerEventHandler<HTMLDivElement>>(
        (event) => {
            if (!crosshairEnabled) return;

            const bounds = event.currentTarget.getBoundingClientRect();

            setCrosshairPosition({
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
                visible: true,
            });
        },
        [crosshairEnabled],
    );

    const handlePointerLeave = useCallback(() => {
        if (!crosshairEnabled) return;

        setCrosshairPosition((current) => ({
            ...current,
            visible: false,
        }));
    }, [crosshairEnabled]);

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
        crosshairPosition,
        crosshairEnabled,
        handlePointerMove,
        handlePointerLeave,
        isReady,
    };
};