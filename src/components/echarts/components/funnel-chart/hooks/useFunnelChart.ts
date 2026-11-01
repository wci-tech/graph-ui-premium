import type { PointerEvent } from 'react';
import {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createFunnelChartDefinition,
    mergeFunnelChartOptions,
    resolveFunnelChartColors,
} from '../base/BaseFunnelChart.utils';
import type {
    FunnelChartCrosshairPosition,
    FunnelChartHookProps,
    FunnelChartHookReturn,
    FunnelChartResolvedColors,
} from '../FunnelChart.types';

const DEFAULT_CROSSHAIR: FunnelChartCrosshairPosition = {
    x: 0,
    y: 0,
    visible: false,
};

export const useFunnelChart = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-funnel-chart-test-id',
}: FunnelChartHookProps): FunnelChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

    const [resolvedColors, setResolvedColors] = useState<FunnelChartResolvedColors>();

    const [crosshair, setCrosshair] =
        useState<FunnelChartCrosshairPosition>(DEFAULT_CROSSHAIR);

    /**
     * Capture the chart wrapper after mount so ECharts colors
     * can be resolved from computed CSS custom properties.
     */
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    /**
     * Resolve graph CSS variables and consumer overrides
     * before building the ECharts definition.
     */
    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(resolveFunnelChartColors(rootElement, colors));
    }, [rootElement, colors]);

    /**
     * Build the normalized FunnelChart definition after all
     * semantic colors have been resolved.
     */
    const definition = useMemo<FunnelChartHookReturn['definition']>(() => {
        if (!rootElement || !resolvedColors) {
            return undefined;
        }

        return createFunnelChartDefinition(
            compactObject({
                element: rootElement,
                data,
                colors: resolvedColors,
                options,
            }),
        );
    }, [rootElement, data, resolvedColors, options]);

    /**
     * Build the final ECharts options and apply the
     * configured series animation.
     */
    const chartOptions = useMemo<FunnelChartHookReturn['chartOptions']>(() => {
        if (!definition) {
            return undefined;
        }

        const generatedOptions = createEChartsOptions(definition);

        const mergedOptions = mergeFunnelChartOptions(
            generatedOptions,
            options,
        );

        return applyEChartsSeriesAnimation(
            mergedOptions,
            options,
        );
    }, [definition, options]);

    const crosshairEnabled = options?.crosshair === true;

    /**
     * Track the pointer position for the optional
     * FunnelChart crosshair overlay.
     */
    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (!crosshairEnabled) {
                return;
            }

            const bounds = event.currentTarget.getBoundingClientRect();

            setCrosshair({
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
                visible: true,
            });
        },
        [crosshairEnabled],
    );

    /**
     * Hide the crosshair when the pointer leaves
     * the chart wrapper.
     */
    const handlePointerLeave = useCallback(() => {
        setCrosshair((current) => ({
            ...current,
            visible: false,
        }));
    }, []);

    /**
     * Wrapper attributes used by tests, styling,
     * effects and crosshair selectors.
     */
    const wrapperProps = useMemo<FunnelChartHookReturn['wrapperProps']>(
        () =>
            compactObject({
                className,
                'data-testid': testId,
                'data-effect': effect,
                'data-crosshair': crosshairEnabled,
            }),
        [className, effect, crosshairEnabled, testId],
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
        crosshair,
        crosshairEnabled,
        handlePointerMove,
        handlePointerLeave,
        isReady,
    };
};