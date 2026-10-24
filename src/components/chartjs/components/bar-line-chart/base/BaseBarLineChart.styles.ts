import { useMemo } from 'react';

import { css } from '@emotion/react';
import type {
  ITheme,
} from '@wci-tech/core-ui-premium';
import {
  useTheme,
} from '@wci-tech/core-ui-premium';

import type { BarLineChartOptions } from '../BarLineChart.types';

const getHeight = (
  height?: number | string,
): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return (
    height ??
    'var(--bar-line-chart-height, 400px)'
  );
};

const getWrapperStyles = (
  theme: ITheme,
  options?: BarLineChartOptions,
) => css`
  position: relative;

  width: 100%;

  height: ${getHeight(options?.height)};

  min-width: 0;

  overflow: hidden;

  background-color: var(
    --bar-line-chart-bg-color,
    transparent
  );

  border-radius: ${options?.isBoxVisible === false
    ? 0
    : theme.border.radius.lg};
`;

export const useStyles = (
  options?: BarLineChartOptions,
) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(
        theme,
        options,
      ),
    }),
    [theme, options],
  );
};