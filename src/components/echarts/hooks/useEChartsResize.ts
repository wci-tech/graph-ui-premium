import { useCallback, useEffect } from 'react';

import type { ECharts } from 'echarts';

interface UseEChartsResizeParams {
    readonly chartRef: React.RefObject<HTMLDivElement | null>;
    readonly instanceRef: React.RefObject<ECharts | null>;
    readonly isPreparingAnimationRef: React.RefObject<boolean>;
    readonly isEntranceAnimationRunningRef: React.RefObject<boolean>;
    readonly hasPendingResizeRef: React.RefObject<boolean>;
    readonly resizeFrameRef: React.RefObject<number | null>;
}

/**
 * Manages responsive resizing for an ECharts instance.
 *
 * Resize operations are temporarily deferred while the initial entrance
 * animation is being prepared or executed so that responsive updates do not
 * interrupt the animation lifecycle.
 *
 * @param params - References required to manage chart resizing.
 * @returns Functions for immediate and scheduled chart resizing.
 */
export const useEChartsResize = ({
    chartRef,
    instanceRef,
    isPreparingAnimationRef,
    isEntranceAnimationRunningRef,
    hasPendingResizeRef,
    resizeFrameRef,
}: UseEChartsResizeParams) => {
    const resizeTo = useCallback(
        (width: number, height: number) => {
            const chartInstance = instanceRef.current;

            if (
                !chartInstance ||
                chartInstance.isDisposed() ||
                width <= 0 ||
                height <= 0
            ) {
                return;
            }

            chartInstance.resize({
                width: Math.max(1, Math.floor(width)),
                height: Math.max(1, Math.floor(height)),
                animation: {
                    duration: 0,
                },
            });
        },
        [instanceRef],
    );

    const resizeChartNow = useCallback(() => {
        const chartElement = chartRef.current;

        if (!chartElement) {
            return;
        }

        const wrapper = chartElement.parentElement ?? chartElement;

        const rect = wrapper.getBoundingClientRect();

        resizeTo(rect.width, rect.height);
    }, [chartRef, resizeTo]);

    const resizeChart = useCallback(() => {
        if (
            isPreparingAnimationRef.current ||
            isEntranceAnimationRunningRef.current
        ) {
            hasPendingResizeRef.current = true;

            return;
        }

        if (resizeFrameRef.current !== null) {
            cancelAnimationFrame(resizeFrameRef.current);
        }

        resizeFrameRef.current = requestAnimationFrame(() => {
            resizeFrameRef.current = null;

            if (
                isPreparingAnimationRef.current ||
                isEntranceAnimationRunningRef.current
            ) {
                hasPendingResizeRef.current = true;

                return;
            }

            resizeChartNow();
        });
    }, [
        hasPendingResizeRef,
        isEntranceAnimationRunningRef,
        isPreparingAnimationRef,
        resizeChartNow,
        resizeFrameRef,
    ]);

    useEffect(() => {
        const chartElement = chartRef.current;

        if (!chartElement) {
            return;
        }

        const wrapper = chartElement.parentElement ?? chartElement;

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];

            if (!entry) {
                return;
            }

            if (
                isPreparingAnimationRef.current ||
                isEntranceAnimationRunningRef.current
            ) {
                hasPendingResizeRef.current = true;

                return;
            }

            const { width, height } = entry.contentRect;

            if (width <= 0 || height <= 0) {
                return;
            }

            if (resizeFrameRef.current !== null) {
                cancelAnimationFrame(resizeFrameRef.current);
            }

            resizeFrameRef.current = requestAnimationFrame(() => {
                resizeFrameRef.current = null;

                if (
                    isPreparingAnimationRef.current ||
                    isEntranceAnimationRunningRef.current
                ) {
                    hasPendingResizeRef.current = true;

                    return;
                }

                resizeTo(width, height);
            });
        });

        resizeObserver.observe(wrapper);

        const handleWindowResize = () => {
            resizeChart();
        };

        window.addEventListener('resize', handleWindowResize);

        resizeChart();

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener('resize', handleWindowResize);
        };
    }, [
        chartRef,
        hasPendingResizeRef,
        isEntranceAnimationRunningRef,
        isPreparingAnimationRef,
        resizeChart,
        resizeFrameRef,
        resizeTo,
    ]);

    return {
        resizeChart,
        resizeChartNow,
    };
};