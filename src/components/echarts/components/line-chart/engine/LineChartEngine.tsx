/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseLineChart from '../base/BaseLineChart';
import type { LineChartCustomStyles, LineChartOptions, LineChartProps } from '../LineChart.types';

import { resolveLineChartEffect } from './lineChartResolveEffect';

export const LineChartEngine = (props: LineChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveLineChartEffect(effect);

  const mergedStyles = useMemo<LineChartCustomStyles>(
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

  const mergedOptions = useMemo<LineChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseLineChart {...rest} effect={effect} options={mergedOptions} customStyles={mergedStyles} />
  );
};

export default LineChartEngine;
