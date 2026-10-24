/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseBubbleChart from '../base/BaseBubbleChart';
import type {
  BubbleChartCustomStyles,
  BubbleChartOptions,
  BubbleChartProps,
} from '../BubbleChart.types';

import { resolveBubbleChartEffect } from './bubbleChartResolveEffect';

export const BubbleChartEngine = (props: BubbleChartProps) => {
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

  const effectConfig = resolveBubbleChartEffect(effect);

  const mergedStyles = useMemo(
    (): BubbleChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<BubbleChartOptions>(
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

  const baseBubbleChartProps = compactObject({
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

  return <BaseBubbleChart {...baseBubbleChartProps} />;
};

export default BubbleChartEngine;
