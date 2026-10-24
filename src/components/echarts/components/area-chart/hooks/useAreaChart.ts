import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { compactObject } from '@wci-tech/core-ui-premium';
import type { EChartsOption } from 'echarts';

import { applyEChartsSeriesAnimation } from '@/components/echarts/utils/ECharts.animation';
import { createEChartsOptions } from '@/components/echarts/utils/ECharts.utils';

import type {
  AreaChartHookProps,
  AreaChartHookReturn,
  AreaChartResolvedColors,
  AreaChartWrapperProps,
} from '../AreaChart.types';
import {
  type AreaChartDefinition,
  createAreaChartDefinition,
  mergeAreaChartOptions,
  resolveAreaChartColors,
} from '../base/BaseAreaChart.utils';

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
}: AreaChartHookProps): AreaChartHookReturn => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
  const [resolvedColors, setResolvedColors] = useState<AreaChartResolvedColors>();

  useLayoutEffect(() => {
    setRootElement(wrapperRef.current);
  }, [customStyles?.wrapper, rendererCustomStyles?.container]);

  useLayoutEffect(() => {
    if (!rootElement) {
      return;
    }

    setResolvedColors(resolveAreaChartColors(rootElement, colors));
  }, [rootElement, colors]);

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
