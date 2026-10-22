import { useMemo } from 'react';

import { css } from '@emotion/react';
import { type ITheme, useTheme } from '@wci-tech/core-ui-premium';

import type { BarChartOptions } from '../BarChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? 'var(--bar-chart-height, 400px)';
};

const getWrapperStyles = (theme: ITheme, options?: BarChartOptions) => css`
  position: relative;

  width: 100%;

  height: ${getHeight(options?.height)};

  background-color: ${options?.chartBackground ?? 'transparent'};

  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: BarChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};
