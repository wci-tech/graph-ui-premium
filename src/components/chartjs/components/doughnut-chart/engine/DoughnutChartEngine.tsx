/** @jsxImportSource @emotion/react */

import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject } from '@wci-tech/core-ui-premium';

import BaseDoughnutChart from '../base/BaseDoughnutChart';
import type {
  DoughnutChartCustomStyles,
  DoughnutChartOptions,
  DoughnutChartProps,
} from '../DoughnutChart.types';

import { resolveDoughnutChartEffect } from './doughnutChartResolveEffect';

export const DoughnutChartEngine = (props: DoughnutChartProps) => {
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

  const effectConfig = resolveDoughnutChartEffect(effect);

  const mergedStyles = useMemo(
    (): DoughnutChartCustomStyles => ({
      wrapper: css([effectConfig?.customStyles?.wrapper, customStyles?.wrapper]),
      chart: css([effectConfig?.customStyles?.chart, customStyles?.chart]),
    }),
    [effectConfig, customStyles],
  );

  const mergedOptions = useMemo<DoughnutChartOptions>(
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

  const baseDoughnutChartProps = compactObject({
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

  return <BaseDoughnutChart {...baseDoughnutChartProps} />;
};

export default DoughnutChartEngine;
