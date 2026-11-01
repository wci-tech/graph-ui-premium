import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import type { ChartjsProps } from '@/components/chartjs/ChartJS.types';

import {
    createFunnelChartCenterLabelPlugin,
    createFunnelChartData,
    createFunnelChartOptions,
    resolveFunnelChartColors,
} from '../base/BaseFunnelChart.utils';
import type {
    FunnelChartHookProps,
    FunnelChartHookReturn,
    FunnelChartResolvedColors,
} from '../FunnelChart.types';

export const useFunnelChart = ({
    labels,
    data,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'funnel-chart-test-id',
}: FunnelChartHookProps): FunnelChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

    const [resolvedColors, setResolvedColors] = useState<FunnelChartResolvedColors>();

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

        setResolvedColors(resolveFunnelChartColors(rootElement, colors));
    }, [rootElement, colors]);

    /**
     * Build the Chart.js FunnelChart data after all colors
     * have been resolved.
     */
    const processedData = useMemo<FunnelChartHookReturn['processedData']>(() => {
        if (!resolvedColors) {
            return {
                labels: Array.from(labels),
                datasets: [],
            };
        }

        return createFunnelChartData(
            compactObject({
                labels,
                data,
                colors: resolvedColors,
                options,
            }),
        );
    }, [labels, data, resolvedColors, options]);

    /**
     * Build the Chart.js options using resolved semantic colors.
     */
    const funnelOptions = useMemo<FunnelChartHookReturn['funnelOptions']>(() => {
        if (!resolvedColors) {
            return undefined;
        }

        return createFunnelChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    /**
     * Build the center-label plugin used by vertical Funnel charts.
     */
    const centerLabelPlugin = useMemo(() => {
        if (!resolvedColors) {
            return undefined;
        }

        return createFunnelChartCenterLabelPlugin(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    /**
     * FunnelChart-specific Chart.js plugins.
     */
    const plugins = useMemo<NonNullable<ChartjsProps['plugins']>>(
        () =>
            centerLabelPlugin
                ? ([
                    ChartDataLabels,
                    centerLabelPlugin,
                ] as unknown as NonNullable<ChartjsProps['plugins']>)
                : ([ChartDataLabels] as unknown as NonNullable<ChartjsProps['plugins']>),
        [centerLabelPlugin],
    );

    /**
     * Wrapper attributes used by tests, styling
     * and effect selectors.
     */
    const wrapperProps = useMemo<FunnelChartHookReturn['wrapperProps']>(
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
        funnelOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        funnelOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};