import { useLayoutEffect } from 'react';

import type { ECharts } from 'echarts';
import * as echarts from 'echarts';

interface UseEChartsInstanceParams {
    readonly chartId?: string;
    readonly chartRef: React.RefObject<HTMLDivElement | null>;
    readonly instanceRef: React.RefObject<ECharts | null>;
    readonly optionsVersionRef: React.RefObject<number>;
    readonly hasInitialAnimationRunRef: React.RefObject<boolean>;
    readonly isPreparingAnimationRef: React.RefObject<boolean>;
    readonly isEntranceAnimationRunningRef: React.RefObject<boolean>;
    readonly hasPendingResizeRef: React.RefObject<boolean>;
    readonly cancelFrames: () => void;
    readonly cancelAnimationGuard: () => void;
    readonly finishEntranceAnimation: () => void;
    readonly resizeChartNow: () => void;
}

/**
 * Manages creation and disposal of the native ECharts instance.
 *
 * Registers the ECharts finished event used to complete the protected
 * entrance-animation lifecycle.
 *
 * @param params - References and callbacks required by the instance lifecycle.
 */
export const useEChartsInstance = ({
    chartId,
    chartRef,
    instanceRef,
    optionsVersionRef,
    hasInitialAnimationRunRef,
    isPreparingAnimationRef,
    isEntranceAnimationRunningRef,
    hasPendingResizeRef,
    cancelFrames,
    cancelAnimationGuard,
    finishEntranceAnimation,
    resizeChartNow,
}: UseEChartsInstanceParams): void => {
    useLayoutEffect(() => {
        const chartElement = chartRef.current;

        if (!chartElement) {
            return;
        }

        const existingInstance =
            echarts.getInstanceByDom(chartElement);

        const chartInstance =
            existingInstance ??
            echarts.init(chartElement, undefined, {
                renderer: 'canvas',
                useDirtyRect: false,
            });

        instanceRef.current = chartInstance;

        hasInitialAnimationRunRef.current = false;
        isPreparingAnimationRef.current = false;
        isEntranceAnimationRunningRef.current = false;
        hasPendingResizeRef.current = false;

        const handleFinished = () => {
            if (!isEntranceAnimationRunningRef.current) {
                return;
            }

            finishEntranceAnimation();
        };

        chartInstance.on('finished', handleFinished);

        resizeChartNow();

        return () => {
            optionsVersionRef.current += 1;

            cancelFrames();

            cancelAnimationGuard();

            chartInstance.off('finished', handleFinished);

            hasInitialAnimationRunRef.current = false;

            isPreparingAnimationRef.current = false;

            isEntranceAnimationRunningRef.current = false;

            hasPendingResizeRef.current = false;

            if (!chartInstance.isDisposed()) {
                chartInstance.dispose();
            }

            if (instanceRef.current === chartInstance) {
                instanceRef.current = null;
            }
        };
    }, [
        chartId,
        cancelAnimationGuard,
        cancelFrames,
        finishEntranceAnimation,
        hasInitialAnimationRunRef,
        hasPendingResizeRef,
        instanceRef,
        isEntranceAnimationRunningRef,
        isPreparingAnimationRef,
        optionsVersionRef,
        resizeChartNow,
        chartRef,
    ]);
};