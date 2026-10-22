import { type RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';

import type { ChartJSData, ChartjsProps } from '@/components/chartjs/ChartJS.types';

import type { BaseBarChartProps } from '../base/BaseBarChart.types';
import {
  type BarChartResolvedColors,
  createBarChartData,
  createBarChartOptions,
  resolveBarChartColors,
} from '../base/BaseBarChart.utils';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type UseBarChartProps = Pick<
  BaseBarChartProps,
  | 'data'
  | 'labels'
  | 'colors'
  | 'options'
  | 'effect'
  | 'customStyles'
  | 'rendererCustomStyles'
  | 'className'
  | 'testId'
>;

type BarChartWrapperProps = {
  readonly className?: string;
  readonly 'data-testid'?: string;
  readonly 'data-effect'?: string;
};

type UseBarChartReturn = {
  readonly wrapperRef: RefObject<HTMLDivElement | null>;

  readonly processedData: ChartJSData;

  readonly barOptions: ChartjsProps['options'] | undefined;

  readonly wrapperProps: BarChartWrapperProps;

  readonly isReady: boolean;
};

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export const useBarChart = ({
  data,
  labels,
  colors,
  options,
  effect = 'none',
  customStyles,
  rendererCustomStyles,
  className,
  testId = 'bar-chart-test-id',
}: UseBarChartProps): UseBarChartReturn => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  const [resolvedColors, setResolvedColors] = useState<BarChartResolvedColors>();

  /**
   * Capture the rendered wrapper so graph CSS
   * variables can be resolved from computed styles.
   */
  useLayoutEffect(() => {
    setRootElement(wrapperRef.current);
  }, [customStyles?.wrapper, rendererCustomStyles?.container]);

  /**
   * Resolve root graph tokens and consumer
   * chart-level color overrides.
   */
  useLayoutEffect(() => {
    if (!rootElement) {
      return;
    }

    setResolvedColors(resolveBarChartColors(rootElement, colors));
  }, [rootElement, colors]);

  /**
   * Build Chart.js datasets after all CSS variables
   * have been converted to real color values.
   */
  const processedData = useMemo<ChartJSData>(() => {
    if (!rootElement || !resolvedColors) {
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
  }, [data, labels, options, resolvedColors, rootElement]);

  /**
   * Build Chart.js options using the resolved
   * semantic graph colors.
   */
  const barOptions = useMemo<ChartjsProps['options'] | undefined>(() => {
    if (!resolvedColors) {
      return undefined;
    }

    return createBarChartOptions(
      compactObject({
        options,
        colors: resolvedColors,
      }),
    );
  }, [options, resolvedColors]);

  const wrapperProps = useMemo<BarChartWrapperProps>(
    () =>
      compactObject({
        className,

        'data-testid': testId,

        'data-effect': effect,
      }),
    [className, effect, testId],
  );

  const isReady = rootElement !== null && resolvedColors !== undefined && barOptions !== undefined;

  return {
    wrapperRef,
    processedData,
    barOptions,
    wrapperProps,
    isReady,
  };
};
