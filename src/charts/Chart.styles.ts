/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { css } from '@emotion/react';

const DEFAULT_CHART_HEIGHT = 400;

const getHeight = (height?: number | string): string => {
  if (typeof height === 'number') {
    return `${height}px`;
  }

  return height ?? `${DEFAULT_CHART_HEIGHT}px`;
};

const getRootStyles = (height?: number | string) => {
  const resolvedHeight = getHeight(height);

  return css`
    position: relative;
    width: 100%;
    min-width: 0;

    /*
     * Shared default used by ChartJS and ECharts.
     */
    --chart-height: ${resolvedHeight};

    height: var(--chart-height);
    min-height: var(--chart-height);
  `;
};

const getMessageStyles = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: var(--chart-height);
  color: #64748b;
  font-size: 14px;
`;

export const useStyles = (height?: number | string) =>
  useMemo(
    () => ({
      root: getRootStyles(height),
      message: getMessageStyles(),
    }),
    [height],
  );
