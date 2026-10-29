/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseHeatmapChart from '../base/BaseHeatmapChart';
import type {
  HeatmapChartCustomStyles,
  HeatmapChartOptions,
  HeatmapChartProps,
} from '../HeatmapChart.types';

import { resolveHeatmapChartEffect } from './heatmapChartResolveEffect';

export const HeatmapChartEngine = (props: HeatmapChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveHeatmapChartEffect(effect);

  const mergedStyles = useMemo<HeatmapChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [
      effectConfig?.customStyles?.wrapper,
      effectConfig?.customStyles?.chart,
      customStyles?.wrapper,
      customStyles?.chart,
    ],
  );

  const mergedOptions = useMemo<HeatmapChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseHeatmapChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default HeatmapChartEngine;
