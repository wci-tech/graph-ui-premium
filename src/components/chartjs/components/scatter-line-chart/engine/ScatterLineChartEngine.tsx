/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseScatterLineChart from '../base/BaseScatterLineChart';
import type {
  ScatterLineChartCustomStyles,
  ScatterLineChartOptions,
  ScatterLineChartProps,
} from '../ScatterLineChart.types';

import { resolveScatterLineChartEffect } from './scatterLineChartResolveEffect';

export const ScatterLineChartEngine = (props: ScatterLineChartProps) => {
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

  const effectConfig = resolveScatterLineChartEffect(effect);

  const mergedStyles = useMemo(
    (): ScatterLineChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<ScatterLineChartOptions>(
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

  const baseScatterLineChartProps = compactObject({
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

  return <BaseScatterLineChart {...baseScatterLineChartProps} />;
};

export default ScatterLineChartEngine;
