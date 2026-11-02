import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import { LINE_CHART_CONFIG } from '../base/BaseLineChart.constants';
import {
    createLineChartData,
    createLineChartOptions,
    resolveLineChartColors,
} from '../base/BaseLineChart.utils';
import type {
    LineChartHookProps,
    LineChartHookReturn,
    LineChartResolvedColors,
} from '../LineChart.types';

export const useLineChart = ({
    data,
    labels,
    colors,
    options,
    appearance = 'solid',
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'line-chart-test-id',
}: LineChartHookProps): LineChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<LineChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveLineChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const processedData = useMemo<LineChartHookReturn['processedData']>(() => {
        if (!resolvedColors || !rootElement) {
            return {
                labels: Array.from(labels),
                datasets: [],
            };
        }

        return createLineChartData({
            labels,
            data,
            colors: resolvedColors,
            rootElement,
            appearance,
        });
    }, [appearance, data, labels, resolvedColors, rootElement]);

    const lineOptions = useMemo<LineChartHookReturn['lineOptions']>(() => {
        if (!resolvedColors) return undefined;

        return createLineChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    const plugins = useMemo<LineChartHookReturn['plugins']>(
        () => [
            createPointHaloPlugin({
                enabled: true,
                radiusOffset: LINE_CHART_CONFIG.haloRadiusOffset,
                opacity: LINE_CHART_CONFIG.haloOpacity,
            }),
        ],
        [],
    );

    const wrapperProps = useMemo<LineChartHookReturn['wrapperProps']>(
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
        lineOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        lineOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};