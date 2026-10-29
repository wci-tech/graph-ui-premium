import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { GanttChartOptions } from '../GanttChart.types';

import { GANTT_CHART_CONFIG } from './BaseGanttChart.constants';

const getHeight = (
  height?: number | string,
): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ??
    `var(--gantt-chart-height, ${GANTT_CHART_CONFIG.defaultHeight})`;
};

const getWrapperStyles = (
  theme: ITheme,
  options?: GanttChartOptions,
) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  background-color: ${options?.chartBackground ??
  'var(--gantt-chart-bg-color, transparent)'};
  border-radius: ${options?.isBoxVisible === false
    ? 0
    : theme.border.radius.lg};
`;

export const useStyles = (
  options?: GanttChartOptions,
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