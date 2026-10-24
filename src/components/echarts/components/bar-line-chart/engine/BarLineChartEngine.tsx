/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import type {
  BarLineChartCustomStyles,
  BarLineChartOptions,
  BarLineChartProps,
} from '../BarLineChart.types';
import BaseBarLineChart from '../base/BaseBarLineChart';

import { resolveBarLineChartEffect } from './barLineChartResolveEffect';

export const BarLineChartEngine = (props: BarLineChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveBarLineChartEffect(effect);

  const mergedStyles = useMemo<BarLineChartCustomStyles>(
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

  const mergedOptions = useMemo<BarLineChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseBarLineChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default BarLineChartEngine;
