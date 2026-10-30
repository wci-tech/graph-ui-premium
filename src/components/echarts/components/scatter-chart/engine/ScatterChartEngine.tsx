/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseScatterChart from '../base/BaseScatterChart';
import type {
  ScatterChartCustomStyles,
  ScatterChartOptions,
  ScatterChartProps,
} from '../ScatterChart.types';

import { resolveScatterChartEffect } from './scatterChartResolveEffect';

export const ScatterChartEngine = (props: ScatterChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveScatterChartEffect(effect);

  const mergedStyles = useMemo<ScatterChartCustomStyles>(
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

  const mergedOptions = useMemo<ScatterChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseScatterChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default ScatterChartEngine;
