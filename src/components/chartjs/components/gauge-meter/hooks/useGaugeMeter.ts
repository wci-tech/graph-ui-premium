import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import {
    createGaugeMeterData,
    createGaugeMeterOptions,
    createGaugeMeterPlugins,
    resolveGaugeMeterColors,
    resolveGaugeMeterValue,
} from '../base/BaseGaugeMeter.utils';
import type {
    GaugeMeterHookProps,
    GaugeMeterHookReturn,
    GaugeMeterResolvedColors,
} from '../GaugeMeter.types';

export const useGaugeMeter = ({
    labels,
    data,
    value,
    colors,
    options,
    effect,
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'gauge-meter-test-id',
}: GaugeMeterHookProps): GaugeMeterHookReturn => {
    const wrapperRef =
        useRef<HTMLDivElement>(null);

    const [
        rootElement,
        setRootElement,
    ] =
        useState<HTMLDivElement | null>(
            null,
        );

    const [
        resolvedColors,
        setResolvedColors,
    ] =
        useState<
            GaugeMeterResolvedColors
        >();

    useLayoutEffect(() => {
        setRootElement(
            wrapperRef.current,
        );
    }, [
        customStyles?.wrapper,
        rendererCustomStyles?.container,
    ]);

    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(
            resolveGaugeMeterColors(
                rootElement,
                colors,
            ),
        );
    }, [
        rootElement,
        colors,
    ]);

    const resolvedValue = useMemo(
        () =>
            resolveGaugeMeterValue(
                data,
                value,
            ),
        [
            data,
            value,
        ],
    );

    const processedData =
        useMemo<
            GaugeMeterHookReturn['processedData']
        >(() => {
            if (!resolvedColors) {
                return {
                    labels: Array.from(labels),
                    datasets: [],
                };
            }

            return createGaugeMeterData({
                labels,
                data,
                colors: resolvedColors,
            });
        }, [
            data,
            labels,
            resolvedColors,
        ]);

    const gaugeOptions =
        useMemo<
            GaugeMeterHookReturn['gaugeOptions']
        >(() => {
            if (!resolvedColors) {
                return undefined;
            }

            return createGaugeMeterOptions(
                compactObject({
                    options,
                    colors: resolvedColors,
                }),
            );
        }, [
            options,
            resolvedColors,
        ]);

    const plugins =
        useMemo<
            GaugeMeterHookReturn['plugins']
        >(() => {
            if (!resolvedColors) {
                return [];
            }

            return createGaugeMeterPlugins(
                compactObject({
                    value: resolvedValue,
                    colors: resolvedColors,
                    options,
                }),
            );
        }, [
            options,
            resolvedColors,
            resolvedValue,
        ]);

    const wrapperProps =
        useMemo<
            GaugeMeterHookReturn['wrapperProps']
        >(
            () =>
                compactObject({
                    className,

                    'data-testid':
                        testId,

                    'data-effect':
                        effect,
                }),
            [
                className,
                effect,
                testId,
            ],
        );

    const isReady =
        rootElement !== null &&
        resolvedColors !== undefined &&
        gaugeOptions !== undefined;

    return {
        wrapperRef,
        processedData,
        gaugeOptions,
        plugins,
        wrapperProps,
        resolvedColors,
        resolvedValue,
        isReady,
    };
};