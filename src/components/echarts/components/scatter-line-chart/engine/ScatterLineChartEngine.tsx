/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseScatterLineChart from '../base/BaseScatterLineChart';
import type {
  ScatterLineChartCustomStyles,
  ScatterLineChartOptions,
  ScatterLineChartProps,
} from '../ScatterLineChart.types';

import { resolveScatterLineChartEffect } from './scatterLineChartResolveEffect';

export const ScatterLineChartEngine = (props: ScatterLineChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveScatterLineChartEffect(effect);

  const mergedStyles = useMemo<ScatterLineChartCustomStyles>(
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

  const mergedOptions = useMemo<ScatterLineChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseScatterLineChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default ScatterLineChartEngine;
