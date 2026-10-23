import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import type {
  AreaChartResolvedColors,
  UseAreaChartProps,
  UseAreaChartReturn,
} from '../AreaChart.types';
import { AREA_CHART_CONFIG } from '../base/BaseAreaChart.constants';
import {
  createAreaChartData,
  createAreaChartOptions,
  resolveAreaChartColors,
} from '../base/BaseAreaChart.utils';

export const useAreaChart = ({
  data,
  labels,
  colors,
  options,
  appearance = 'smooth',
  effect,
  customStyles,
  rendererCustomStyles,
  className,
  testId = 'area-chart-test-id',
}: UseAreaChartProps): UseAreaChartReturn => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  const [resolvedColors, setResolvedColors] = useState<AreaChartResolvedColors>();

  /**
   * Capture the chart wrapper after mount so Canvas colors
   * can be resolved from computed CSS custom properties.
   */
  useLayoutEffect(() => {
    setRootElement(wrapperRef.current);
  }, [customStyles?.wrapper, rendererCustomStyles?.container]);

  /**
   * Resolve graph CSS variables and consumer overrides
   * before passing color values to the Canvas API.
   */
  useLayoutEffect(() => {
    if (!rootElement) {
      return;
    }

    setResolvedColors(resolveAreaChartColors(rootElement, colors));
  }, [rootElement, colors]);

  /**
   * Build the Chart.js AreaChart data after all colors
   * have been resolved.
   */
  const processedData = useMemo<UseAreaChartReturn['processedData']>(() => {
    if (!resolvedColors || !rootElement) {
      return {
        labels: Array.from(labels),
        datasets: [],
      };
    }

    return createAreaChartData({
      labels,
      data,
      colors: resolvedColors,
      rootElement,
      appearance,
    });
  }, [appearance, data, labels, resolvedColors, rootElement]);

  /**
   * Build the Chart.js options using resolved semantic colors.
   */
  const areaOptions = useMemo<UseAreaChartReturn['areaOptions']>(() => {
    if (!resolvedColors) {
      return undefined;
    }

    return createAreaChartOptions(
      compactObject({
        options,
        colors: resolvedColors,
      }),
    );
  }, [options, resolvedColors]);

  /**
   * AreaChart-specific Chart.js plugins.
   */
  const plugins = useMemo<UseAreaChartReturn['plugins']>(
    () => [
      createPointHaloPlugin({
        enabled: true,
        radiusOffset: AREA_CHART_CONFIG.haloRadiusOffset,
        opacity: AREA_CHART_CONFIG.haloOpacity,
      }),
    ],
    [],
  );

  /**
   * Wrapper attributes used by tests, styling,
   * effects and appearance selectors.
   */
  const wrapperProps = useMemo<UseAreaChartReturn['wrapperProps']>(
    () =>
      compactObject({
        className,
        'data-testid': testId,
        'data-appearance': appearance,
        'data-effect': effect,
      }),
    [appearance, className, effect, testId],
  );

  const isReady =
    rootElement !== null &&
    resolvedColors !== undefined &&
    areaOptions !== undefined;

  return {
    wrapperRef,
    processedData,
    areaOptions,
    plugins,
    wrapperProps,
    isReady,
  };
};
