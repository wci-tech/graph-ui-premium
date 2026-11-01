/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseTreemapChart from '../base/BaseTreemapChart';
import type {
  TreemapChartCustomStyles,
  TreemapChartOptions,
  TreemapChartProps,
} from '../TreemapChart.types';

import { resolveTreemapChartEffect } from './treemapChartResolveEffect';

export const TreemapChartEngine = (props: TreemapChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;
  const effectConfig = resolveTreemapChartEffect(effect);

  const mergedStyles = useMemo(
    (): TreemapChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [customStyles, effectConfig?.customStyles],
  );

  const mergedOptions = useMemo<TreemapChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseTreemapChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default TreemapChartEngine;
