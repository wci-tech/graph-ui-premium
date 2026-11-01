import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createTreemapChartData,
    createTreemapChartOptions,
    resolveTreemapChartColors,
} from '../base/BaseTreemapChart.utils';
import type {
    TreemapChartHookProps,
    TreemapChartHookReturn,
    TreemapChartResolvedColors,
} from '../TreemapChart.types';

export const useTreemapChart = ({
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'treemap-chart-test-id',
}: TreemapChartHookProps): TreemapChartHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] = useState<TreemapChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) return;
        setResolvedColors(resolveTreemapChartColors(rootElement, colors));
    }, [rootElement, colors]);

    const processedData = useMemo<TreemapChartHookReturn['processedData']>(() => {
        if (!rootElement || !resolvedColors) return { datasets: [] };
        return createTreemapChartData(
            compactObject({
                data,
                colors: resolvedColors,
                rootElement,
                options,
            }),
        );
    }, [data, options, resolvedColors, rootElement]);

    const treemapOptions = useMemo<TreemapChartHookReturn['treemapOptions']>(() => {
        if (!resolvedColors) return undefined;
        return createTreemapChartOptions(
            compactObject({
                options,
                colors: resolvedColors,
            }),
        );
    }, [options, resolvedColors]);

    const wrapperProps = useMemo<TreemapChartHookReturn['wrapperProps']>(
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
        treemapOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        treemapOptions,
        wrapperProps,
        isReady,
    };
};