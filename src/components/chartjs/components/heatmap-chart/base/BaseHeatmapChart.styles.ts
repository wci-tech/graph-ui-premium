import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { HeatmapChartOptions } from '../HeatmapChart.types';

import { HEATMAP_CHART_CONFIG } from './BaseHeatmapChart.constants';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? `${HEATMAP_CHART_CONFIG.defaultHeight}px`;
};

const getWrapperStyles = (
  theme: ITheme,
  options?: HeatmapChartOptions,
) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: transparent;
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

export const useStyles = (options?: HeatmapChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};