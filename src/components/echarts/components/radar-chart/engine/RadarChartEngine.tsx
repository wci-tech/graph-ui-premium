/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseRadarChart from '../base/BaseRadarChart';
import type {
  RadarChartCustomStyles,
  RadarChartOptions,
  RadarChartProps,
} from '../RadarChart.types';

import { resolveRadarChartEffect } from './radarChartResolveEffect';

export const RadarChartEngine = (props: RadarChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveRadarChartEffect(effect);

  const mergedStyles = useMemo<RadarChartCustomStyles>(
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

  const mergedOptions = useMemo<RadarChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseRadarChart {...rest} effect={effect} options={mergedOptions} customStyles={mergedStyles} />
  );
};

export default RadarChartEngine;
