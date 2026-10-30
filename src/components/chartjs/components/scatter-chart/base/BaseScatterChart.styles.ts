import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { ScatterChartOptions } from '../ScatterChart.types';

import { SCATTER_CHART_CONFIG } from './BaseScatterChart.constants';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;

  return height ?? `${SCATTER_CHART_CONFIG.defaultHeight}px`;
};

const getWrapperStyles = (theme: ITheme, options?: ScatterChartOptions) => css`
  position: relative;
  width: 100%;
  min-width: 0;
  height: ${getHeight(options?.height)};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: ScatterChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};