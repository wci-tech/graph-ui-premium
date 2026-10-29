/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';

import BaseGanttChart from '../base/BaseGanttChart';
import type {
  GanttChartCustomStyles,
  GanttChartOptions,
  GanttChartProps,
} from '../GanttChart.types';

import { resolveGanttChartEffect } from './ganttChartResolveEffect';

export const GanttChartEngine = (props: GanttChartProps) => {
  const { effect = 'none', options, customStyles, ...rest } = props;

  const effectConfig = resolveGanttChartEffect(effect);

  const mergedStyles = useMemo<GanttChartCustomStyles>(
    () => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig?.customStyles, customStyles],
  );

  const mergedOptions = useMemo<GanttChartOptions>(
    () => ({
      ...effectConfig?.options,
      ...options,
    }),
    [effectConfig?.options, options],
  );

  return (
    <BaseGanttChart {...rest} effect={effect} options={mergedOptions} customStyles={mergedStyles} />
  );
};

export default GanttChartEngine;
