/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseLineChart from '../base/BaseLineChart';
import type { LineChartCustomStyles, LineChartProps } from '../LineChart.types';

import type { LineChartStateResolution } from './LineChartEngine.types';
import { resolveLineChartEffect } from './lineChartResolveEffect';

export const LineChartEngine = (props: LineChartProps) => {
  const {
    effect = 'none',
    options,
    customStyles,
    rendererCustomStyles,
    showDownload,
    downloadPlacement,
    ...rest
  } = props;

  const resolution: LineChartStateResolution = useMemo(
    () =>
      compactObject({
        effect,
      }),
    [effect],
  );

  const effectConfig = resolveLineChartEffect(effect, resolution);

  const mergedStyles = useMemo(
    (): LineChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [customStyles, effectConfig],
  );

  const mergedOptions = useMemo(
    () =>
      compactObject({
        ...effectConfig?.options,
        ...options,
      }),
    [effectConfig?.options, options],
  );

  return (
    <BaseLineChart
      {...compactObject({
        ...rest,
        effect,
        options: mergedOptions,
        customStyles: mergedStyles,
        rendererCustomStyles,
        showDownload,
        downloadPlacement,
      })}
    />
  );
};

export default LineChartEngine;
