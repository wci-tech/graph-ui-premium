import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { TreemapChartOptions } from '../TreemapChart.types';

import { TREEMAP_CHART_CONFIG } from './BaseTreemapChart.constants';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;
  return height ?? `var(--treemap-chart-height, ${TREEMAP_CHART_CONFIG.defaultHeight})`;
};

const getWrapperStyles = (theme: ITheme, options?: TreemapChartOptions) => css`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: ${getHeight(options?.height)};
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${options?.chartBackground ?? 'var(--treemap-chart-bg-color, transparent)'};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
  padding: ${options?.isBoxVisible === false ? 0 : theme.spacing.get(24)};

  canvas {
    display: block;
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
  }
`;

export const useStyles = (options?: TreemapChartOptions) => {
  const { theme } = useTheme();
  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
    }),
    [theme, options],
  );
};