/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject, useTheme } from '@wci-tech/core-ui';

import type { BarChartCustomStyles, BarChartProps } from '../BarChart.types';
import BaseBarChart from '../base/BaseBarChart';

import type { BarChartStateResolution } from './BarChartEngine.types';
import { resolveBarChartEffect } from './barChartResolveEffect';
import { resolveBarChartVariant } from './barChartResolveVariant';

export const BarChartEngine = (props: BarChartProps) => {
  const {
    variant = 'primary',
    effect = 'none',
    options,

    customStyles,
    rendererCustomStyles,

    showDownload,
    downloadPlacement,

    ...rest
  } = props;

  const { theme } = useTheme();

  const resolution: BarChartStateResolution = useMemo(
    () =>
      compactObject({
        theme,
        variant,
        effect,
      }),
    [theme, variant, effect],
  );

  const variantConfig = resolveBarChartVariant(variant, resolution);
  const effectConfig = resolveBarChartEffect(effect);

  const mergedStyles = useMemo((): BarChartCustomStyles => {
    return compactObject({
      wrapper: css([
        variantConfig?.customStyles?.wrapper,
        effectConfig?.customStyles?.wrapper,
        customStyles?.wrapper,
      ]),

      chart: css([
        variantConfig?.customStyles?.chart,
        effectConfig?.customStyles?.chart,
        customStyles?.chart,
      ]),
    });
  }, [variantConfig, effectConfig, customStyles]);

  const mergedOptions = useMemo(
    () =>
      compactObject({
        ...variantConfig?.options,
        ...effectConfig?.options,
        ...options,
      }),
    [variantConfig?.options, effectConfig?.options, options],
  );

  const baseBarChartProps = compactObject({
    ...rest,

    variant,
    effect,

    options: mergedOptions,

    customStyles: mergedStyles,

    rendererCustomStyles,

    showDownload,
    downloadPlacement,
  });

  return <BaseBarChart {...baseBarChartProps} />;
};

export default BarChartEngine;
