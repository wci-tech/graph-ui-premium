import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { DoughnutChartOptions } from '../DoughnutChart.types';

const getHeight = (
  height?: number | string,
): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? '420px';
};

const getWrapperStyles = (
  theme: ITheme,
  options?: DoughnutChartOptions,
) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: ${options?.chartBackground ??
  'transparent'};
  border-radius: ${options?.isBoxVisible === false
    ? 0
    : theme.border.radius.lg};
`;

export const useStyles = (
  options?: DoughnutChartOptions,
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