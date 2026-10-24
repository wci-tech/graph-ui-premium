/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import type { BarChartCustomStyles, BarChartOptions, BarChartProps } from '../BarChart.types';
import BaseBarChart from '../base/BaseBarChart';

import { resolveBarChartEffect } from './barChartResolveEffect';

export const BarChartEngine = (props: BarChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveBarChartEffect(effect);

  const mergedStyles = useMemo<BarChartCustomStyles>(
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

  const mergedOptions = useMemo<BarChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseBarChart {...rest} effect={effect} options={mergedOptions} customStyles={mergedStyles} />
  );
};

export default BarChartEngine;
