import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { StackedAreaChartOptions } from '../StackedAreaChart.types';



const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? 'var(--stacked-area-chart-height, 400px)';
};

const getWrapperStyles = (
  theme: ITheme,
  options?: StackedAreaChartOptions,
) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: var(--stacked-area-chart-bg-color, transparent);
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: StackedAreaChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};