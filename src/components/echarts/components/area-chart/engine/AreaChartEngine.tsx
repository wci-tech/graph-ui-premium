/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import type { AreaChartCustomStyles, AreaChartOptions, AreaChartProps } from '../AreaChart.types';
import BaseAreaChart from '../base/BaseAreaChart';

import { resolveAreaChartEffect } from './areaChartResolveEffect';

export const AreaChartEngine = (props: AreaChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveAreaChartEffect(effect);

  const mergedStyles = useMemo<AreaChartCustomStyles>(
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

  const mergedOptions = useMemo<AreaChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseAreaChart {...rest} effect={effect} options={mergedOptions} customStyles={mergedStyles} />
  );
};

export default AreaChartEngine;
