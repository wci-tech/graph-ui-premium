/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseScatterChart from '../base/BaseScatterChart';
import type {
  ScatterChartCustomStyles,
  ScatterChartOptions,
  ScatterChartProps,
} from '../ScatterChart.types';

import { resolveScatterChartEffect } from './scatterChartResolveEffect';

export const ScatterChartEngine = (props: ScatterChartProps) => {
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

  const effectConfig = resolveScatterChartEffect(effect);

  const mergedStyles = useMemo<ScatterChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<ScatterChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
      animation: {
        ...effectConfig?.options?.animation,
        ...options?.animation,
      },
    }),
    [effectConfig?.options, options],
  );

  const baseScatterChartProps = compactObject({
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

  return <BaseScatterChart {...baseScatterChartProps} />;
};

export default ScatterChartEngine;
