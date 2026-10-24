import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { BubbleChartOptions } from '../BubbleChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? 'var(--bubble-chart-height, 400px)';
};

const getWrapperStyles = (theme: ITheme, options?: BubbleChartOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  padding: ${options?.isBoxVisible === false ? 0 : theme.spacing.get(24)};
  background-color: ${options?.chartBackground ?? 'var(--bubble-chart-bg-color, transparent)'};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: BubbleChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};