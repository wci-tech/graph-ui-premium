import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import { RADAR_CHART_CONFIG } from '../base/BaseRadarChart.constants';
import {
    createRadarChartData,
    createRadarChartOptions,
    resolveRadarChartColors,
} from '../base/BaseRadarChart.utils';
import type {
    RadarChartHookProps,
    RadarChartHookReturn,
    RadarChartResolvedColors,
} from '../RadarChart.types';

export const useRadarChart = ({
    data,
    labels,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'radar-chart-test-id',
}: RadarChartHookProps): RadarChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<RadarChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;

        setResolvedColors(resolveRadarChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const processedData = useMemo<RadarChartHookReturn['processedData']>(() => {
        if (!resolvedColors || !rootElement) {
            return {
                labels: Array.from(labels),
                datasets: [],
            };
        }

        return createRadarChartData({
            labels,
            data,
            colors: resolvedColors,
            rootElement,
        });
    }, [data, labels, resolvedColors, rootElement]);

    const radarOptions = useMemo<RadarChartHookReturn['radarOptions']>(() => {
        if (!resolvedColors) return undefined;

        return createRadarChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    const plugins = useMemo<RadarChartHookReturn['plugins']>(
        () => [
            createPointHaloPlugin({
                enabled: true,
                radiusOffset: RADAR_CHART_CONFIG.haloRadiusOffset,
                opacity: RADAR_CHART_CONFIG.haloOpacity,
            }),
        ],
        [],
    );

    const wrapperProps = useMemo<RadarChartHookReturn['wrapperProps']>(
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
        radarOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        radarOptions,
        plugins,
        wrapperProps,
        isReady,
    };
};