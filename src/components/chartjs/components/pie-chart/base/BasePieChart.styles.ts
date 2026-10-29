import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { PieChartOptions } from '../PieChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;

  return height ?? 'var(--pie-chart-height, 400px)';
};

const getWrapperStyles = (theme: ITheme, options?: PieChartOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: ${options?.chartBackground ?? 'var(--pie-chart-bg-color, transparent)'};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: PieChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};