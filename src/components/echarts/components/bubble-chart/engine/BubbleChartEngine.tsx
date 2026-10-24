/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseBubbleChart from '../base/BaseBubbleChart';
import type {
  BubbleChartCustomStyles,
  BubbleChartOptions,
  BubbleChartProps,
} from '../BubbleChart.types';

import { resolveBubbleChartEffect } from './bubbleChartResolveEffect';

export const BubbleChartEngine = (props: BubbleChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveBubbleChartEffect(effect);

  const mergedStyles = useMemo<BubbleChartCustomStyles>(
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

  const mergedOptions = useMemo<BubbleChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseBubbleChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default BubbleChartEngine;
