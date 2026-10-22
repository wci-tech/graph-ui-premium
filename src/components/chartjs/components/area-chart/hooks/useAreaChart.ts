import { type RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import type { ChartJSData, ChartjsProps } from '@/components/chartjs/ChartJS.types';
import { createPointHaloPlugin } from '@/components/chartjs/plugin/PointHaloPlugin';

import { AREA_CHART_CONFIG } from '../base/BaseAreaChart.constants';
import type { BaseAreaChartProps } from '../base/BaseAreaChart.types';
import {
  type AreaChartResolvedColors,
  createAreaChartData,
  createAreaChartOptions,
  resolveAreaChartColors,
} from '../base/BaseAreaChart.utils';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type UseAreaChartProps = Pick<
  BaseAreaChartProps,
  | 'data'
  | 'labels'
  | 'colors'
  | 'options'
  | 'appearance'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

type AreaChartWrapperProps = {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-appearance'?: string;
  readonly 'data-effect'?: string;
};

type UseAreaChartReturn = {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;
  readonly processedData: ChartJSData;
  readonly areaOptions: ChartjsProps['options'] | undefined;
  readonly plugins: NonNullable<ChartjsProps['plugins']>;
  readonly wrapperProps: AreaChartWrapperProps;
  readonly isReady: boolean;
};

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

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

  const processedData = useMemo<ChartJSData>(() => {
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

  const areaOptions = useMemo<ChartjsProps['options'] | undefined>(() => {
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

  const plugins = useMemo<NonNullable<ChartjsProps['plugins']>>(
    () => [
      createPointHaloPlugin({
        enabled: true,
        radiusOffset: AREA_CHART_CONFIG.haloRadiusOffset,
        opacity: AREA_CHART_CONFIG.haloOpacity,
      }),
    ],
    [],
  );

  const wrapperProps = useMemo<AreaChartWrapperProps>(
    () =>
      compactObject({
        className,
        'data-testid': testId,
        'data-appearance': appearance,
        'data-effect': effect,
      }),
    [appearance, className, effect, testId],
  );

  const isReady = rootElement !== null && resolvedColors !== undefined && areaOptions !== undefined;

  return {
    wrapperRef,
    processedData,
    areaOptions,
    plugins,
    wrapperProps,
    isReady,
  };
};
