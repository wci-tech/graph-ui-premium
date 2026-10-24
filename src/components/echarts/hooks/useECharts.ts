import { useCallback, useMemo, useRef } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { ECharts } from 'echarts';

import { useEChartsDownload } from '@/hooks/useEChartsDownload';

import type { EChartsProps } from '../ECharts.types';
import { DEFAULT_ECHARTS_EXPORT_FILE_NAME } from '../utils/ECharts.constants';

import { useEChartsInstance } from './useEChartsInstance';
import { useEChartsOptions } from './useEChartsOptions';
import { useEChartsResize } from './useEChartsResize';

type UseEChartsParams = Pick<EChartsProps, 'chartId' | 'options'>;

/**
 * Coordinates the ECharts renderer lifecycle.
 *
 * Instance management, responsive resizing, option synchronization,
 * entrance animation, and download behavior are delegated to focused hooks.
 *
 * @param params - ECharts renderer configuration.
 * @returns Chart container reference and download handler.
 */
export const useECharts = ({
  options,
  chartId,
}: UseEChartsParams) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const instanceRef = useRef<ECharts | null>(null);

  const hasInitialAnimationRunRef = useRef(false);

  const isPreparingAnimationRef = useRef(false);

  const isEntranceAnimationRunningRef = useRef(false);

  const hasPendingResizeRef = useRef(false);

  const optionsVersionRef = useRef(0);

  const firstFrameRef = useRef<number | null>(null);

  const secondFrameRef = useRef<number | null>(null);

  const resizeFrameRef = useRef<number | null>(null);

  const animationGuardTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const nativeOptions = useMemo(() => {
    if (!options) {
      return undefined;
    }

    const {
      height: _height,
      chartBackground: _chartBackground,
      ...resolvedOptions
    } = options;

    return resolvedOptions;
  }, [options]);

  const { handleDownload } = useEChartsDownload(
    instanceRef,
    'echarts',
    compactObject({
      fileName: chartId ?? DEFAULT_ECHARTS_EXPORT_FILE_NAME,
      backgroundColor: options?.chartBackground,
    }),
  );

  /**
   * Cancels pending animation and resize frames.
   */
  const cancelFrames = useCallback(() => {
    if (firstFrameRef.current !== null) {
      cancelAnimationFrame(firstFrameRef.current);

      firstFrameRef.current = null;
    }

    if (secondFrameRef.current !== null) {
      cancelAnimationFrame(secondFrameRef.current);

      secondFrameRef.current = null;
    }

    if (resizeFrameRef.current !== null) {
      cancelAnimationFrame(resizeFrameRef.current);

      resizeFrameRef.current = null;
    }
  }, []);

  /**
   * Cancels the fallback entrance-animation completion guard.
   */
  const cancelAnimationGuard = useCallback(() => {
    if (animationGuardTimeoutRef.current !== null) {
      clearTimeout(animationGuardTimeoutRef.current);

      animationGuardTimeoutRef.current = null;
    }
  }, []);

  const {
    resizeChart,
    resizeChartNow,
  } = useEChartsResize({
    chartRef,
    instanceRef,
    isPreparingAnimationRef,
    isEntranceAnimationRunningRef,
    hasPendingResizeRef,
    resizeFrameRef,
  });

  /**
   * Completes the protected entrance-animation lifecycle and applies the
   * latest responsive chart size.
   */
  const finishEntranceAnimation = useCallback(() => {
    if (!isEntranceAnimationRunningRef.current) {
      return;
    }

    isEntranceAnimationRunningRef.current = false;

    isPreparingAnimationRef.current = false;

    cancelAnimationGuard();

    hasPendingResizeRef.current = false;

    resizeChart();
  }, [cancelAnimationGuard, resizeChart]);

  useEChartsInstance(
    compactObject({
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
    }),
  );

  useEChartsOptions(
    compactObject({
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
    }),
  );

  return {
    chartRef,
    handleDownload,
  };
};