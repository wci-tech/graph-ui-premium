import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { LineChartOptions } from '../LineChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;

  return height ?? 'var(--line-chart-height, 400px)';
};

const getWrapperStyles = (theme: ITheme, options?: LineChartOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: var(--line-chart-bg-color, transparent);
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: LineChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};