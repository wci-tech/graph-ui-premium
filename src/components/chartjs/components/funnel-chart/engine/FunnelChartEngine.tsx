/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseFunnelChart from '../base/BaseFunnelChart';
import type {
  FunnelChartCustomStyles,
  FunnelChartOptions,
  FunnelChartProps,
} from '../FunnelChart.types';

import { resolveFunnelChartEffect } from './funnelChartResolveEffect';

export const FunnelChartEngine = (props: FunnelChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveFunnelChartEffect(effect);

  const mergedStyles = useMemo<FunnelChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<FunnelChartOptions>(
    () => ({
      ...options,
      ...effectConfig?.options,
      animation: {
        ...options?.animation,
        ...effectConfig?.options?.animation,
      },
    }),
    [options, effectConfig?.options],
  );

  return (
    <BaseFunnelChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default FunnelChartEngine;
