import { useLayoutEffect } from 'react';

import type { ECharts, EChartsOption } from 'echarts';

import {
    createInitialLoadOptions,
    getAnimationGuardDuration,
} from '../utils/ECharts.animation';

interface UseEChartsOptionsParams {
    readonly chartId?: string;
    readonly nativeOptions?: EChartsOption;

    readonly instanceRef: React.RefObject<ECharts | null>;

    readonly hasInitialAnimationRunRef: React.RefObject<boolean>;
    readonly isPreparingAnimationRef: React.RefObject<boolean>;
    readonly isEntranceAnimationRunningRef: React.RefObject<boolean>;
    readonly hasPendingResizeRef: React.RefObject<boolean>;

    readonly optionsVersionRef: React.RefObject<number>;

    readonly firstFrameRef: React.RefObject<number | null>;
    readonly secondFrameRef: React.RefObject<number | null>;

    readonly animationGuardTimeoutRef: React.RefObject<
        ReturnType<typeof setTimeout> | null
    >;

    readonly cancelFrames: () => void;
    readonly cancelAnimationGuard: () => void;
    readonly finishEntranceAnimation: () => void;
    readonly resizeChart: () => void;
    readonly resizeChartNow: () => void;
}

/**
 * Synchronizes ECharts options with the active chart instance.
 *
 * The first render uses the protected zero-to-real entrance animation.
 * Subsequent option updates are applied directly without replaying the
 * initial entrance sequence.
 *
 * @param params - References and callbacks required for option synchronization.
 */
export const useEChartsOptions = ({
    chartId,
    nativeOptions,
    instanceRef,
    hasInitialAnimationRunRef,
    isPreparingAnimationRef,
    isEntranceAnimationRunningRef,
    hasPendingResizeRef,
    optionsVersionRef,
    firstFrameRef,
    secondFrameRef,
    animationGuardTimeoutRef,
    cancelFrames,
    cancelAnimationGuard,
    finishEntranceAnimation,
    resizeChart,
    resizeChartNow,
}: UseEChartsOptionsParams): void => {
    useLayoutEffect(() => {
        const chartInstance = instanceRef.current;

        if (
            !chartInstance ||
            chartInstance.isDisposed() ||
            !nativeOptions
        ) {
            return;
        }

        optionsVersionRef.current += 1;

        const currentVersion = optionsVersionRef.current;

        cancelFrames();

        if (!hasInitialAnimationRunRef.current) {
            isPreparingAnimationRef.current = true;

            hasPendingResizeRef.current = false;

            firstFrameRef.current = requestAnimationFrame(() => {
                firstFrameRef.current = null;

                if (optionsVersionRef.current !== currentVersion) {
                    return;
                }

                if (chartInstance.isDisposed()) {
                    return;
                }

                resizeChartNow();

                secondFrameRef.current = requestAnimationFrame(() => {
                    secondFrameRef.current = null;

                    if (optionsVersionRef.current !== currentVersion) {
                        return;
                    }

                    if (chartInstance.isDisposed()) {
                        return;
                    }

                    resizeChartNow();

                    chartInstance.setOption(
                        createInitialLoadOptions(nativeOptions),
                        {
                            notMerge: true,
                            lazyUpdate: false,
                        },
                    );

                    firstFrameRef.current = requestAnimationFrame(() => {
                        firstFrameRef.current = null;

                        if (optionsVersionRef.current !== currentVersion) {
                            return;
                        }

                        if (chartInstance.isDisposed()) {
                            return;
                        }

                        resizeChartNow();

                        secondFrameRef.current = requestAnimationFrame(() => {
                            secondFrameRef.current = null;

                            if (optionsVersionRef.current !== currentVersion) {
                                return;
                            }

                            if (chartInstance.isDisposed()) {
                                return;
                            }

                            resizeChartNow();

                            hasInitialAnimationRunRef.current = true;

                            isPreparingAnimationRef.current = false;

                            isEntranceAnimationRunningRef.current = true;

                            chartInstance.setOption(nativeOptions, {
                                notMerge: false,
                                lazyUpdate: false,
                            });

                            cancelAnimationGuard();

                            const guardDuration =
                                getAnimationGuardDuration(nativeOptions);

                            animationGuardTimeoutRef.current = setTimeout(() => {
                                animationGuardTimeoutRef.current = null;

                                finishEntranceAnimation();
                            }, guardDuration);
                        });
                    });
                });
            });

            return () => {
                if (optionsVersionRef.current === currentVersion) {
                    optionsVersionRef.current += 1;
                }

                cancelFrames();

                if (!hasInitialAnimationRunRef.current) {
                    isPreparingAnimationRef.current = false;
                }
            };
        }

        try {
            chartInstance.setOption(nativeOptions, {
                notMerge: false,
                lazyUpdate: false,
            });

            resizeChart();
        } catch (error: unknown) {
            console.error('ECharts Render Error:', error);
        }

        return;
    }, [
        animationGuardTimeoutRef,
        cancelAnimationGuard,
        cancelFrames,
        chartId,
        finishEntranceAnimation,
        firstFrameRef,
        hasInitialAnimationRunRef,
        hasPendingResizeRef,
        instanceRef,
        isEntranceAnimationRunningRef,
        isPreparingAnimationRef,
        nativeOptions,
        optionsVersionRef,
        resizeChart,
        resizeChartNow,
        secondFrameRef,
    ]);
};