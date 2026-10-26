import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createDoughnutChartData,
    createDoughnutChartOptions,
    resolveDoughnutChartColors,
} from '../base/BaseDoughnutChart.utils';
import type {
    DoughnutChartHookProps,
    DoughnutChartHookReturn,
    DoughnutChartResolvedColors,
} from '../DoughnutChart.types';

export const useDoughnutChart = ({
    labels,
    data,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'doughnut-chart-test-id',
}: DoughnutChartHookProps): DoughnutChartHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [
        rootElement,
        setRootElement,
    ] = useState<HTMLDivElement | null>(
        null,
    );

    const [
        resolvedColors,
        setResolvedColors,
    ] =
        useState<DoughnutChartResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [
        customStyles?.wrapper,
        rendererCustomStyles?.container,
    ]);

    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(
            resolveDoughnutChartColors(
                rootElement,
                colors,
            ),
        );
    }, [rootElement, colors]);

    const processedData =
        useMemo<
            DoughnutChartHookReturn['processedData']
        >(() => {
            if (!resolvedColors) {
                return {
                    labels: Array.from(labels),
                    datasets: [],
                };
            }

            return createDoughnutChartData({
                labels,
                data,
                colors: resolvedColors,
            });
        }, [
            data,
            labels,
            resolvedColors,
        ]);

    const doughnutOptions =
        useMemo<
            DoughnutChartHookReturn['doughnutOptions']
        >(() => {
            if (!resolvedColors) {
                return undefined;
            }

            return createDoughnutChartOptions(
                compactObject({
                    options,
                    colors: resolvedColors,
                }),
            );
        }, [options, resolvedColors]);

    const wrapperProps =
        useMemo<
            DoughnutChartHookReturn['wrapperProps']
        >(
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
        doughnutOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        doughnutOptions,
        wrapperProps,
        isReady,
    };
};