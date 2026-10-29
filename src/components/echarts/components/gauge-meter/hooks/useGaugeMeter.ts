import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import {
    createGaugeMeterDefinition,
    type GaugeMeterDefinition,
    mergeGaugeMeterOptions,
    resolveGaugeMeterColors,
} from '../base/BaseGaugeMeter.utils';
import type {
    GaugeMeterHookProps,
    GaugeMeterHookReturn,
    GaugeMeterResolvedColors,
    GaugeMeterWrapperProps,
} from '../GaugeMeter.types';

export const useGaugeMeter = ({
    labels,
    data,
    value,
    colors,
    options,
    effect = 'none',
    customStyles,
    rendererCustomStyles,
    className,
    testId = 'echarts-gauge-meter-test-id',
}: GaugeMeterHookProps): GaugeMeterHookReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [resolvedColors, setResolvedColors] =
        useState<GaugeMeterResolvedColors>();

    useLayoutEffect(() => {
        setRootElement(wrapperRef.current);
    }, [customStyles?.wrapper, rendererCustomStyles?.container]);

    useLayoutEffect(() => {
        if (!rootElement) {
            return;
        }

        setResolvedColors(resolveGaugeMeterColors(rootElement, colors));
    }, [rootElement, colors]);

    const definition = useMemo<GaugeMeterDefinition | undefined>(() => {
        if (!resolvedColors) {
            return undefined;
        }

        return createGaugeMeterDefinition(
            compactObject({
                labels,
                data,
                value,
                colors: resolvedColors,
                options,
            }),
        );
    }, [labels, data, value, resolvedColors, options]);

    const chartOptions = useMemo<EChartsOption | undefined>(() => {
        if (!definition) {
            return undefined;
        }

        const generatedOptions = createEChartsOptions(definition);
        const animatedOptions = applyEChartsSeriesAnimation(
            generatedOptions,
            options,
        );

        return mergeGaugeMeterOptions(animatedOptions, options);
    }, [definition, options]);

    const wrapperProps = useMemo<GaugeMeterWrapperProps>(
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
        definition !== undefined &&
        chartOptions !== undefined;

    return {
        wrapperRef,
        definition,
        chartOptions,
        wrapperProps,
        isReady,
    };
};