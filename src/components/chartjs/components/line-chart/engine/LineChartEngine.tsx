/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseLineChart from '../base/BaseLineChart';
import type { LineChartCustomStyles, LineChartOptions, LineChartProps } from '../LineChart.types';

import { resolveLineChartEffect } from './lineChartResolveEffect';

export const LineChartEngine = (props: LineChartProps) => {
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

  const effectConfig = resolveLineChartEffect(effect);

  const mergedStyles = useMemo(
    (): LineChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<LineChartOptions>(
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

  const baseLineChartProps = compactObject({
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

  return <BaseLineChart {...baseLineChartProps} />;
};

export default LineChartEngine;
