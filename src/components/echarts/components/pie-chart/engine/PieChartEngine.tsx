/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BasePieChart from '../base/BasePieChart';
import type { PieChartCustomStyles, PieChartOptions, PieChartProps } from '../PieChart.types';

import { resolvePieChartEffect } from './pieChartResolveEffect';

export const PieChartEngine = (props: PieChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolvePieChartEffect(effect);

  const mergedStyles = useMemo<PieChartCustomStyles>(
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

  const mergedOptions = useMemo<PieChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BasePieChart {...rest} effect={effect} options={mergedOptions} customStyles={mergedStyles} />
  );
};

export default PieChartEngine;
