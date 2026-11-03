import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { CrosshairPlugin } from '@/components/chartjs/plugin/CrosshairPlugin';
import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import type {
    BarLineChartHookProps,
    BarLineChartHookReturn,
    BarLineChartResolvedColors,
} from '../BarLineChart.types';
import { BAR_LINE_CHART_CONFIG } from '../base/BaseBarLineChart.constants';
import {
    createBarLineChartData,
    createBarLineChartOptions,
    resolveBarLineChartColors,
} from '../base/BaseBarLineChart.utils';

export const useBarLineChart = ({
    data,
    labels,
    colors,
    options,
    appearance = 'smooth',
    effect,
    showTrendPoints = true,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'bar-line-chart-test-id',
}: BarLineChartHookProps): BarLineChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<BarLineChartResolvedColors>();

    /**
     * Capture the chart wrapper after mount so Canvas colors
     * can be resolved from computed CSS custom properties.
     */
    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    /**
     * Resolve CSS variables and consumer overrides
     * before passing color values to the Canvas API.
     */
    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(resolveBarLineChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const barWidth = options?.barWidth ?? BAR_LINE_CHART_CONFIG.barWidth;
    const alignLineToBars = options?.alignLineToBars ?? true;

    /**
     * Build the Chart.js BarLineChart data after all colors
     * have been resolved.
     */
    const processedData = useMemo<BarLineChartHookReturn['processedData']>(() => {
        if (!resolvedColors || !rootElement) {
            return {
                labels: Array.from(labels),
                datasets: [],
            };
        }

        return createBarLineChartData({
            labels,
            data,
            colors: resolvedColors,
            rootElement,
            appearance,
            showTrendPoints,
            barWidth,
            alignLineToBars,
        });
    }, [
        alignLineToBars,
        appearance,
        barWidth,
        data,
        labels,
        resolvedColors,
        rootElement,
        showTrendPoints,
    ]);

    /**
     * Build the Chart.js options using resolved semantic colors.
     */
    const barLineOptions = useMemo<BarLineChartHookReturn['barLineOptions']>(() => {
        if (!resolvedColors) {
            return undefined;
        }

        return createBarLineChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    /**
     * BarLineChart-specific Chart.js plugins.
     */
    const plugins = useMemo<BarLineChartHookReturn['plugins']>(
        () => [
            CrosshairPlugin,
            createPointHaloPlugin({
                enabled: showTrendPoints,
                radiusOffset: BAR_LINE_CHART_CONFIG.haloRadiusOffset,
                opacity: BAR_LINE_CHART_CONFIG.haloOpacity,
            }),
        ],
        [showTrendPoints],
    );

    /**
     * Wrapper attributes used by tests,
     * styling, effects and appearance selectors.
     */
    const wrapperProps = useMemo<BarLineChartHookReturn['wrapperProps']>(
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
        barLineOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        barLineOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};