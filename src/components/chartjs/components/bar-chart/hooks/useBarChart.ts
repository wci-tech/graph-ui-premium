import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import type {
  BarChartHookProps,
  BarChartHookReturn,
  BarChartResolvedColors,
} from '../BarChart.types';
import {
  createBarChartData,
  createBarChartOptions,
  resolveBarChartColors,
} from '../base/BaseBarChart.utils';

export const useBarChart = ({
  data,
  labels,
  colors,
  options,
  effect,
  customStyles,
  rendererCustomStyles,
  className,
  testId = 'bar-chart-test-id',
}: BarChartHookProps): BarChartHookReturn => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] =
    useState<HTMLDivElement | null>(null);

  const [resolvedColors, setResolvedColors] =
    useState<BarChartResolvedColors>();

  /**
   * Capture the chart wrapper after mount so Canvas colors
   * can be resolved from computed CSS custom properties.
   */
  useLayoutEffect(() => {
    setRootElement(wrapperRef.current);
  }, [
    customStyles?.wrapper,
    rendererCustomStyles?.container,
  ]);

  /**
   * Resolve CSS variables and consumer overrides
   * before passing color values to the Canvas API.
   */
  useLayoutEffect(() => {
    if (!rootElement) {
      return;
    }

    setResolvedColors(
      resolveBarChartColors(
        rootElement,
        colors,
      ),
    );
  }, [rootElement, colors]);

  /**
   * Build the Chart.js BarChart data after all colors
   * have been resolved.
   */
  const processedData = useMemo<
    BarChartHookReturn['processedData']
  >(() => {
    if (!resolvedColors || !rootElement) {
      return {
        labels: Array.from(labels),
        datasets: [],
      };
    }

    return createBarChartData(
      compactObject({
        labels,
        data,
        colors: resolvedColors,
        rootElement,
        options,
      }),
    );
  }, [
    data,
    labels,
    options,
    resolvedColors,
    rootElement,
  ]);

  /**
   * Build the Chart.js options using resolved semantic colors.
   */
  const barOptions = useMemo<
    BarChartHookReturn['barOptions']
  >(() => {
    if (!resolvedColors) {
      return undefined;
    }

    return createBarChartOptions(
      compactObject({
        options,
        colors: resolvedColors,
      }),
    );
  }, [
    options,
    resolvedColors,
  ]);

  /**
   * Wrapper attributes used by tests,
   * styling and effects.
   */
  const wrapperProps = useMemo<
    BarChartHookReturn['wrapperProps']
  >(
    () =>
      compactObject({
        className,
        'data-testid': testId,
        'data-effect': effect,
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
    barOptions !== undefined;

  return {
    wrapperRef,
    processedData,
    barOptions,
    wrapperProps,
    isReady,
  };
};