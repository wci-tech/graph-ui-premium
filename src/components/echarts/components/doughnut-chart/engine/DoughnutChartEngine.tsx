/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseDoughnutChart from '../base/BaseDoughnutChart';
import type {
  DoughnutChartCustomStyles,
  DoughnutChartOptions,
  DoughnutChartProps,
} from '../DoughnutChart.types';

import { resolveDoughnutChartEffect } from './doughnutChartResolveEffect';

export const DoughnutChartEngine = (props: DoughnutChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;
  const effectConfig = resolveDoughnutChartEffect(effect);
  const mergedStyles = useMemo<DoughnutChartCustomStyles>(
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
  const mergedOptions = useMemo<DoughnutChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );
  return (
    <BaseDoughnutChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default DoughnutChartEngine;
