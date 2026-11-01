import type { PointerEvent } from 'react';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createNetworkGraphDefinition,
    mergeNetworkGraphOptions,
    type NetworkGraphDefinition,
    resolveNetworkGraphColors,
} from '../base/BaseNetworkGraph.utils';
import type {
    NetworkGraphCrosshair,
    NetworkGraphHookProps,
    NetworkGraphHookReturn,
    NetworkGraphResolvedColors,
    NetworkGraphWrapperProps,
} from '../NetworkGraph.types';

const INITIAL_CROSSHAIR: NetworkGraphCrosshair = {
    x: 0,
    y: 0,
    visible: false,
};

export const useNetworkGraph = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-network-graph-test-id',
}: NetworkGraphHookProps): NetworkGraphHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<NetworkGraphResolvedColors>();
    const [crosshair, setCrosshair] = useState<NetworkGraphCrosshair>(INITIAL_CROSSHAIR);
    const crosshairEnabled = options?.crosshair === true;

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;
        setResolvedColors(resolveNetworkGraphColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<NetworkGraphDefinition | undefined>(() => {
        if (!rootElement || !resolvedColors) return undefined;
        return createNetworkGraphDefinition(
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
        return mergeNetworkGraphOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<NetworkGraphWrapperProps>(
        () =>
            compactObject({
                className,
                'data-testid': testId,
                'data-effect': effect,
                'data-crosshair': crosshairEnabled,
            }),
        [className, crosshairEnabled, effect, testId],
    );

    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (!crosshairEnabled) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            setCrosshair({
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
                visible: true,
            });
        },
        [crosshairEnabled],
    );

    const handlePointerLeave = useCallback(() => {
        setCrosshair((current) =>
            current.visible
                ? {
                    ...current,
                    visible: false,
                }
                : current,
        );
    }, []);

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
        handlePointerMove,
        handlePointerLeave,
        isReady,
    };
};