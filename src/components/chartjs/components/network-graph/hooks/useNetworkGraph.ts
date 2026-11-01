import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    createNetworkGraphCrosshairPlugin,
    createNetworkGraphData,
    createNetworkGraphOptions,
    resolveNetworkGraphColors,
} from '../base/BaseNetworkGraph.utils';
import type {
    NetworkGraphHookProps,
    NetworkGraphHookReturn,
    NetworkGraphResolvedColors,
} from '../NetworkGraph.types';

export const useNetworkGraph = ({
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'network-graph-test-id',
}: NetworkGraphHookProps): NetworkGraphHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<NetworkGraphResolvedColors>();

    /**
     * Capture the chart wrapper after mount so Canvas colors
     * can be resolved from computed CSS custom properties.
     */
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    /**
     * Resolve graph CSS variables and consumer overrides
     * before passing color values to the Canvas API.
     */
    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }
        setResolvedColors(resolveNetworkGraphColors(rootElement, colors));
    }, [rootElement, colors]);

    /**
     * Build the Chart.js NetworkGraph data after all
     * semantic colors have been resolved.
     */
    const processedData = useMemo<NetworkGraphHookReturn['processedData']>(() => {
        if (!resolvedColors) {
            return {
                labels: [],
                datasets: [],
            };
        }
        return createNetworkGraphData({
            data,
            colors: resolvedColors,
        });
    }, [data, resolvedColors]);

    /**
     * Build the Chart.js NetworkGraph options using
     * resolved semantic colors.
     */
    const networkOptions = useMemo<NetworkGraphHookReturn['networkOptions']>(() => {
        if (!resolvedColors) {
            return undefined;
        }
        return createNetworkGraphOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    /**
     * NetworkGraph-specific Chart.js plugins.
     */
    const plugins = useMemo<NetworkGraphHookReturn['plugins']>(
        () => [
            ChartDataLabels,
            createNetworkGraphCrosshairPlugin(),
        ] as unknown as NetworkGraphHookReturn['plugins'],
        [],
    );

    /**
     * Wrapper attributes used by tests, styling,
     * effects and crosshair selectors.
     */
    const wrapperProps = useMemo<NetworkGraphHookReturn['wrapperProps']>(
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
        networkOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        networkOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};