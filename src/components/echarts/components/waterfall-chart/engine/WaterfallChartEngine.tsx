/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseWaterfallChart from '../base/BaseWaterfallChart';
import type {
  WaterfallChartCustomStyles,
  WaterfallChartOptions,
  WaterfallChartProps,
} from '../WaterfallChart.types';

import { resolveWaterfallChartEffect } from './waterfallChartResolveEffect';

export const WaterfallChartEngine = (props: WaterfallChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveWaterfallChartEffect(effect);

  const mergedStyles = useMemo<WaterfallChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [
      effectConfig?.customStyles?.wrapper,
      effectConfig?.customStyles?.chart,
      customStyles?.wrapper,
      customStyles?.chart,
    ],
  );

  const mergedOptions = useMemo<WaterfallChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseWaterfallChart
      {...rest}
      effect={effect}
      options={mergedOptions}
      customStyles={mergedStyles}
    />
  );
};

export default WaterfallChartEngine;
