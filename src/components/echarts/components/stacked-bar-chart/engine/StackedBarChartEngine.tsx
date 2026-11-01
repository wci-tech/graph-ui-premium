/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseStackedBarChart from '../base/BaseStackedBarChart';
import type {
  StackedBarChartCustomStyles,
  StackedBarChartOptions,
  StackedBarChartProps,
} from '../StackedBarChart.types';

import { resolveStackedBarChartEffect } from './stackedBarChartResolveEffect';

export const StackedBarChartEngine = (props: StackedBarChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveStackedBarChartEffect(effect);

  const mergedStyles = useMemo<StackedBarChartCustomStyles>(
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

  const mergedOptions = useMemo<StackedBarChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseStackedBarChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default StackedBarChartEngine;
