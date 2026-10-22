import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { AreaChartOptions } from '../AreaChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? 'var(--area-chart-height, 400px)';
};

const getWrapperStyles = (theme: ITheme, options?: AreaChartOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};

  background-color: var(--area-chart-bg-color, transparent);

  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: AreaChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};
