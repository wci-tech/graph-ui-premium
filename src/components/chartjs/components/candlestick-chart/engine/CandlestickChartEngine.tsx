/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseCandlestickChart from '../base/BaseCandlestickChart';
import type {
  CandlestickChartCustomStyles,
  CandlestickChartOptions,
  CandlestickChartProps,
} from '../CandlestickChart.types';

import { resolveCandlestickChartEffect } from './candlestickChartResolveEffect';
import { registerCandlestickChart } from './registerCandlestickChart';

registerCandlestickChart();

export const CandlestickChartEngine = (props: CandlestickChartProps) => {
  const {
    effect = 'none',
    options,
    customStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
    className,
    testId,
    ...rest
  } = props;

  const effectConfig = resolveCandlestickChartEffect(effect);

  const mergedStyles = useMemo<CandlestickChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [customStyles, effectConfig],
  );

  const mergedOptions = useMemo<CandlestickChartOptions>(
    () => ({
      ...options,
      ...effectConfig?.options,
      animation: {
        ...options?.animation,
        ...effectConfig?.options?.animation,
      },
    }),
    [effectConfig?.options, options],
  );

  const baseCandlestickChartProps = compactObject({
    ...rest,
    effect,
    options: mergedOptions,
    customStyles: mergedStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
    className,
    testId,
  });

  return <BaseCandlestickChart {...baseCandlestickChartProps} />;
};

export default CandlestickChartEngine;
