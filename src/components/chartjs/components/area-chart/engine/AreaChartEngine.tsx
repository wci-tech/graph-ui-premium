/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import type { AreaChartCustomStyles, AreaChartOptions, AreaChartProps } from '../AreaChart.types';
import BaseAreaChart from '../base/BaseAreaChart';

import { resolveAreaChartEffect } from './areaChartResolveEffect';

export const AreaChartEngine = (props: AreaChartProps) => {
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

  const effectConfig = resolveAreaChartEffect(effect);

  const mergedStyles = useMemo(
    (): AreaChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),

      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<AreaChartOptions>(
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

  const baseAreaChartProps = compactObject({
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

  return <BaseAreaChart {...baseAreaChartProps} />;
};

export default AreaChartEngine;
