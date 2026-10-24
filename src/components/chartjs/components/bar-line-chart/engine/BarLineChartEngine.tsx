/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import type {
  BarLineChartCustomStyles,
  BarLineChartOptions,
  BarLineChartProps,
} from '../BarLineChart.types';
import BaseBarLineChart from '../base/BaseBarLineChart';

import { resolveBarLineChartEffect } from './barLineChartResolveEffect';

export const BarLineChartEngine = (props: BarLineChartProps) => {
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

  const effectConfig = resolveBarLineChartEffect(effect);

  const mergedStyles = useMemo(
    (): BarLineChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),

      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<BarLineChartOptions>(
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

  const baseBarLineChartProps = compactObject({
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

  return <BaseBarLineChart {...baseBarLineChartProps} />;
};

export default BarLineChartEngine;
