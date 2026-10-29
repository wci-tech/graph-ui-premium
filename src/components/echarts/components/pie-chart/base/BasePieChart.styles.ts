import { useMemo } from 'react';

import { css } from '@emotion/react';
import type { ITheme } from '@wci-tech/core-ui-premium';
import { useTheme } from '@wci-tech/core-ui-premium';

import type { CrosshairStyleProps, PieChartOptions } from '../PieChart.types';

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') return `${height}px`;

  return height ?? 'var(--pie-chart-height, 400px)';
};

const getWrapperStyles = (theme: ITheme, options?: PieChartOptions) => css`
  position: relative;
  width: 100%;
  height: ${getHeight(options?.height)};
  overflow: hidden;
  background-color: ${options?.chartBackground ?? 'var(--pie-chart-bg-color, transparent)'};
  border-radius: ${options?.isBoxVisible === false ? 0 : theme.border.radius.lg};
`;

const getCrosshairStyles = ({ x, y, color }: CrosshairStyleProps) => ({
  horizontal: css`
    position: absolute;
    top: ${y}px;
    right: 0;
    left: 0;
    z-index: 10;
    border-top: 1px dashed ${color};
    pointer-events: none;
  `,
  vertical: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${x}px;
    z-index: 10;
    border-left: 1px dashed ${color};
    pointer-events: none;
  `,
});

export const useStyles = (options?: PieChartOptions) => {
  const { theme } = useTheme();

  return useMemo(
    () => ({
      wrapper: getWrapperStyles(theme, options),
      getCrosshairStyles,
    }),
    [theme, options],
  );
};