import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
    createPieChartData,
    createPieChartOptions,
    resolvePieChartColors,
} from '../base/BasePieChart.utils';
import type {
    PieChartHookProps,
    PieChartHookReturn,
    PieChartResolvedColors,
} from '../PieChart.types';

export const usePieChart = ({
    labels,
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'pie-chart-test-id',
}: PieChartHookProps): PieChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<PieChartResolvedColors>();

    /**
     * Capture the chart wrapper after mount so Canvas colors
     * can be resolved from computed CSS custom properties.
     */
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    /**
     * Resolve chart CSS variables and consumer overrides
     * before passing color values to the Canvas API.
     */
    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolvePieChartColors(rootElement, colors));
    }, [rootElement, colors]);

    /**
     * Build the Chart.js Pie Chart data after all colors
     * have been resolved.
     */
    const processedData = useMemo<PieChartHookReturn['processedData']>(() => {
        if (!resolvedColors) {
            return {
                labels: Array.from(labels),
                datasets: [],
            };
        }

        return createPieChartData({
            labels,
            data,
            colors: resolvedColors,
        });
    }, [data, labels, resolvedColors]);

    /**
     * Build the Chart.js options using resolved semantic colors.
     */
    const pieOptions = useMemo<PieChartHookReturn['pieOptions']>(() => {
        if (!resolvedColors) return undefined;

        return createPieChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    /**
     * Pie Chart-specific Chart.js plugins.
     */
    const plugins = useMemo<PieChartHookReturn['plugins']>(() => [ChartDataLabels], []);

    /**
     * Wrapper attributes used by tests, styling and effects.
     */
    const wrapperProps = useMemo<PieChartHookReturn['wrapperProps']>(
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
        pieOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        pieOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};