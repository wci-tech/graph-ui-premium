/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { css } from '@emotion/react';
import { compactObject, useTheme } from '@wci-tech/core-ui-premium';

import BaseLineChart from '../base/BaseLineChart';
import type { LineChartCustomStyles, LineChartProps } from '../LineChart.types';

import type { LineChartStateResolution } from './LineChartEngine.types';
import { resolveLineChartEffect } from './lineChartResolveEffect';
import { resolveLineChartVariant } from './lineChartResolveVariant';

export const LineChartEngine = (props: LineChartProps) => {
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

  const resolution: LineChartStateResolution = useMemo(
    () =>
      compactObject({
        theme,
        variant,
        effect,
      }),
    [theme, variant, effect],
  );

  const variantConfig = resolveLineChartVariant(variant, resolution);
  const effectConfig = resolveLineChartEffect(effect, resolution);

  const mergedStyles = useMemo(
    (): LineChartCustomStyles => ({
      wrapper: css([
        variantConfig.customStyles?.wrapper,
        effectConfig?.customStyles?.wrapper,
        customStyles?.wrapper,
      ]),

      chart: css([
        variantConfig.customStyles?.chart,
        effectConfig?.customStyles?.chart,
        customStyles?.chart,
      ]),
    }),
    [customStyles, effectConfig, variantConfig],
  );

  const mergedOptions = useMemo(
    () =>
      compactObject({
        ...variantConfig.options,
        ...effectConfig?.options,
        ...options,
      }),
    [effectConfig?.options, options, variantConfig.options],
  );

  return (
    <BaseLineChart
      {...compactObject({
        ...rest,

        variant,
        effect,

        options: mergedOptions,

        customStyles: mergedStyles,

        rendererCustomStyles,

        showDownload,
        downloadPlacement,

        resolvedColors: variantConfig.colors ?? [],
      })}
    />
  );
};

export default LineChartEngine;
