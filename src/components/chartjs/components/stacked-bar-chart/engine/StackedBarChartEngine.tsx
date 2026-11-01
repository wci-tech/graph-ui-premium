/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseStackedBarChart from '../base/BaseStackedBarChart';
import type {
  StackedBarChartCustomStyles,
  StackedBarChartOptions,
  StackedBarChartProps,
} from '../StackedBarChart.types';

import { resolveStackedBarChartEffect } from './stackedBarChartResolveEffect';

export const StackedBarChartEngine = (props: StackedBarChartProps) => {
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

  const effectConfig = resolveStackedBarChartEffect(effect);

  const mergedStyles = useMemo<StackedBarChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig?.customStyles?.chart, effectConfig?.customStyles?.wrapper, customStyles],
  );

  const mergedOptions = useMemo<StackedBarChartOptions>(
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

  return (
    <BaseStackedBarChart
      {...compactObject({
        ...rest,
        effect,
        options: mergedOptions,
        customStyles: mergedStyles,
        rendererCustomStyles,
        showDownload,
        downloadPlacement,
        className,
        testId,
      })}
    />
  );
};

export default StackedBarChartEngine;
