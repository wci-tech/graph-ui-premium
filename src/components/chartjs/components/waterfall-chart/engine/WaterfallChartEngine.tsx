/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseWaterfallChart from '../base/BaseWaterfallChart';
import type {
  WaterfallChartCustomStyles,
  WaterfallChartOptions,
  WaterfallChartProps,
} from '../WaterfallChart.types';

import { resolveWaterfallChartEffect } from './waterfallChartResolveEffect';

export const WaterfallChartEngine = (props: WaterfallChartProps) => {
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

  const effectConfig = resolveWaterfallChartEffect(effect);

  const mergedStyles = useMemo(
    (): WaterfallChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<WaterfallChartOptions>(
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

  const baseWaterfallChartProps = compactObject({
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

  return <BaseWaterfallChart {...baseWaterfallChartProps} />;
};

export default WaterfallChartEngine;
