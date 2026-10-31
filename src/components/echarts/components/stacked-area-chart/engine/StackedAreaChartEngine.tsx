/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseStackedAreaChart from '@/components/echarts/components/stacked-area-chart/base/BaseStackedAreaChart';
import { resolveStackedAreaChartEffect } from '@/components/echarts/components/stacked-area-chart/engine/stackedAreaChartResolveEffect';
import type {
  StackedAreaChartCustomStyles,
  StackedAreaChartProps,
} from '@/components/echarts/components/stacked-area-chart/StackedAreaChart.types';

export const StackedAreaChartEngine = (props: StackedAreaChartProps) => {
  const {
    effect = 'none',
    options,
    customStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
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

  const mergedOptions = useMemo<StackedAreaChartProps['options']>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  const baseStackedAreaChartProps = compactObject({
    ...rest,
    effect,
    options: mergedOptions,
    customStyles: mergedStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
  });

  return <BaseStackedAreaChart {...baseStackedAreaChartProps} />;
};

export default StackedAreaChartEngine;
