import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { CandlestickChartOptions } from '../CandlestickChart.types';

import { CANDLESTICK_CHART_CONFIG } from './BaseCandlestickChart.constants';

const getHeight = (
  height?: number | string,
): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return (
    height ??
    `var(--candlestick-chart-height, ${CANDLESTICK_CHART_CONFIG.height})`
  );
};

const getWrapperStyles = (
  theme: ITheme,
  options?: CandlestickChartOptions,
) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: var(
    --candlestick-chart-bg-color,
    transparent
  );
  border-radius: ${options?.isBoxVisible === false
    ? 0
    : theme.border.radius.lg};
`;

export const useStyles = (
  options?: CandlestickChartOptions,
) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};