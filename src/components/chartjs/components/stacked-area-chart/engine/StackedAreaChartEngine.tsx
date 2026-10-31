/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseStackedAreaChart from '../base/BaseStackedAreaChart';
import type {
  StackedAreaChartCustomStyles,
  StackedAreaChartOptions,
  StackedAreaChartProps,
} from '../StackedAreaChart.types';

import { resolveStackedAreaChartEffect } from './stackedAreaChartResolveEffect';

export const StackedAreaChartEngine = (props: StackedAreaChartProps) => {
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

  const effectConfig = resolveStackedAreaChartEffect(effect);

  const mergedStyles = useMemo<StackedAreaChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<StackedAreaChartOptions>(
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

  const baseStackedAreaChartProps = compactObject({
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

  return <BaseStackedAreaChart {...baseStackedAreaChartProps} />;
};

export default StackedAreaChartEngine;
