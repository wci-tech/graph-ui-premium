import { type RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import type { BaseAreaChartProps } from '../base/BaseAreaChart.types';
import {
  type AreaChartDefinition,
  type AreaChartResolvedColors,
  createAreaChartDefinition,
  mergeAreaChartOptions,
  resolveAreaChartColors,
} from '../base/BaseAreaChart.utils';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type UseAreaChartProps = Pick<
  BaseAreaChartProps,
  | 'data'
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
  readonly definition: AreaChartDefinition | undefined;
  readonly chartOptions: EChartsOption | undefined;
  readonly wrapperProps: AreaChartWrapperProps;
  readonly isReady: boolean;
};

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export const useAreaChart = ({
  data,
  colors,
  options,
  appearance = 'smooth',
  effect = 'none',
  customStyles,
  rendererCustomStyles,
  className,
  testId = 'echarts-area-chart-test-id',
}: UseAreaChartProps): UseAreaChartReturn => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  const [resolvedColors, setResolvedColors] = useState<AreaChartResolvedColors>();

  /**
   * Capture the rendered wrapper because chart tokens
   * must be resolved from its computed styles.
   */
  useLayoutEffect(() => {
    setRootElement(wrapperRef.current);
  }, [customStyles?.wrapper, rendererCustomStyles?.container]);

  /**
   * Resolve default WCI graph tokens and consumer
   * supplied chart-level color overrides.
   */
  useLayoutEffect(() => {
    if (!rootElement) {
      return;
    }

    setResolvedColors(resolveAreaChartColors(rootElement, colors));
  }, [rootElement, colors]);

  /**
   * Build the normalized AreaChart definition.
   *
   * Series CSS variables are converted to computed
   * color values before ECharts receives them.
   */
  const definition = useMemo<AreaChartDefinition | undefined>(() => {
    if (!rootElement || !resolvedColors) {
      return undefined;
    }

    return createAreaChartDefinition({
      element: rootElement,
      data,
      colors: resolvedColors,
      appearance,
    });
  }, [appearance, data, resolvedColors, rootElement]);

  /**
   * Generate the ECharts configuration, apply the
   * selected animation, then merge consumer options.
   */
  const chartOptions = useMemo<EChartsOption | undefined>(() => {
    if (!definition) {
      return undefined;
    }

    const generatedOptions = createEChartsOptions(definition);

    const animatedOptions = applyEChartsSeriesAnimation(generatedOptions, options);

    return mergeAreaChartOptions(animatedOptions, options);
  }, [definition, options]);

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
