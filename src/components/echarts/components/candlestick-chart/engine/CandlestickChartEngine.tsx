/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseCandlestickChart from '../base/BaseCandlestickChart';
import type {
  CandlestickChartCustomStyles,
  CandlestickChartOptions,
  CandlestickChartProps,
} from '../CandlestickChart.types';

import { resolveCandlestickChartEffect } from './candlestickChartResolveEffect';

export const CandlestickChartEngine = (props: CandlestickChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveCandlestickChartEffect(effect);

  const mergedStyles = useMemo<CandlestickChartCustomStyles>(
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

  const mergedOptions = useMemo<CandlestickChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseCandlestickChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default CandlestickChartEngine;
