/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseTreemapChart from '../base/BaseTreemapChart';
import type {
  TreemapChartCustomStyles,
  TreemapChartOptions,
  TreemapChartProps,
} from '../TreemapChart.types';

import { resolveTreemapChartEffect } from './treemapChartResolveEffect';

export const TreemapChartEngine = (props: TreemapChartProps) => {
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

  const effectConfig = resolveTreemapChartEffect(effect);

  const mergedStyles = useMemo(
    (): TreemapChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<TreemapChartOptions>(
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

  const baseTreemapChartProps = compactObject({
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

  return <BaseTreemapChart {...baseTreemapChartProps} />;
};

export default TreemapChartEngine;
