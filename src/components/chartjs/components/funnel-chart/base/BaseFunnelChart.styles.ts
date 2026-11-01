import { useMemo } from 'react';

import { css } from '@emotion/react';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { FunnelChartOptions } from '../FunnelChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;
  return height ?? '450px';
};

export const useStyles = (options?: FunnelChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: css`
        position: relative;
        width: 100%;
        height: ${getHeight(options?.height)};
        border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
      `,
    }),
    [theme, options?.height, options?.isBoxVisible],
  );
};