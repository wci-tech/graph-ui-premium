import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { WaterfallChartOptions } from '../WaterfallChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;
  return height ?? 'var(--waterfall-chart-height, 400px)';
};

const getWrapperStyles = (theme: ITheme, options?: WaterfallChartOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  padding: ${options?.isBoxVisible === false ? 0 : theme.spacing.get(24)};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
  background-color: ${options?.chartBackground ?? 'transparent'};
`;

export const useStyles = (options?: WaterfallChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};