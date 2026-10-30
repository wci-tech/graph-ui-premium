import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { RadarChartOptions } from '../RadarChart.types';

import { RADAR_CHART_CONFIG } from './BaseRadarChart.constants';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;

  return height ?? `${RADAR_CHART_CONFIG.defaultHeight}px`;
};

const getWrapperStyles = (theme: ITheme, options?: RadarChartOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: ${options?.chartBackground ?? 'transparent'};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
  padding: ${options?.isBoxVisible === false ? 0 : theme.spacing.get(24)};
`;

export const useStyles = (options?: RadarChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};