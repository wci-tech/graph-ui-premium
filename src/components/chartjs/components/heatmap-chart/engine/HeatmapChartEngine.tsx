/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseHeatmapChart from '../base/BaseHeatmapChart';
import type {
  HeatmapChartCustomStyles,
  HeatmapChartOptions,
  HeatmapChartProps,
} from '../HeatmapChart.types';

import { resolveHeatmapChartEffect } from './heatmapChartResolveEffect';
import { registerHeatmapChart } from './registerHeatmapChart';

registerHeatmapChart();

export const HeatmapChartEngine = (props: HeatmapChartProps) => {
  const {
    effect = 'none',
    options,
    customStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
    className,
    testId,
    ...rest
  } = props;

  const effectConfig = resolveHeatmapChartEffect(effect);

  const mergedStyles = useMemo<HeatmapChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<HeatmapChartOptions>(
    () => ({
      ...options,
      ...effectConfig?.options,
      animation: {
        ...options?.animation,
        ...effectConfig?.options?.animation,
      },
    }),
    [options, effectConfig?.options],
  );

  const baseHeatmapChartProps = compactObject({
    ...rest,
    effect,
    options: mergedOptions,
    customStyles: mergedStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
    className,
    testId,
  });

  return <BaseHeatmapChart {...baseHeatmapChartProps} />;
};

export default HeatmapChartEngine;
